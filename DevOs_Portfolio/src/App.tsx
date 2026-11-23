import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
  type Ref,
  type CSSProperties,
} from "react";
import { APPS, AppContent, ResumeSheet } from "./apps";
import { AppIcon, Icon, type AppId } from "./icons";
import { NAME_LINES, PORTFOLIO_NAME } from "./profile";

type Frame = { x: number; y: number; width: number; height: number };
type AppWindow = {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  closing: boolean;
  frame: Frame;
};
type Size = { width: number; height: number };
type Menu = "DevOS" | "File" | "View" | "Go" | "Window" | "Help";
type MenuItem = {
  label: string;
  click: () => void;
  hint?: string;
  icon?: string;
  disabled?: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, Math.max(min, max)));
const appName = (id: AppId) => APPS.find((app) => app.id === id)!.name;
const menuNames: Menu[] = ["DevOS", "File", "View", "Go", "Window", "Help"];
const preferredSizes: Record<AppId, [number, number]> = {
  projects: [910, 608],
  certifications: [875, 600],
  about: [680, 605],
  stack: [700, 605],
  resume: [765, 640],
  contact: [590, 475],
  terminal: [680, 440],
  github: [650, 480],
};

function fitFrame(frame: Frame, bounds: Size): Frame {
  const width = Math.min(frame.width, Math.max(0, bounds.width - 16));
  const height = Math.min(frame.height, Math.max(0, bounds.height - 16));
  return {
    width,
    height,
    x: clamp(frame.x, 8, bounds.width - width - 8),
    y: clamp(frame.y, 8, bounds.height - height - 8),
  };
}

function useWorkspaceSize(ref: { current: HTMLDivElement | null }) {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight - 131,
  });
  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;
    const measure = () => setSize({ width: layer.clientWidth, height: layer.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

function WindowFrame({
  entry,
  bounds,
  front,
  focus,
  changeFrame,
  close,
  minimize,
  maximize,
  children,
}: {
  entry: AppWindow;
  bounds: Size;
  front: boolean;
  focus: () => void;
  changeFrame: (frame: Frame) => void;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  children: ReactNode;
}) {
  const { id, minimized, maximized, closing } = entry;
  const title = appName(id);
  const frame = fitFrame(entry.frame, bounds);
  const gesture = useRef<{ mode: "move" | "resize"; x: number; y: number; frame: Frame } | null>(
    null,
  );
  function start(event: PointerEvent<HTMLElement>, mode: "move" | "resize") {
    if (
      event.button !== 0 ||
      maximized ||
      bounds.width <= 700 ||
      (event.target as HTMLElement).closest("button")
    )
      return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { mode, x: event.clientX, y: event.clientY, frame };
  }
  function move(event: PointerEvent<HTMLElement>) {
    const initial = gesture.current;
    if (!initial) return;
    const dx = event.clientX - initial.x;
    const dy = event.clientY - initial.y;
    const original = initial.frame;
    changeFrame(
      initial.mode === "move"
        ? fitFrame({ ...original, x: original.x + dx, y: original.y + dy }, bounds)
        : {
            ...original,
            width: clamp(
              original.width + dx,
              Math.min(400, bounds.width - original.x - 8),
              bounds.width - original.x - 8,
            ),
            height: clamp(
              original.height + dy,
              Math.min(275, bounds.height - original.y - 8),
              bounds.height - original.y - 8,
            ),
          },
    );
  }
  const end = () => {
    gesture.current = null;
  };
  return (
    <section
      className="app-window"
      data-app={id}
      data-front={front}
      data-minimized={minimized}
      data-maximized={maximized}
      data-closing={closing}
      inert={minimized || closing}
      aria-labelledby={`title-${id}`}
      style={
        {
          "--reading-width": `${preferredSizes[id][0]}px`,
          zIndex: entry.z,
          left: frame.x,
          top: frame.y,
          width: frame.width,
          height: frame.height,
        } as CSSProperties
      }
      onPointerDown={focus}
      onFocusCapture={focus}
    >
      <header
        className="window-titlebar"
        onPointerDown={(event) => start(event, "move")}
        onPointerMove={move}
        onLostPointerCapture={end}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button") && bounds.width > 700) maximize();
        }}
      >
        <div className="window-lights">
          <button
            className="window-close"
            onClick={close}
            aria-label={`Close ${title}`}
            title="Close"
          >
            <Icon name="close" size={10} />
          </button>
          <button
            className="window-minimize"
            onClick={minimize}
            aria-label={`Minimize ${title}`}
            title="Minimize"
          >
            <Icon name="minus" size={10} />
          </button>
          <button
            className="window-maximize"
            onClick={maximize}
            aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}
            title={maximized ? "Restore" : "Maximize"}
          >
            <Icon name={maximized ? "restore" : "expand"} size={10} />
          </button>
        </div>
        <h2 className="window-title" id={`title-${id}`} tabIndex={-1}>
          <AppIcon id={id} size={19} />
          {title}
        </h2>
        <span className="window-kind">Application</span>
      </header>
      <div className="window-content">{children}</div>
      {!maximized && (
        <span
          className="window-resize"
          aria-hidden="true"
          onPointerDown={(event) => start(event, "resize")}
          onPointerMove={move}
          onLostPointerCapture={end}
        />
      )}
    </section>
  );
}

