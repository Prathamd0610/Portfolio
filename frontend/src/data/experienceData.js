// Career experience — grouped by company so promotions render as a single
// timeline. Pratham joined Accenture as an Associate Software Engineer and was
// promoted to Software Engineer.
export const experienceData = [
  {
    id: "accenture",
    company: "Accenture",
    location: "Noida, India / Remote",
    type: "Full-Time",
    duration: "Jun 2024 – Present",
    website: "https://www.accenture.com",
    summary:
      "Part of the Quality Engineering & Software Development vertical — building enterprise-grade test automation frameworks and shipping MERN features, now accelerated end-to-end with Agentic AI and GitHub Copilot.",
    metrics: [
      { label: "Regression Time", value: "-40%" },
      { label: "Dev Productivity", value: "+50%" },
      { label: "Manual Effort", value: "-60%" },
      { label: "Critical Defects", value: "0" },
    ],
    // Newest role first → renders as a promotion ladder.
    roles: [
      {
        title: "Software Engineer",
        period: "Jan 2026 – Present",
        current: true,
        promotion: true,
        description:
          "Promoted to Software Engineer for consistent delivery impact — now owning automation architecture decisions and championing AI-assisted engineering practices.",
        achievements: [
          "Promoted from Associate Software Engineer after delivering measurable quality and velocity gains across releases.",
          "Architect reusable, scalable Selenium-Java frameworks adopted across multiple project teams.",
          "Drive Agentic AI + GitHub Copilot adoption, cutting script authoring and refactoring time by ~50%.",
          "Own CI/CD test execution health, keeping releases green with stable, self-healing test strategies.",
        ],
        stack: ["Java", "Selenium", "TestNG", "REST Assured", "Agentic AI", "GitHub Copilot", "CI/CD"],
      },
      {
        title: "Associate Software Engineer",
        period: "Jun 2024 – Dec 2025",
        current: false,
        promotion: false,
        description:
          "Joined the Quality Engineering team and quickly became a go-to contributor for automation framework optimization and release validation.",
        achievements: [
          "Reduced regression execution time by 40% via parallel execution and reusable framework components.",
          "Improved script stability by 35% using AI-assisted debugging and proactive test maintenance.",
          "Cut manual testing effort by 60% by expanding functional & regression automation coverage.",
          "Supported Agile sprints with zero critical production defects through close QA/Dev/UAT collaboration.",
        ],
        stack: ["Java", "Selenium", "TestNG", "Maven", "JIRA", "SQL"],
      },
    ],
  },
];