export const NAME_LINES = ["Franc Marcus", "Hermogenes"] as const;
export const PORTFOLIO_NAME = NAME_LINES.join(" ");
export const SAMPLE_EMAIL = `${PORTFOLIO_NAME.toLowerCase().replace(/ /g, ".")}@example.com`;
export const SAMPLE_RESUME_FILENAME = `${PORTFOLIO_NAME.replace(/ /g, "-")}-Sample-Resume.pdf`;