const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const shortcut = isApple ? "⌘ K" : "Ctrl K";

function Spotlight({ close, open }: { close: () => void; open: (id: AppId) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = APPS.filter((app) =>
    `${app.name} ${app.description} ${app.keywords}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  useEffect(() => {
    dialog.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);
  return (
    <dialog
      ref={dialog}
      className="spotlight"
      aria-label="Spotlight Search"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="spotlight-inner">
        <form
          className="spotlight-input"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[active]) open(results[active].id);
          }}
        >
          <Icon name="search" size={25} />
          <input
            type="search"
            role="combobox"
            aria-label="Search applications"
            aria-expanded="true"
            aria-controls="spotlight-results"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `result-${results[active].id}` : undefined}
            autoFocus
            placeholder="Spotlight Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (["ArrowDown", "ArrowUp"].includes(event.key) && results.length) {
                event.preventDefault();
                setActive(
                  (previous) =>
                    (previous + (event.key === "ArrowDown" ? 1 : -1) + results.length) %
                    results.length,
                );
              }
            }}
          />
          <button type="button" className="keycap" onClick={close} aria-label="Close Spotlight">
            Esc
          </button>
        </form>
        <p className="spotlight-label">{query ? "Search results" : "Applications"}</p>
        <div
          className="spotlight-results"
          id="spotlight-results"
          role="listbox"
          aria-label="Applications"
        >
          {results.map((app, index) => (
            <button
              key={app.id}
              role="option"
              aria-selected={index === active}
              id={`result-${app.id}`}
              tabIndex={-1}
              onPointerMove={() => setActive(index)}
              onClick={() => open(app.id)}
            >
              <AppIcon id={app.id} size={34} />
              <span>
                <strong>{app.name}</strong>
                <small>{app.description}</small>
              </span>
              {index === active && <Icon name="enter" size={16} />}
            </button>
          ))}
          {!results.length && <p className="no-results">No applications match “{query.trim()}”.</p>}
        </div>
        <div className="spotlight-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Open app
          </span>
        </div>
      </div>
    </dialog>
  );
}

function StatusBar({
  theme,
  toggle,
  launch,
}: {
  theme: "dark" | "light";
  toggle: () => void;
  launch: () => void;
}) {
  const [now, setNow] = useState(() => new Date());
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    const connection = () => setOnline(navigator.onLine);
    window.addEventListener("online", connection);
    window.addEventListener("offline", connection);
    return () => {
      window.clearInterval(clock);
      window.removeEventListener("online", connection);
      window.removeEventListener("offline", connection);
    };
  }, []);
  const day = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return (
    <div className="system-status">
      <button
        className="status-button status-search"
        aria-label="Open Spotlight"
        title={`Spotlight (${shortcut})`}
        onClick={launch}
      >
        <Icon name="search" size={15} />
      </button>
      <span
        className="status-signal"
        role="img"
        aria-label={online ? "Network available" : "Offline"}
        title={online ? "Network available" : "Offline"}
      >
        <Icon name={online ? "wifi" : "offline"} size={16} />
      </span>
      <span className="status-battery" title="Decorative battery indicator">
        <Icon name="battery" size={21} />
      </span>
      <time dateTime={now.toISOString()}>
        <span>{day}</span> {time}
      </time>
      <span className="status-divider" />
      <button
        className="status-button theme-switch"
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
      </button>
    </div>
  );
}

function WelcomeName({
  intro,
  nameRef,
  onFinish,
}: {
  intro: boolean;
  nameRef: Ref<HTMLSpanElement>;
  onFinish: () => void;
}) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!intro) return;
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count === PORTFOLIO_NAME.length) window.clearInterval(timer);
    }, 83);
    return () => window.clearInterval(timer);
  }, [intro]);

  const typing = intro && typed < PORTFOLIO_NAME.length;
  const secondLineStart = NAME_LINES[0].length + 1;

  return (
    <span
      className="welcome-name"
      ref={nameRef}
      data-typing={typing}
      onAnimationEnd={(event) => {
        if (event.animationName === "name-zoom-out") onFinish();
      }}
    >
      {NAME_LINES.map((line, index) => (
        <span className="welcome-name-line" key={line}>
          <span className="welcome-name-copy welcome-name-ink">{line}</span>
          {typing && (
            <span className="typing-line" aria-hidden="true">
              <span className="welcome-name-ink">
                {line.slice(0, Math.max(0, typed - (index === 0 ? 0 : secondLineStart)))}
              </span>
              {index === (typed < secondLineStart ? 0 : 1) && <span className="typing-caret" />}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [intro, setIntro] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [selected, setSelected] = useState<AppId | null>(null);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [spotlight, setSpotlight] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const welcomeName = useRef<HTMLSpanElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const zIndex = useRef(0);
  const bounds = useWorkspaceSize(layer);
  const front = windows.reduce<AppWindow | undefined>(
    (top, entry) => (!entry.minimized && !entry.closing && (!top || entry.z > top.z) ? entry : top),
    undefined,
  );

  function defaultFrame(id: AppId, offset = 0) {
    const [width, height] = preferredSizes[id];
    return fitFrame(
      {
        width,
        height,
        x: (bounds.width - width) / 2 + offset,
        y: (bounds.height - height) / 2 + offset,
      },
      bounds,
    );
  }
  function openApp(id: AppId) {
    setIntro(false);
    setMenu(null);
    setSpotlight(false);
    setSelected(null);
    const z = ++zIndex.current;
    setWindows((previous) =>
      previous.some((entry) => entry.id === id)
        ? previous.map((entry) =>
            entry.id === id ? { ...entry, z, minimized: false, closing: false } : entry,
          )
        : [
            ...previous,
            {
              id,
              z,
              minimized: false,
              maximized: false,
              closing: false,
              frame: defaultFrame(
                id,
                (previous.filter((entry) => !entry.minimized).length % 4) * 22,
              ),
            },
          ],
    );
    window.requestAnimationFrame(() => {
      if (id === "terminal") document.getElementById("terminal-command")?.focus();
      else document.getElementById(`title-${id}`)?.focus({ preventScroll: true });
    });
  }
  function updateWindow(id: AppId, update: (entry: AppWindow) => AppWindow) {
    setWindows((previous) => previous.map((entry) => (entry.id === id ? update(entry) : entry)));
  }
  function restoreFocus(id: AppId) {
    const otherWindow = window.matchMedia("(max-width: 700px)").matches
      ? windows
          .filter((entry) => entry.id !== id && !entry.minimized && !entry.closing)
          .sort((a, b) => b.z - a.z)[0]
      : undefined;
    window.requestAnimationFrame(() =>
      document
        .getElementById(otherWindow ? `title-${otherWindow.id}` : `dock-${id}`)
        ?.focus({ preventScroll: true }),
    );
  }
  function focusWindow(id: AppId) {
    if (front?.id === id) return;
    const z = ++zIndex.current;
    updateWindow(id, (entry) => ({ ...entry, z }));
  }
  function closeWindow(id: AppId) {
    updateWindow(id, (entry) => ({ ...entry, closing: true }));
    restoreFocus(id);
    window.setTimeout(
      () => setWindows((previous) => previous.filter((entry) => entry.id !== id || !entry.closing)),
      220,
    );
  }
  function minimizeWindow(id: AppId) {
    updateWindow(id, (entry) => ({ ...entry, minimized: true }));
    restoreFocus(id);
  }
  function maximizeWindow(id: AppId) {
    updateWindow(id, (entry) => ({ ...entry, maximized: !entry.maximized }));
  }
  function toggleTheme() {
    setTheme((previous) => (previous === "dark" ? "light" : "dark"));
  }
  function openSpotlight() {
    setIntro(false);
    setMenu(null);
    setSpotlight(true);
  }

  useLayoutEffect(() => {
    const stage = desktop.current;
    const name = welcomeName.current;
    if (!intro || !stage || !name) return;

    // Start from the name's resting layout so the zoom lands precisely at every breakpoint.
    const viewport = stage.getBoundingClientRect();
    const text = name.getBoundingClientRect();
    const scale = clamp((viewport.width - 32) / text.width, 1, 1.7);
    const offsets = {
      "--intro-x": `${viewport.left + viewport.width / 2 - text.left - text.width / 2}px`,
      "--intro-y": `${viewport.top + viewport.height * 0.475 - text.top - text.height / 2}px`,
      "--intro-scale": String(scale),
      "--intro-name-half": `${(text.height * scale) / 2}px`,
    };
    for (const [key, value] of Object.entries(offsets)) stage.style.setProperty(key, value);
    return () => {
      for (const key of Object.keys(offsets)) stage.style.removeProperty(key);
    };
  }, [intro]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0B1425" : "#F3F6FC");
  }, [theme]);

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIntro(false);
        setMenu(null);
        setSpotlight((previous) => !previous);
      }
      if (event.key === "Escape") {
        setIntro(false);
        setMenu(null);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const menuItems: Record<Menu, MenuItem[]> = {
    DevOS: [
      { label: "About this portfolio", icon: "info", click: () => openApp("about") },
      { label: "Open Spotlight", icon: "search", click: openSpotlight, hint: shortcut },
    ],
    File: [
      { label: "Explore Projects", icon: "folder", click: () => openApp("projects") },
      { label: "Open Resume", icon: "book", click: () => openApp("resume") },
      {
        label: "Close active window",
        icon: "close",
        disabled: !front,
        click: () => front && closeWindow(front.id),
      },
    ],
    View: [
      {
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        icon: theme === "dark" ? "sun" : "moon",
        click: toggleTheme,
      },
      { label: "Spotlight Search", icon: "search", click: openSpotlight, hint: shortcut },
    ],
    Go: APPS.map((app) => ({ label: app.name, click: () => openApp(app.id) })),
    Window: [
      {
        label: "Minimize active window",
        icon: "minus",
        disabled: !front,
        click: () => front && minimizeWindow(front.id),
      },
      {
        label: front?.maximized ? "Restore active window" : "Maximize active window",
        icon: front?.maximized ? "restore" : "expand",
        disabled: !front || bounds.width <= 700,
        click: () => front && maximizeWindow(front.id),
      },
      ...windows
        .filter((entry) => !entry.closing)
        .map((entry) => ({
          label: appName(entry.id),
          icon: entry.id === front?.id ? "check" : "grid",
          hint: entry.minimized ? "Minimized" : undefined,
          click: () => openApp(entry.id),
        })),
    ],
    Help: [
      { label: "Open Spotlight Search", icon: "search", click: openSpotlight, hint: shortcut },
      { label: `About ${PORTFOLIO_NAME}`, icon: "info", click: () => openApp("about") },
    ],
  };

  return (
    <>
      <div
        className="desktop"
        data-theme={theme}
        data-intro={intro}
        ref={desktop}
        onPointerDown={(event) => {
          if (!(event.target as HTMLElement).closest(".menu-anchor")) setMenu(null);
        }}
        onClick={(event) => {
          if (!(event.target as HTMLElement).closest(".desktop-app")) setSelected(null);
        }}
      >
        <div className="wallpaper" aria-hidden="true">
          <div className="wallpaper-dark" />
          <div className="wallpaper-light" />
        </div>
        {intro && (
          <>
            <span className="intro-caption" aria-hidden="true">
              <Icon name="code" size={15} /> DevOS / Personal Workspace
            </span>
            <button
              className="intro-skip"
              onClick={() => {
                setIntro(false);
                welcomeName.current?.parentElement?.focus({ preventScroll: true });
              }}
            >
              Skip intro <Icon name="arrow" size={14} />
            </button>
          </>
        )}
        <header className="menubar">
          <nav className="menu-area" aria-label="Desktop menu">
            {menuNames.map((name) => (
              <div className={`menu-anchor ${name === "DevOS" ? "brand-anchor" : ""}`} key={name}>
                <button
                  className={`menu-trigger ${name === "DevOS" ? "menu-brand" : ""}`}
                  aria-expanded={menu === name}
                  aria-controls={`menu-${name}`}
                  onClick={() => setMenu(menu === name ? null : name)}
                >
                  {name === "DevOS" && (
                    <span className="brand-mark">
                      <Icon name="code" size={14} />
                    </span>
                  )}
                  {name}
                </button>
                {menu === name && (
                  <div className="menu-popover" id={`menu-${name}`}>
                    {name === "Help" && (
                      <p>
                        Double-click a desktop icon, or click an app in the Dock. On touchscreens, a
                        single tap opens an app.
                      </p>
                    )}
                    {menuItems[name].map((item) => (
                      <button
                        key={item.label}
                        disabled={item.disabled}
                        onClick={() => {
                          setMenu(null);
                          item.click();
                        }}
                      >
                        {item.icon && <Icon name={item.icon} size={15} />}
                        <span>{item.label}</span>
                        {item.hint && <small>{item.hint}</small>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <StatusBar theme={theme} toggle={toggleTheme} launch={openSpotlight} />
        </header>

        <main className="workspace">
          <div className="desktop-layout">
            <section className="welcome" aria-labelledby="welcome-title">
              <div className="workspace-label">
                <span>
                  <Icon name="code" size={14} />
                </span>{" "}
                Personal workspace
              </div>
              <h1 id="welcome-title" tabIndex={-1} aria-label={`Hello, I’m ${PORTFOLIO_NAME}`}>
                <span className="welcome-greeting">Hello, I’m </span>
                <WelcomeName intro={intro} nameRef={welcomeName} onFinish={() => setIntro(false)} />
              </h1>
              <p className="welcome-intro">
                <strong>Aspiring Software Developer</strong>
                <span>Building solutions through code.</span>
              </p>
              <div className="availability">
                <i />
                Open to Internship Opportunities
              </div>
              <div className="welcome-actions">
                <button className="hero-button explore" onClick={() => openApp("projects")}>
                  <Icon name="folder" size={17} />
                  Explore Projects
                  <Icon name="arrow" size={16} />
                </button>
                <button className="hero-button quick-launch" onClick={openSpotlight}>
                  <Icon name="search" size={17} />
                  Quick Launch<kbd className="keycap">{shortcut}</kbd>
                </button>
              </div>
            </section>
            <section className="app-launcher" aria-labelledby="applications-title">
              <header className="launcher-header">
                <h2 id="applications-title">Applications</h2>
                <span />
                <small className="app-count">08 apps</small>
                <small className="app-count-tablet">06 of 08</small>
              </header>
              <div className="app-grid">
                {APPS.map((app) => (
                  <button
                    className="desktop-app"
                    key={app.id}
                    data-app-id={app.id}
                    aria-pressed={selected === app.id}
                    onClick={(event) => {
                      if (
                        event.detail === 0 ||
                        window.matchMedia("(max-width: 700px), (pointer: coarse)").matches
                      )
                        openApp(app.id);
                      else setSelected(app.id);
                    }}
                    onDoubleClick={() => openApp(app.id)}
                  >
                    <span className="desktop-icon">
                      <AppIcon id={app.id} size={66} />
                    </span>
                    <span className="desktop-app-name">{app.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>

        <div className="window-layer" ref={layer}>
          {windows.map((entry) => (
            <WindowFrame
              key={entry.id}
              entry={entry}
              bounds={bounds}
              front={front?.id === entry.id}
              focus={() => focusWindow(entry.id)}
              changeFrame={(frame) => updateWindow(entry.id, (current) => ({ ...current, frame }))}
              close={() => closeWindow(entry.id)}
              minimize={() => minimizeWindow(entry.id)}
              maximize={() => maximizeWindow(entry.id)}
            >
              <AppContent id={entry.id} openApp={openApp} />
            </WindowFrame>
          ))}
        </div>

        <div className="desktop-footer" aria-hidden="true">
          <span className="footer-version">
            <i />
            DevOS <b>v1.0</b>
          </span>
          <span className="footer-hint">
            <Icon name="mouse" size={15} />
            Double-click an app to open
          </span>
        </div>
        <nav className="dock" aria-label="Dock">
          {APPS.map((app, index) => {
            const entry = windows.find((item) => item.id === app.id && !item.closing);
            return (
              <div className="dock-item" key={app.id}>
                {index === 6 && <div className="dock-divider" />}
                <button
                  className="dock-button"
                  id={`dock-${app.id}`}
                  aria-label={`${entry?.minimized ? "Restore" : "Open"} ${app.name}`}
                  onClick={() => openApp(app.id)}
                  data-open={Boolean(entry)}
                >
                  <span className="dock-tooltip" aria-hidden="true">
                    {app.name}
                  </span>
                  <AppIcon id={app.id} size={45} />
                  <i className="dock-dot" />
                </button>
              </div>
            );
          })}
        </nav>
        {spotlight && <Spotlight close={() => setSpotlight(false)} open={openApp} />}
      </div>
      <div className="print-only">
        <ResumeSheet />
      </div>
    </>
  );
}
