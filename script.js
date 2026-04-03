const portfolioData = {
  name: "Harsh Kumar",
  terminalPrompt: "HarshKumar@portfolio:~$",
  role: "Electronics Engineering Student | Aspiring Software Developer",
  focus: "Data structures, development, and hands-on work with AI tools",
  intro: "I code to build real, practical systems that solve problems.",
  resumeUrl: null,
  about: [
    "I am a 3rd-year Electronics Engineering student currently in my 6th semester.",
    "I am focused on Data Structures, development, and gaining hands-on experience with modern tools including AI.",
    "I actively build real-world projects to strengthen my skills and prepare for internship opportunities.",
    "I aim to continuously improve by working on practical systems and solving real problems."
  ],
  skills: [
    "C, C++",
    "Java",
    "HTML, CSS",
    "JavaScript",
    "MongoDB",
    "PostgreSQL",
    "MATLAB",
    "Git",
    "GitHub"
  ],
  projects: [
    {
      name: "Real-Time Chat Application",
      type: "Realtime Web App",
      description: "Built a real-time chat app with live messaging and responsive UI. Focused on smooth user experience and real-time interaction.",
      stack: ["Live Messaging", "Responsive UI", "Realtime UX"],
      demo: {
        url: "https://realtime-chat-app-l1sn.onrender.com/",
        label: "Live Demo",
        note: "Note: May take a few seconds to load due to server startup."
      },
      github: "https://github.com/Harsh-kumar-00/realtime-chat-app"
    },
    {
      name: "Job Application Portal",
      type: "Web Portal",
      description: "Developed a portal to manage job applications and improve tracking through a cleaner user flow.",
      stack: ["Application Tracking", "User Flow", "Portal Design"],
      github: "https://github.com/Avi0221/JOB-Portal"
    }
  ],
  contact: [
    {
      label: "email",
      value: "harshkrr.ece@gmail.com",
      kind: "email"
    },
    {
      label: "github",
      value: "https://github.com/Harsh-kumar-00",
      kind: "link"
    },
    {
      label: "linkedin",
      value: "https://www.linkedin.com/in/harsh-kr-z/",
      kind: "link"
    }
  ]
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
const scrambleGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%*+-";
const viewModeStorageKey = "portfolio-view-mode";

document.addEventListener("DOMContentLoaded", async () => {
  populateProfile();
  populateMinimalOverview();
  populateAbout();
  populateSkills();
  populateProjects();
  populateContact();
  setupScrollProgress();
  setupViewModeToggle();
  setupNavigation();
  setupScramble(document);
  setupRevealAnimations();
  setupParallax();
  setupCustomCursor();
  setupExternalLinkFeedback();

  const terminal = setupInteractiveTerminal();

  await playBootSequence();
  await playTypingSequence();
  await terminal.boot();

  document.body.classList.add("is-ready");
});

function populateProfile() {
  document.getElementById("profile-name").textContent = portfolioData.name;
  document.getElementById("profile-role").textContent = portfolioData.role;
  document.getElementById("profile-focus").textContent = portfolioData.focus;
}

function setupScrollProgress() {
  const progressBar = document.getElementById("scroll-progress-bar");

  if (!progressBar) {
    return;
  }

  let ticking = false;

  const updateProgress = () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight <= 0 ? 0 : window.scrollY / documentHeight;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    progressBar.style.transform = `scaleX(${clampedProgress})`;
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function populateMinimalOverview() {
  const title = document.getElementById("minimal-overview-title");
  const intro = document.getElementById("minimal-overview-intro");
  const summary = document.getElementById("minimal-overview-summary");
  const actions = document.getElementById("minimal-overview-actions");

  if (!title || !intro || !summary || !actions) {
    return;
  }

  title.textContent = portfolioData.name;
  intro.textContent = portfolioData.intro;
  summary.textContent = `${portfolioData.role}. Focused on ${portfolioData.focus}.`;

  const githubUrl = getContactLink("github");
  const minimalActions = [
    {
      label: "View Projects",
      kind: "button",
      target: "projects"
    },
    {
      label: "Get In Touch",
      kind: "button",
      target: "contact"
    },
    githubUrl
      ? {
          label: "GitHub",
          kind: "link",
          url: githubUrl,
          variant: "secondary"
        }
      : null
  ].filter(Boolean);

  actions.innerHTML = minimalActions.map((item) => renderMinimalAction(item)).join("");
}

function populateAbout() {
  const aboutOutput = document.getElementById("about-output");

  aboutOutput.innerHTML = portfolioData.about
    .map(
      (line, index) => `
        <div class="output-line">
          <span class="output-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="output-copy">${line}</span>
        </div>
      `
    )
    .join("");
}

function populateSkills() {
  const skillsOutput = document.getElementById("skills-output");

  skillsOutput.innerHTML = portfolioData.skills
    .map(
      (skill, index) => `
        <div class="output-line">
          <span class="output-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="output-copy">${skill}</span>
        </div>
      `
    )
    .join("");
}

function populateProjects() {
  const projectResults = document.getElementById("project-results");

  projectResults.innerHTML = portfolioData.projects
    .map(
      (project, index) => `
        <article class="project-card">
          ${renderProjectHoverLink(project)}
          <div class="project-header">
            <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
            <strong class="project-name" data-scramble="${project.name}">${project.name}</strong>
            <span class="project-type">${project.type}</span>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="tag-list">
            ${project.stack.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="project-actions">
            ${project.demo ? renderProjectAction(project.demo.url, project.demo.label, "primary", "demo") : ""}
            ${renderProjectAction(project.github, "GitHub", "secondary", "github")}
          </div>
          ${project.demo?.note ? `<p class="project-note">${project.demo.note}</p>` : ""}
        </article>
      `
    )
    .join("");
}

function populateContact() {
  const contactOutput = document.getElementById("contact-output");

  contactOutput.innerHTML = portfolioData.contact
    .map(
      (item, index) => `
        <div class="contact-line">
          <span class="output-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="output-copy">${item.label}:</span>
          ${renderContactValue(item.value, item.kind)}
        </div>
      `
    )
    .join("");
}

function renderContactValue(value, kind) {
  if (kind === "email" && isEmail(value)) {
    return `
      <a class="terminal-link" href="mailto:${value}">
        <span data-scramble="${value}">${value}</span>
      </a>
    `;
  }

  if (kind === "link" && isAbsoluteUrl(value)) {
    return `
      <a class="terminal-link" href="${value}" target="_blank" rel="noreferrer">
        <span data-scramble="${value}">${value}</span>
      </a>
    `;
  }

  return `
    <span class="terminal-value" data-scramble="${value}">
      ${value}
    </span>
  `;
}

function renderProjectAction(url, label, variant, icon) {
  const content = `
    ${renderActionIcon(icon)}
    <span class="project-action-text" data-scramble="${label}">${label}</span>
  `;

  if (isAbsoluteUrl(url)) {
    return `
      <a
        class="terminal-link project-action project-action--${variant}"
        href="${url}"
        target="_blank"
        rel="noreferrer"
      >
        ${content}
      </a>
    `;
  }

  return `
    <span class="terminal-value project-action project-action--${variant}">
      ${content}
    </span>
  `;
}

function renderMinimalAction(item) {
  const content = `<span data-scramble="${item.label}">${item.label}</span>`;

  if (item.kind === "link" && isAbsoluteUrl(item.url)) {
    return `
      <a
        class="minimal-overview-action minimal-overview-action--${item.variant || "primary"}"
        href="${item.url}"
        target="_blank"
        rel="noreferrer"
      >
        ${content}
      </a>
    `;
  }

  return `
    <button
      class="minimal-overview-action minimal-overview-action--${item.variant || "primary"}"
      type="button"
      data-target="${item.target}"
    >
      ${content}
    </button>
  `;
}

function renderProjectHoverLink(project) {
  const primaryUrl = project.demo?.url || project.github;

  if (!isAbsoluteUrl(primaryUrl)) {
    return "";
  }

  return `
    <a
      class="project-hover-link"
      href="${primaryUrl}"
      target="_blank"
      rel="noreferrer"
      aria-label="View project: ${project.name}"
    >
      ${renderActionIcon("demo")}
      <span class="project-hover-link-text">View Project</span>
    </a>
  `;
}

function renderActionIcon(icon) {
  if (icon === "demo") {
    return `
      <svg class="project-action-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M9.5 2.5H13.5V6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M7 9L13.2 2.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13 9.5V12.2C13 12.64 12.64 13 12.2 13H3.8C3.36 13 3 12.64 3 12.2V3.8C3 3.36 3.36 3 3.8 3H6.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;
  }

  return `
    <svg class="project-action-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M8 1.4A6.6 6.6 0 0 0 5.9 14.26C6.23 14.32 6.35 14.12 6.35 13.95V12.78C4.47 13.18 4.08 11.98 4.08 11.98C3.77 11.18 3.34 10.97 3.34 10.97C2.73 10.56 3.39 10.57 3.39 10.57C4.07 10.62 4.43 11.27 4.43 11.27C5.03 12.31 6.01 12 6.39 11.81C6.45 11.37 6.62 11.07 6.81 10.89C5.31 10.72 3.73 10.13 3.73 7.5C3.73 6.75 4 6.13 4.45 5.64C4.38 5.46 4.15 4.74 4.52 3.78C4.52 3.78 5.09 3.6 6.34 4.45C6.88 4.3 7.45 4.23 8 4.23C8.55 4.23 9.12 4.3 9.66 4.45C10.91 3.6 11.48 3.78 11.48 3.78C11.85 4.74 11.62 5.46 11.55 5.64C12 6.13 12.27 6.75 12.27 7.5C12.27 10.14 10.68 10.71 9.18 10.88C9.42 11.09 9.63 11.49 9.63 12.09V13.95C9.63 14.12 9.75 14.33 10.08 14.26A6.6 6.6 0 0 0 8 1.4Z" fill="currentColor"></path>
    </svg>
  `;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value);
}

async function playTypingSequence() {
  const typingTerminal = document.getElementById("typing-terminal");
  const lines = [
    "boot sequence initialized...",
    `identity confirmed: ${portfolioData.name}`,
    `role mapped: ${portfolioData.role}`,
    portfolioData.intro
  ];

  if (prefersReducedMotion) {
    typingTerminal.innerHTML = lines
      .map(
        (line, index) => `
          <div class="type-row ${index === lines.length - 1 ? "is-active" : ""}">
            <span class="prompt">${index === 0 ? "$" : ">"}</span>
            <span class="typed-content">${line}</span>
          </div>
        `
      )
      .join("");
    return;
  }

  for (const [index, line] of lines.entries()) {
    const row = document.createElement("div");
    row.className = "type-row";
    row.innerHTML = `
      <span class="prompt">${index === 0 ? "$" : ">"}</span>
      <span class="typed-content"></span>
    `;

    typingTerminal.appendChild(row);

    const activeRow = typingTerminal.querySelector(".type-row.is-active");
    if (activeRow) {
      activeRow.classList.remove("is-active");
    }

    row.classList.add("is-active");
    await typeText(row.querySelector(".typed-content"), line, 18);
    await wait(index === lines.length - 1 ? 80 : 120);
  }
}

function playBootSequence() {
  const root = document.documentElement;
  const overlay = document.getElementById("boot-screen");
  const terminal = document.getElementById("boot-screen-terminal");
  const lines = [
    "Initializing system...",
    "Loading portfolio...",
    "Access granted."
  ];

  if (!overlay || !terminal) {
    root.classList.remove("is-intro-active");
    root.classList.add("is-intro-complete");
    return Promise.resolve();
  }

  if (prefersReducedMotion) {
    overlay.remove();
    root.classList.remove("is-intro-active");
    root.classList.add("is-intro-complete");
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const state = {
      finished: false,
      skipped: false
    };

    const finish = () => {
      if (state.finished) {
        return;
      }

      state.finished = true;
      root.classList.remove("is-intro-active");
      root.classList.add("is-intro-complete");
      overlay.classList.add("is-hidden");
      resolve();

      window.setTimeout(() => {
        overlay.remove();
      }, 260);
    };

    const skip = () => {
      state.skipped = true;
      finish();
    };

    overlay.addEventListener("click", skip, { once: true });
    overlay.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        event.preventDefault();
        skip();
      }
    });

    overlay.focus();

    (async () => {
      for (const line of lines) {
        if (state.skipped || state.finished) {
          return;
        }

        const row = document.createElement("div");
        row.className = "boot-line";
        row.innerHTML = `
          <span class="boot-line-prompt">></span>
          <span class="boot-line-text"></span>
        `;

        terminal.appendChild(row);
        window.requestAnimationFrame(() => {
          row.classList.add("is-mounted");
        });

        const textNode = row.querySelector(".boot-line-text");
        await typeBootLine(textNode, line, state, 10);

        if (state.skipped || state.finished) {
          return;
        }

        await wait(90);
      }

      if (state.skipped || state.finished) {
        return;
      }

      await wait(120);
      finish();
    })();
  });
}

function typeBootLine(element, text, state, speed) {
  return new Promise((resolve) => {
    let index = 0;

    const tick = () => {
      if (state.skipped || state.finished) {
        resolve();
        return;
      }

      element.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        window.setTimeout(tick, speed);
      } else {
        resolve();
      }
    };

    tick();
  });
}

function setupInteractiveTerminal() {
  const consoleElement = document.getElementById("terminal-console");
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const assist = document.getElementById("terminal-assist");
  const status = document.getElementById("terminal-status");
  const prompt = portfolioData.terminalPrompt;

  const history = [];
  let historyIndex = 0;
  let draftInput = "";
  let isRunning = false;
  let booted = false;
  const responseDelay = prefersReducedMotion ? 70 : 120;

  const commands = {
    help: {
      description: "show all available commands",
      run: async () => {
        const lines = [
          "Available commands:",
          "help     - show all available commands",
          "about    - scroll to about section",
          "skills   - scroll to skills section",
          "projects - scroll to projects section",
          "contact  - scroll to contact section",
          "whoami   - show portfolio owner",
          "status   - show current status",
          "clear    - clear terminal output",
          "resume   - open resume PDF",
          "github   - open GitHub profile",
          "linkedin - open LinkedIn profile"
        ];

        await printTerminalLines(lines, "info");
      }
    },
    about: {
      description: "scroll to about section",
      run: async () => handleSectionCommand("about")
    },
    skills: {
      description: "scroll to skills section",
      run: async () => handleSectionCommand("skills")
    },
    projects: {
      description: "scroll to projects section",
      run: async () => handleSectionCommand("projects")
    },
    contact: {
      description: "scroll to contact section",
      run: async () => handleSectionCommand("contact")
    },
    whoami: {
      description: "show portfolio owner",
      run: async () => {
        await printTerminalLines([portfolioData.name], "success");
        setTerminalStatus("Identity confirmed");
      }
    },
    status: {
      description: "show current status",
      run: async () => {
        await printTerminalLines(["Actively building and learning"], "success");
        setTerminalStatus("Status updated");
      }
    },
    clear: {
      description: "clear terminal output",
      run: async () => {
        output.innerHTML = "";
        setTerminalStatus("Terminal cleared");
      }
    },
    resume: {
      description: "open resume PDF",
      run: async () => {
        if (portfolioData.resumeUrl) {
          await printTerminalLines(["Opening resume PDF..."], "success");
          openExternalLink(portfolioData.resumeUrl);
          setTerminalStatus("Resume opened");
          return;
        }

        await printTerminalLines(
          ["Resume command is ready, but no real resume PDF is attached in this workspace yet."],
          "error"
        );
        setTerminalStatus("Resume unavailable");
      }
    },
    github: {
      description: "open GitHub profile",
      run: async () => {
        const githubUrl = getContactLink("github");

        if (!githubUrl) {
          await printTerminalLines(["GitHub profile link is not configured."], "error");
          return;
        }

        await printTerminalLines(["Opening GitHub profile..."], "success");
        openExternalLink(githubUrl);
        setTerminalStatus("GitHub opened");
      }
    },
    linkedin: {
      description: "open LinkedIn profile",
      run: async () => {
        const linkedinUrl = getContactLink("linkedin");

        if (!linkedinUrl) {
          await printTerminalLines(["LinkedIn profile link is not configured."], "error");
          return;
        }

        await printTerminalLines(["Opening LinkedIn profile..."], "success");
        openExternalLink(linkedinUrl);
        setTerminalStatus("LinkedIn opened");
      }
    }
  };

  const commandNames = Object.keys(commands);

  consoleElement.addEventListener("click", (event) => {
    if (!event.target.closest("a, button, input")) {
      input.focus();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const rawValue = input.value.trim();
    if (!rawValue || isRunning) {
      return;
    }

    history.push(rawValue);
    historyIndex = history.length;
    draftInput = "";

    appendEchoLine(rawValue);
    input.value = "";
    updateAssist("");

    const commandName = rawValue.toLowerCase().split(/\s+/)[0];
    const command = commands[commandName];

    isRunning = true;
    input.disabled = true;
    setTerminalStatus(`Running '${commandName}'`);
    await wait(responseDelay);

    if (command) {
      await command.run();
    } else {
      await printTerminalLines(["Command not recognized. Try 'help'"], "error");
      setTerminalStatus("Command not recognized");
    }

    input.disabled = false;
    input.focus();
    isRunning = false;

    if (commandName !== "clear") {
      updateAssist("");
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const matches = getCommandMatches(input.value);
      if (matches.length > 0) {
        event.preventDefault();
        input.value = matches[0];
        updateAssist(matches[0]);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      if (history.length === 0) {
        return;
      }

      event.preventDefault();

      if (historyIndex === history.length) {
        draftInput = input.value;
      }

      historyIndex = Math.max(historyIndex - 1, 0);
      input.value = history[historyIndex] || "";
      updateAssist(input.value);
      moveCaretToEnd(input);
      return;
    }

    if (event.key === "ArrowDown") {
      if (history.length === 0) {
        return;
      }

      event.preventDefault();
      historyIndex = Math.min(historyIndex + 1, history.length);
      input.value = historyIndex === history.length ? draftInput : history[historyIndex] || "";
      updateAssist(input.value);
      moveCaretToEnd(input);
    }
  });

  input.addEventListener("input", () => {
    updateAssist(input.value);
  });

  updateAssist("");

  return {
    boot: async () => {
      if (booted) {
        return;
      }

      booted = true;
      setTerminalStatus("Shell ready");
      await printTerminalLines(
        ["Interactive terminal ready.", "Type 'help' to explore the portfolio."],
        "success",
        { speed: 8, lineDelay: 20 }
      );
      input.focus();
    }
  };

  function getCommandMatches(value) {
    const query = value.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return commandNames.filter((name) => name.startsWith(query));
  }

  function updateAssist(value) {
    const query = value.trim().toLowerCase();

    if (!query) {
      assist.textContent = "Type 'help' to explore";
      if (!isRunning) {
        setTerminalStatus("Shell ready");
      }
      return;
    }

    const matches = getCommandMatches(query);

    if (matches.length === 0) {
      assist.textContent = `No match for '${query}'`;
      if (!isRunning) {
        setTerminalStatus("Unknown command");
      }
      return;
    }

    if (matches.length === 1) {
      assist.textContent = `Press Tab to autocomplete '${matches[0]}'`;
      if (!isRunning) {
        setTerminalStatus(`Ready: ${matches[0]}`);
      }
      return;
    }

    assist.textContent = `Suggestions: ${matches.join(" / ")}`;
    if (!isRunning) {
      setTerminalStatus(`${matches.length} matching commands`);
    }
  }

  function setTerminalStatus(message) {
    status.textContent = message;
  }

  async function handleSectionCommand(sectionId) {
    await printTerminalLines([`Navigating to ${sectionId} section...`], "success");
    scrollToSection(sectionId);
    highlightSection(sectionId);
    setTerminalStatus(`Viewing ${sectionId}`);
  }

  function appendEchoLine(commandText) {
    const entry = document.createElement("div");
    entry.className = "terminal-entry terminal-entry--echo";
    const promptNode = document.createElement("span");
    const textNode = document.createElement("span");

    promptNode.className = "terminal-entry-prompt";
    promptNode.textContent = prompt;
    textNode.className = "terminal-entry-text";
    textNode.textContent = commandText;

    entry.append(promptNode, textNode);

    output.appendChild(entry);
    mountTerminalEntry(entry);
    scrollTerminalStream();
  }

  async function printTerminalLines(lines, tone, options = {}) {
    const speed = options.speed ?? 10;
    const lineDelay = options.lineDelay ?? 28;

    for (const line of lines) {
      const entry = document.createElement("div");
      entry.className = `terminal-entry terminal-entry--${tone}`;
      entry.innerHTML = `
        <span class="terminal-entry-gutter">${tone === "error" ? "!" : ">"}</span>
        <span class="terminal-entry-text"></span>
      `;

      output.appendChild(entry);
      mountTerminalEntry(entry);

      const textNode = entry.querySelector(".terminal-entry-text");

      if (prefersReducedMotion) {
        textNode.textContent = line;
        scrollTerminalStream();
      } else {
        await typeText(textNode, line, speed, scrollTerminalStream);
      }

      scrollTerminalStream();
      await wait(lineDelay);
    }
  }

  function mountTerminalEntry(entry) {
    window.requestAnimationFrame(() => {
      entry.classList.add("is-mounted");
    });
  }

  function scrollTerminalStream() {
    output.scrollTop = output.scrollHeight;
  }
}

function getContactLink(label) {
  return portfolioData.contact.find((item) => item.label === label)?.value || "";
}

function openExternalLink(url) {
  if (!isAbsoluteUrl(url)) {
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function moveCaretToEnd(input) {
  const valueLength = input.value.length;
  input.setSelectionRange(valueLength, valueLength);
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
  });
}

function highlightSection(sectionId) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  target.classList.add("is-command-target");

  window.setTimeout(() => {
    target.classList.remove("is-command-target");
  }, 1200);
}

function typeText(element, text, speed, onTick) {
  return new Promise((resolve) => {
    let index = 0;

    const tick = () => {
      element.textContent = text.slice(0, index);
      if (typeof onTick === "function") {
        onTick();
      }
      index += 1;

      if (index <= text.length) {
        window.setTimeout(tick, speed);
      } else {
        resolve();
      }
    };

    tick();
  });
}

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function setupNavigation() {
  const navButtons = [...document.querySelectorAll(".command-chip")];
  const scrollTriggers = [...document.querySelectorAll("[data-target]")];
  const sections = navButtons
    .map((button) => document.getElementById(button.dataset.target))
    .filter(Boolean);

  scrollTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      scrollToSection(button.dataset.target);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navButtons.forEach((button) => {
          const isActive = button.dataset.target === entry.target.id;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-current", isActive ? "true" : "false");
        });
      });
    },
    {
      rootMargin: "-28% 0px -46% 0px",
      threshold: 0.22
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimations() {
  const revealTargets = [];
  const header = document.querySelector(".terminal-chrome");
  const footer = document.querySelector(".terminal-footer");
  const panels = [...document.querySelectorAll(".panel")];

  if (header) {
    revealTargets.push({ element: header, delay: 0 });
  }

  panels.forEach((panel) => {
    const group = [
      panel.querySelector(".panel-heading"),
      panel.querySelector(".typing-terminal"),
      panel.querySelector(".minimal-overview"),
      panel.querySelector(".terminal-console"),
      ...panel.querySelectorAll(".status-card, .output-line, .project-card, .contact-line")
    ].filter(Boolean);

    group.forEach((item, index) => {
      revealTargets.push({
        element: item,
        delay: Math.min(index * 40, 180)
      });
    });
  });

  if (footer) {
    revealTargets.push({ element: footer, delay: 0 });
  }

  revealTargets.forEach(({ element, delay }) => {
    element.setAttribute("data-reveal", "");
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  if (prefersReducedMotion) {
    revealTargets.forEach(({ element }) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealTargets.forEach(({ element }) => observer.observe(element));
}

function setupScramble(scope) {
  const elements = scope.querySelectorAll("[data-scramble]");

  elements.forEach((element) => {
    const targetText = element.dataset.scramble || element.textContent.trim();
    const runScramble = () => scrambleToText(element, targetText);

    element.addEventListener("mouseenter", runScramble);
    element.addEventListener("focus", runScramble);
  });
}

function scrambleToText(element, targetText) {
  if (prefersReducedMotion) {
    element.textContent = targetText;
    return;
  }

  window.clearInterval(element.scrambleTimer);

  let frame = 0;

  element.scrambleTimer = window.setInterval(() => {
    element.textContent = targetText
      .split("")
      .map((character, index) => {
        if (character === " ") {
          return " ";
        }

        if (frame / 2 > index) {
          return targetText[index];
        }

        return scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];
      })
      .join("");

    frame += 1;

    if (frame / 2 > targetText.length) {
      window.clearInterval(element.scrambleTimer);
      element.textContent = targetText;
    }
  }, 24);
}

function setupParallax() {
  if (prefersReducedMotion) {
    return;
  }

  const shell = document.querySelector(".terminal-shell");
  const layers = [...document.querySelectorAll("[data-depth]")];
  const root = document.documentElement;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = null;

  const animate = () => {
    const motionScale = document.body.classList.contains("view-minimal") ? 0.42 : 1;
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    root.style.setProperty("--shell-x", `${currentX * 10 * motionScale}px`);
    root.style.setProperty("--shell-y", `${currentY * 10 * motionScale}px`);
    root.style.setProperty("--shell-rotate-x", `${currentY * -1.8 * motionScale}deg`);
    root.style.setProperty("--shell-rotate-y", `${currentX * 2.6 * motionScale}deg`);

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      layer.style.transform = `translate3d(${currentX * depth * 0.75 * motionScale}px, ${currentY * depth * 0.75 * motionScale}px, 0)`;
    });

    shell.style.boxShadow = `
      ${-currentX * 24 * motionScale}px ${22 + currentY * 10 * motionScale}px 80px rgba(0, 0, 0, 0.42),
      0 0 ${28 * motionScale}px rgba(47, 226, 255, 0.05)
    `;

    if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = null;
    }
  };

  const schedule = () => {
    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX / window.innerWidth - 0.5;
    targetY = event.clientY / window.innerHeight - 0.5;
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
    schedule();
  });

  document.documentElement.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    root.style.setProperty("--pointer-x", "50vw");
    root.style.setProperty("--pointer-y", "38vh");
    schedule();
  });
}

function setupViewModeToggle() {
  const button = document.getElementById("mode-toggle");
  const terminalInput = document.getElementById("terminal-input");

  if (!button) {
    return;
  }

  const applyViewMode = (mode, persist = true) => {
    const isMinimal = mode === "minimal";

    document.body.classList.toggle("view-minimal", isMinimal);
    document.body.classList.toggle("view-terminal", !isMinimal);
    document.body.dataset.viewMode = isMinimal ? "minimal" : "terminal";

    button.setAttribute("aria-pressed", String(isMinimal));
    button.setAttribute(
      "aria-label",
      isMinimal ? "Switch to terminal portfolio view" : "Switch to clean minimal portfolio view"
    );
    button.title = isMinimal ? "Switch to terminal mode" : "Switch to minimal mode";

    if (isMinimal) {
      terminalInput?.blur();
    }

    if (persist) {
      try {
        window.localStorage.setItem(viewModeStorageKey, isMinimal ? "minimal" : "terminal");
      } catch (error) {
        void error;
      }
    }
  };

  let initialMode = "terminal";

  try {
    const savedMode = window.localStorage.getItem(viewModeStorageKey);
    if (savedMode === "minimal" || savedMode === "terminal") {
      initialMode = savedMode;
    }
  } catch (error) {
    void error;
  }

  applyViewMode(initialMode, false);

  button.addEventListener("click", () => {
    const nextMode = document.body.classList.contains("view-minimal") ? "terminal" : "minimal";
    applyViewMode(nextMode);
  });
}

function setupCustomCursor() {
  if (prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;
  let animationFrame = null;

  const animate = () => {
    dotX += (mouseX - dotX) * 0.42;
    dotY += (mouseY - dotY) * 0.42;
    ringX += (mouseX - ringX) * 0.26;
    ringY += (mouseY - ringY) * 0.26;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (
      Math.abs(mouseX - ringX) > 0.1 ||
      Math.abs(mouseY - ringY) > 0.1 ||
      Math.abs(mouseX - dotX) > 0.1 ||
      Math.abs(mouseY - dotY) > 0.1
    ) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = null;
    }
  };

  const schedule = () => {
    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  };

  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.classList.add("is-visible");
    ring.classList.add("is-visible");
    schedule();
  });

  document.addEventListener("pointerdown", () => {
    ring.classList.add("is-pressed");
  });

  document.addEventListener("pointerup", () => {
    ring.classList.remove("is-pressed");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, .project-card, .tag, .status-card, .terminal-console")) {
      ring.classList.add("is-active");
      dot.classList.add("is-active");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, .project-card, .tag, .status-card, .terminal-console")) {
      ring.classList.remove("is-active");
      dot.classList.remove("is-active");
    }
  });

  document.documentElement.addEventListener("mouseleave", () => {
    dot.classList.remove("is-visible");
    ring.classList.remove("is-visible", "is-active", "is-pressed");
  });
}

function setupExternalLinkFeedback() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[target="_blank"]');

    if (!link) {
      return;
    }

    link.classList.add("is-launching");

    window.setTimeout(() => {
      link.classList.remove("is-launching");
    }, 160);
  });
}
