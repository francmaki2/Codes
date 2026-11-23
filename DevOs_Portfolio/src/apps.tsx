import { useEffect, useRef, useState } from "react";
import { AppIcon, Icon, type AppId } from "./icons";
import { PORTFOLIO_NAME, SAMPLE_EMAIL, SAMPLE_RESUME_FILENAME } from "./profile";

const firstName = PORTFOLIO_NAME.split(" ")[0];
const terminalPrompt = `${firstName.toLowerCase()}@devos ~ %`;

export const APPS: { id: AppId; name: string; description: string; keywords: string }[] = [
  {
    id: "projects",
    name: "Projects",
    description: "Explore example software projects",
    keywords: "finder work demo web backend",
  },
  {
    id: "certifications",
    name: "Certifications",
    description: "Browse courses and credentials",
    keywords: "certificates education awards",
  },
  {
    id: "about",
    name: "About Me",
    description: `Meet ${firstName} and see the learning timeline`,
    keywords: `profile education biography ${PORTFOLIO_NAME.toLowerCase()}`,
  },
  {
    id: "stack",
    name: "Tech Stack",
    description: "Languages, frameworks, and tools",
    keywords: "skills developer technologies react javascript",
  },
  {
    id: "resume",
    name: "Resume",
    description: "Preview, download, or print the sample résumé",
    keywords: "cv pdf education experience",
  },
  {
    id: "contact",
    name: "Contact",
    description: "Find email and collaboration details",
    keywords: "email mail hire internship",
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Navigate the workspace with commands",
    keywords: "cli shell command prompt console",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Explore reference repositories",
    keywords: "git version control open source",
  },
];

const projects = [
  {
    id: "taskflow",
    name: "TaskFlow",
    category: "Web Applications",
    featured: true,
    tone: "iris",
    summary: "A focused Kanban workspace for planning and tracking team projects.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    problem:
      "Small teams need to see what is in progress without creating more work to manage the tracker.",
    solution: "A three-column board that makes ownership and task state visible at a glance.",
    implementation:
      "A typed data model separates cards from columns. React state holds card updates, and reusable components keep the screen consistent across desktop and mobile.",
    repo: "https://github.com/wekan/wekan",
    reference: "Wekan",
    demoLabel: "Move the first task",
    demoResult: "Moved “Design onboarding” to In progress.",
  },
  {
    id: "pulse",
    name: "Pulse API",
    category: "Backend",
    featured: true,
    tone: "mint",
    summary: "A REST API for logging and summarizing personal activity data.",
    tags: ["Node.js", "Express", "PostgreSQL"],
    problem: "Activity data collected across different tools is hard to summarize consistently.",
    solution: "A single API for creating activity records and retrieving weekly summaries.",
    implementation:
      "An Express router validates incoming records and delegates database calls to a persistence layer. PostgreSQL indexes organization and date columns to keep summary queries predictable.",
    repo: "https://github.com/expressjs/express",
    reference: "Express",
    demoLabel: "Run sample request",
    demoResult: "200 OK · GET /activities/summary · 3 activities returned.",
  },
  {
    id: "campus",
    name: "Campus Compass",
    category: "Web Applications",
    featured: false,
    tone: "peach",
    summary: "A campus resource directory with searchable listings and filters.",
    tags: ["React", "TypeScript", "CSS"],
    problem:
      "Students often need to visit several sites to find office hours, services, and campus resources.",
    solution:
      "A searchable directory that groups resources by purpose and keeps common details together.",
    implementation:
      "A static directory is filtered using normalized text and category tags. Semantic controls make filter changes usable by keyboard and screen reader.",
    repo: "https://github.com/TanStack/table",
    reference: "TanStack Table",
    demoLabel: "Filter for study spaces",
    demoResult: "2 matches · North Library and Learning Commons.",
  },
];

type Project = (typeof projects)[number];
type OpenApp = (id: AppId) => void;

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function PanelHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <header className="panel-heading">
      <span className="panel-kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

function ProjectPreview({ project, active = false }: { project: Project; active?: boolean }) {
  return (
    <div
      className={`project-preview ${project.tone}`}
      aria-label={`${project.name} example interface`}
    >
      <div className="mock-frame">
        <div className="mock-chrome">
          <i />
          <i />
          <i />
          <b>{project.name}</b>
        </div>
        {project.id === "taskflow" ? (
          <div className="mock-board">
            {["To do", "In progress", "Done"].map((column, index) => (
              <div key={column}>
                <b>{column}</b>
                {index === (active ? 1 : 0) && <span className="mock-task">Design onboarding</span>}
                <span />
                <span className="mock-short" />
              </div>
            ))}
          </div>
        ) : project.id === "pulse" ? (
          <div className="mock-code">
            <b>GET</b> /activities/summary
            <br />
            <span>{active ? "200 OK" : "// Activity service"}</span>
            <br />
            {'{ "activities": 3, "week": 46 }'}
          </div>
        ) : (
          <div className="mock-directory">
            <b>{active ? "Study spaces" : "Campus resources"}</b>
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}

const projectNav = [
  { text: "All Projects", icon: "grid" },
  { text: "Featured", icon: "star" },
  { text: "Web Applications", icon: "globe" },
  { text: "Backend", icon: "server" },
];

function Projects({ openApp }: { openApp: OpenApp }) {
  const [filter, setFilter] = useState("All Projects");
  const [detail, setDetail] = useState<Project | null>(null);
  const [demo, setDemo] = useState(false);
  const scroll = useRef<HTMLElement>(null);
  const visible = projects.filter(
    (project) =>
      filter === "All Projects" ||
      (filter === "Featured" ? project.featured : project.category === filter),
  );
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = 0;
  }, [filter, detail]);

  return (
    <div className="finder">
      <aside className="finder-sidebar" aria-label="Project categories">
        <span className="sidebar-heading">Favorites</span>
        {projectNav.map(({ text, icon }) => (
          <button
            key={text}
            className={text === filter ? "current" : ""}
            aria-pressed={text === filter}
            onClick={() => {
              setFilter(text);
              setDetail(null);
            }}
          >
            <Icon name={icon} size={16} />
            {text}
          </button>
        ))}
        <span className="sidebar-heading finder-secondary">Repositories</span>
        <button onClick={() => openApp("github")}>
          <Icon name="github" size={16} />
          GitHub
        </button>
      </aside>
      <section className="finder-main" ref={scroll}>
        {detail ? (
          <>
            <button className="text-action" onClick={() => setDetail(null)}>
              <Icon name="back" size={16} /> Back to{" "}
              {filter === "All Projects" ? "projects" : filter.toLowerCase()}
            </button>
            <PanelHeading
              kicker={`Example project / ${detail.category}`}
              title={detail.name}
              description={detail.summary}
            />
            <Tags items={detail.tags} />
            <div className="detail-preview">
              <ProjectPreview project={detail} active={demo} />
            </div>
            <div className="panel-actions">
              <button className="panel-button primary" onClick={() => setDemo(!demo)}>
                <Icon name="arrow" size={16} />
                {demo ? "Reset demo" : detail.demoLabel}
              </button>
              <a className="panel-button" href={detail.repo} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} />
                {detail.reference} on GitHub
                <Icon name="external" size={14} />
              </a>
            </div>
            {demo && (
              <p className="demo-result" role="status">
                {detail.demoResult}
              </p>
            )}
            <div className="detail-text">
              <section>
                <h3>Problem</h3>
                <p>{detail.problem}</p>
              </section>
              <section>
                <h3>Solution</h3>
                <p>{detail.solution}</p>
              </section>
              <section>
                <h3>Technical implementation</h3>
                <p>{detail.implementation}</p>
              </section>
            </div>
            <p className="sample-note">
              <Icon name="info" size={15} /> This is a sample case study. The live demo is a local
              simulation; the GitHub link is a public reference, not the portfolio owner’s source
              code.
            </p>
          </>
        ) : (
          <>
            <PanelHeading
              kicker="Project explorer"
              title={filter}
              description="Example case studies covering frontend and backend development."
            />
            <div className="project-grid">
              {visible.map((project) => (
                <button
                  key={project.id}
                  className="project-card"
                  onClick={() => {
                    setDetail(project);
                    setDemo(false);
                  }}
                >
                  <ProjectPreview project={project} />
                  <div className="project-copy">
                    <div className="project-title">
                      <h3>{project.name}</h3>
                      <Icon name="chevron" size={16} />
                    </div>
                    <p>{project.summary}</p>
                    <Tags items={project.tags} />
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const certificates = [
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Jun 2025",
    skills: ["Semantic HTML", "CSS", "Accessibility"],
    initials: "fcc",
    tone: "iris",
    href: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
  },
  {
    name: "Introduction to Computer Science",
    issuer: "HarvardX · CS50",
    date: "Dec 2024",
    skills: ["Algorithms", "C", "Python"],
    initials: "CS50",
    tone: "peach",
    href: "https://cs50.harvard.edu/x/",
  },
  {
    name: "GitHub Foundations",
    issuer: "GitHub",
    date: "Aug 2025",
    skills: ["Git", "Pull Requests", "Collaboration"],
    initials: "GH",
    tone: "mint",
    href: "https://resources.github.com/learn/certifications/",
  },
];

function Certifications() {
  return (
    <div className="panel-page">
      <PanelHeading
        kicker="Learning record"
        title="Certifications"
        description="Sample credentials showing how completed courses and certifications can be presented."
      />
      <div className="certificate-grid">
        {certificates.map((cert) => (
          <article className="certificate-card" key={cert.name}>
            <div className={`certificate-preview ${cert.tone}`} aria-hidden="true">
              <div className="certificate-paper">
                <b>{cert.initials}</b>
                <i />
                <i />
                <i />
                <span>
                  <Icon name="star" size={13} />
                </span>
              </div>
            </div>
            <div className="certificate-copy">
              <span className="example-label">Example credential</span>
              <h3>{cert.name}</h3>
              <p>
                {cert.issuer} · {cert.date}
              </p>
              <Tags items={cert.skills} />
              <a
                className="text-action"
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                title="Opens the issuer's course or certification page"
              >
                View Credential <Icon name="external" size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="sample-note">
        <Icon name="info" size={15} /> Dates are illustrative. Links lead to issuer information, not
        personal verification records.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="panel-page about-page">
      <div className="profile-header">
        <div className="profile-avatar" aria-label="Profile photo placeholder">
          {PORTFOLIO_NAME.split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <PanelHeading
          kicker="Developer profile"
          title={PORTFOLIO_NAME}
          description="Computer science student · Aspiring software developer"
        />
      </div>
      <p className="profile-intro">
        I enjoy turning vague problems into software people can use. I’m looking for an internship
        where I can contribute to a team, learn from code reviews, and get better at shipping
        reliable features.
      </p>
      <div className="about-facts">
        <section>
          <Icon name="book" />
          <h3>Education</h3>
          <p>
            B.S. in Computer Science
            <br />
            Example University · Expected 2027
          </p>
        </section>
        <section>
          <Icon name="code" />
          <h3>Interests</h3>
          <p>Accessible interfaces, practical APIs, and tools that make development easier.</p>
        </section>
      </div>
      <h3 className="section-title">Learning timeline</h3>
      <ol className="timeline">
        <li>
          <time>2025</time>
          <div>
            <strong>Built full-stack prototypes</strong>
            <p>Connected React interfaces to Node.js APIs and relational databases.</p>
          </div>
        </li>
        <li>
          <time>2024</time>
          <div>
            <strong>Focused on the web</strong>
            <p>Practiced responsive layouts, accessibility, and collaborative Git workflows.</p>
          </div>
        </li>
        <li>
          <time>2023</time>
          <div>
            <strong>Started computer science studies</strong>
            <p>Learned programming fundamentals and data structures with Python.</p>
          </div>
        </li>
      </ol>
      <p className="sample-note">
        <Icon name="info" size={15} /> Education and timeline details are examples.
      </p>
    </div>
  );
}

const skillGroups = [
  {
    name: "Programming Languages",
    icon: "code",
    items: [
      ["JS", "JavaScript", "#f5d463"],
      ["TS", "TypeScript", "#74b6ff"],
      ["Py", "Python", "#72c8e4"],
      ["SQL", "SQL", "#b9abff"],
    ],
  },
  {
    name: "Frontend Development",
    icon: "globe",
    items: [
      ["react", "React", "#75dcf6"],
      ["5", "HTML5", "#ffa77a"],
      ["#", "CSS", "#78a8ff"],
      ["tailwind", "Tailwind CSS", "#6fe6eb"],
    ],
  },
  {
    name: "Backend Development",
    icon: "server",
    items: [
      ["⬡", "Node.js", "#91d88b"],
      ["Ex", "Express", "#b3adc1"],
      ["↔", "REST APIs", "#a9a6ff"],
    ],
  },
  {
    name: "Databases",
    icon: "grid",
    items: [
      ["Pg", "PostgreSQL", "#88b4ef"],
      ["SL", "SQLite", "#96dfff"],
    ],
  },
  {
    name: "Developer Tools",
    icon: "branch",
    items: [
      ["git", "Git", "#fc9a83"],
      ["github", "GitHub", "#c7adff"],
      ["><", "VS Code", "#7ac5ff"],
      [">_", "Terminal", "#90dfae"],
    ],
  },
];

function TechMark({ mark }: { mark: string }) {
  if (mark === "github" || mark === "git")
    return <Icon name={mark === "git" ? "branch" : "github"} size={19} />;
  if (mark === "react")
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      >
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  if (mark === "tailwind")
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M12 5c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.2 2.6 2.5 5.4 2.5 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7C16.2 6.3 14.8 5 12 5ZM6 12.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.4 1.7 1.2 1.2 2.6 2.5 5.4 2.5 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.4-1.7C10.2 13.5 8.8 12.2 6 12.2Z" />
      </svg>
    );
  return <>{mark}</>;
}

function TechStack() {
  return (
    <div className="panel-page">
      <PanelHeading
        kicker="Developer toolkit"
        title="Tech Stack"
        description="Languages and tools used across the sample projects and coursework."
      />
      <div className="skills-list">
        {skillGroups.map((group) => (
          <section className="skill-group" key={group.name}>
            <h3>
              <Icon name={group.icon} size={17} />
              {group.name}
            </h3>
            <div>
              {group.items.map(([mark, label, color]) => (
                <span className="skill" key={label}>
                  <b style={{ color }}>
                    <TechMark mark={mark} />
                  </b>
                  {label}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const resumeSections = [
  {
    title: "Profile",
    rows: [
      {
        heading: "",
        description:
          "Computer science student seeking a software development internship. Interested in accessible web applications, reliable APIs, and collaborative engineering.",
      },
    ],
  },
  {
    title: "Education",
    rows: [
      {
        heading: "Example University | B.S. Computer Science",
        description:
          "Expected 2027. Coursework: data structures, algorithms, databases, and web development.",
      },
    ],
  },
  {
    title: "Example Projects",
    rows: [
      {
        heading: "TaskFlow | React, TypeScript, Tailwind CSS",
        description:
          "Designed a responsive Kanban board with reusable components and a typed task model.",
      },
      {
        heading: "Pulse API | Node.js, Express, PostgreSQL",
        description: "Designed a REST service with input validation and weekly activity summaries.",
      },
    ],
  },
  {
    title: "Technical Skills",
    rows: [
      {
        heading: "",
        description:
          "JavaScript, TypeScript, Python, SQL, React, HTML, CSS, Node.js, Express, PostgreSQL, and Git.",
      },
    ],
  },
];

export function ResumeSheet() {
  return (
    <article className="resume-paper">
      <span className="resume-example">Sample résumé</span>
      <h2>{PORTFOLIO_NAME}</h2>
      <p className="resume-role">Software Development Intern Candidate</p>
      <p className="resume-address">{SAMPLE_EMAIL}</p>
      {resumeSections.map(({ title, rows }) => (
        <section key={title}>
          <h3>{title}</h3>
          {rows.map(({ heading, description }) => (
            <div key={description}>
              {heading && <h4>{heading}</h4>}
              <p>{description}</p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}

function downloadResume() {
  const escape = (text: string) => text.replace(/[()\\]/g, "\\$&");
  const line = (text: string, y: number, size: number, bold = false) =>
    `BT /${bold ? "F2" : "F1"} ${size} Tf 54 ${y} Td (${escape(text)}) Tj ET\n`;
  let contents =
    "0.12 0.15 0.25 rg\n" +
    line("SAMPLE RESUME", 732, 9, true) +
    line(PORTFOLIO_NAME, 696, 29, true) +
    line("Software Development Intern Candidate", 673, 12, true) +
    line(SAMPLE_EMAIL, 654, 10);
  let y = 619;
  for (const section of resumeSections) {
    contents += line(section.title.toUpperCase(), y, 11, true);
    y -= 19;
    for (const { heading, description } of section.rows) {
      if (heading) {
        contents += line(heading, y, 11, true);
        y -= 15;
      }
      const lines = description.match(/.{1,88}(?:\s|$)|\S+/g) ?? [];
      for (const part of lines) {
        contents += line(part.trim(), y, 10);
        y -= 14;
      }
      y -= 7;
    }
    y -= 14;
  }
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${contents.length} >>\nstream\n${contents}endstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = objects.map((object, index) => {
    const offset = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    return offset;
  });
  const xref = pdf.length;
  pdf += `xref\n0 7\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = SAMPLE_RESUME_FILENAME;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Resume() {
  return (
    <div className="resume-viewer">
      <div className="resume-toolbar">
        <span className="resume-filename">
          <AppIcon id="resume" size={24} />{" "}
          <span>
            {SAMPLE_RESUME_FILENAME} <small>1 page · Sample</small>
          </span>
        </span>
        <div className="panel-actions">
          <button className="panel-button" onClick={() => window.print()}>
            <Icon name="print" size={16} />
            Print
          </button>
          <button className="panel-button primary" onClick={downloadResume}>
            <Icon name="download" size={16} />
            Download PDF
          </button>
        </div>
      </div>
      <div className="resume-scroll">
        <ResumeSheet />
      </div>
    </div>
  );
}

function Contact({ openApp }: { openApp: OpenApp }) {
  const [copyStatus, setCopyStatus] = useState("");
  const email = SAMPLE_EMAIL;
  return (
    <div className="panel-page contact-page">
      <AppIcon id="contact" size={64} />
      <PanelHeading
        kicker="Contact"
        title="Let’s connect."
        description="Interested in working together? I’m open to software developer internships and conversations about early-career engineering."
      />
      <div className="contact-card">
        <Icon name="mail" size={22} />
        <div>
          <small>Example email address</small>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <button
          className="panel-button"
          aria-label="Copy example email address"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(email);
              setCopyStatus("Copied example address.");
            } catch {
              setCopyStatus("Clipboard unavailable. You can select and copy the address above.");
            }
          }}
        >
          <Icon name={copyStatus.startsWith("Copied") ? "check" : "copy"} size={17} />
        </button>
      </div>
      <p className="copy-status" role="status">
        {copyStatus}
      </p>
      <button className="text-action" onClick={() => openApp("github")}>
        <Icon name="github" size={17} /> Browse GitHub references <Icon name="arrow" size={15} />
      </button>
      <p className="sample-note">
        <Icon name="info" size={15} /> Replace the example address with your own before sharing this
        portfolio.
      </p>
    </div>
  );
}

function Terminal({ openApp }: { openApp: OpenApp }) {
  const [command, setCommand] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [output, setOutput] = useState<{ command: string; response: string }[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottom.current?.parentElement)
      bottom.current.parentElement.scrollTop = bottom.current.parentElement.scrollHeight;
  }, [output]);
  const targets: Record<string, AppId> = {
    about: "about",
    projects: "projects",
    skills: "stack",
    contact: "contact",
  };
  function execute() {
    const value = command.trim();
    setCommand("");
    if (!value) return;
    const lower = value.toLowerCase();
    if (lower === "clear") {
      setOutput([]);
      setShowWelcome(false);
      return;
    }
    const app = Object.prototype.hasOwnProperty.call(targets, lower) ? targets[lower] : undefined;
    const name = APPS.find(({ id }) => id === app)?.name;
    const response =
      lower === "help"
        ? "help      Show available commands\nabout     Open the developer profile\nprojects  Browse example projects\nskills    Open the tech stack\ncontact   Show contact details\nclear     Clear terminal history"
        : name
          ? `Opening ${name}.app…`
          : `Command not found: ${value}. Type “help” to list commands.`;
    setOutput((history) => [...history, { command: value, response }]);
    if (app) openApp(app);
  }
  return (
    <div
      className="terminal-panel"
      onClick={(event) => {
        if (!window.getSelection()?.toString() && event.target !== input.current)
          input.current?.focus();
      }}
    >
      {showWelcome && (
        <>
          <p className="terminal-welcome">
            DevOS Terminal <span>v1.0</span>
          </p>
          <p>
            Type <b>help</b> to see available commands.
          </p>
        </>
      )}
      <div className="terminal-history" aria-live="polite">
        {output.map((entry, index) => (
          <div key={index}>
            <p>
              <span className="terminal-prompt">{terminalPrompt}</span> {entry.command}
            </p>
            <pre>{entry.response}</pre>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          execute();
        }}
        className="terminal-form"
      >
        <label className="terminal-prompt" htmlFor="terminal-command">
          {terminalPrompt}
        </label>
        <div className="terminal-input">
          <input
            ref={input}
            id="terminal-command"
            aria-label="Terminal command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!command && <span className="terminal-cursor" />}
        </div>
        <button className="terminal-run" type="submit" aria-label="Run command">
          <Icon name="enter" size={16} />
        </button>
      </form>
      <div ref={bottom} />
    </div>
  );
}

function GitHub() {
  return (
    <div className="panel-page">
      <PanelHeading
        kicker="Developer repositories"
        title="GitHub"
        description="Public open-source repositories related to the example projects. These are reference links, not personal contributions."
      />
      <div className="repository-list">
        {projects.map((project) => (
          <a
            className="repository"
            key={project.id}
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="branch" size={20} />
            <div>
              <strong>{project.reference}</strong>
              <span>Reference for {project.name}</span>
            </div>
            <Icon name="external" size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function AppContent({ id, openApp }: { id: AppId; openApp: OpenApp }) {
  switch (id) {
    case "projects":
      return <Projects openApp={openApp} />;
    case "certifications":
      return <Certifications />;
    case "about":
      return <About />;
    case "stack":
      return <TechStack />;
    case "resume":
      return <Resume />;
    case "contact":
      return <Contact openApp={openApp} />;
    case "terminal":
      return <Terminal openApp={openApp} />;
    case "github":
      return <GitHub />;
  }
}
