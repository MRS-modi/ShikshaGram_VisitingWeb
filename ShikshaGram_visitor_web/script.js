// ShikshaGram Interactive Engine & Responsive Controller
(function() {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const body = document.body;

  /* -------------------------------------------------------------
     1. Theme Management (Light / Dark mode + Dynamic Logo Switch)
     ------------------------------------------------------------- */
  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");
  const themeLabel = $("#themeLabel");
  const headerLogo = $("#headerLogo");
  const footerLogo = $("#footerLogo");

  function updateLogos(isDark) {
    const src = isDark ? "assets/shikshagram-logo-dark.png" : "assets/shikshagram-logo-light.png";
    if (headerLogo) headerLogo.src = src;
    if (footerLogo) footerLogo.src = src;
  }

  function setTheme(dark) {
    body.classList.toggle("dark", dark);
    if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
    if (themeLabel) themeLabel.textContent = dark ? "Light mode" : "Dark mode";
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    updateLogos(dark);
    try {
      localStorage.setItem("sg-theme", dark ? "dark" : "light");
    } catch (e) {}
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("sg-theme");
  } catch (e) {}

  if (savedTheme !== null) {
    setTheme(savedTheme === "dark");
  } else {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(!body.classList.contains("dark"));
    });
  }

  /* -------------------------------------------------------------
     2. Mobile Navigation & Drawer with Backdrop & Keyboard Trap
     ------------------------------------------------------------- */
  const mobileMenu = $("#mobileMenu");
  const mainNav = $("#mainNav");
  const navBackdrop = $("#navBackdrop");

  function toggleMobileNav(forceState) {
    if (!mainNav || !mobileMenu) return;
    const isCurrentlyOpen = mainNav.classList.contains("open");
    const open = forceState !== undefined ? forceState : !isCurrentlyOpen;

    mainNav.classList.toggle("open", open);
    if (navBackdrop) navBackdrop.classList.toggle("open", open);
    body.classList.toggle("nav-open", open);

    mobileMenu.setAttribute("aria-expanded", String(open));
    const icon = mobileMenu.querySelector(".menu-icon");
    if (icon) icon.textContent = open ? "✕" : "☰";
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => toggleMobileNav());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => toggleMobileNav(false));
  }

  $$(".main-nav a").forEach(link => {
    link.addEventListener("click", () => toggleMobileNav(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav && mainNav.classList.contains("open")) {
      toggleMobileNav(false);
    }
  });

  // Current year in footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------
     3. Smooth Scrollspy for Navigation Link Highlighting
     ------------------------------------------------------------- */
  const navLinks = $$(".main-nav .nav-link");
  const sections = $$("main section[id]");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-20% 0px -65% 0px" });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* -------------------------------------------------------------
     4. Scroll Reveal Animations
     ------------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    const revealTargets = $$(
      ".feature-card, .detail-card, .audience-card, .step, .faq-list details, .section-heading"
    );
    revealTargets.forEach(el => el.classList.add("reveal"));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  /* -------------------------------------------------------------
     5. Toast Notification System (replaces disruptive alert())
     ------------------------------------------------------------- */
  const demoToast = $("#demoToast");
  let toastTimer = null;

  function showToast(title, message) {
    if (!demoToast) return;
    if (toastTimer) clearTimeout(toastTimer);

    demoToast.innerHTML = `
      <div class="toast-card">
        <span class="toast-icon">✓</span>
        <div class="toast-body">
          <strong>${title}</strong>
          <p>${message}</p>
        </div>
        <button class="toast-close" aria-label="Close message">✕</button>
      </div>
    `;
    demoToast.classList.add("active");
    demoToast.setAttribute("aria-hidden", "false");

    const closeBtn = demoToast.querySelector(".toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        demoToast.classList.remove("active");
        demoToast.setAttribute("aria-hidden", "true");
      });
    }

    toastTimer = setTimeout(() => {
      demoToast.classList.remove("active");
      demoToast.setAttribute("aria-hidden", "true");
    }, 4500);
  }

  /* -------------------------------------------------------------
     6. Interactive Browser Simulator Logic
     ------------------------------------------------------------- */
  const defaultStudents = [
    { name: "Aarav Sharma", initials: "AS", cls: "Class 10 · Maths", present: true, avatar: "avatar-a" },
    { name: "Meera Patel", initials: "MP", cls: "Class 10 · Maths", present: false, avatar: "avatar-b" },
    { name: "Kabir Khan", initials: "KK", cls: "Class 10 · Maths", present: false, avatar: "avatar-c" }
  ];
  let students = defaultStudents.map(s => ({ ...s }));

  const roleSelect = $("#roleSelect");
  const panelTitle = $("#panelTitle");
  const panelSubtitle = $("#panelSubtitle");
  const statOneLabel = $("#statOneLabel");
  const statTwoLabel = $("#statTwoLabel");
  const statThreeLabel = $("#statThreeLabel");
  const statOne = $("#statOne");
  const statTwo = $("#statTwo");
  const statThree = $("#statThree");
  const widgetTitle = $("#widgetTitle");
  const widgetDescription = $("#widgetDescription");
  const panelCrumb = $("#panelCrumb");
  const demoPanel = $("#demoPanel");
  let currentPanel = "overview";

  const roleContent = {
    teacher: {
      greeting: "Welcome back, Teacher 👋",
      subtitle: "Here’s a sample view of your institute.",
      stats: ["Students", "Attendance today", "Assignments to review"],
      values: ["248", "92%", "18"]
    },
    student: {
      greeting: "Welcome back, Student 👋",
      subtitle: "Here’s your sample learning overview.",
      stats: ["My subjects", "Attendance", "Tasks due"],
      values: ["6", "94%", "3"]
    },
    parent: {
      greeting: "Welcome, Parent 👋",
      subtitle: "A sample snapshot of your child’s learning.",
      stats: ["Attendance", "Recent score", "Class updates"],
      values: ["94%", "86/100", "2"]
    },
    admin: {
      greeting: "Institute overview 👋",
      subtitle: "A sample summary of institute activity.",
      stats: ["Total students", "Active batches", "Teachers"],
      values: ["248", "12", "16"]
    }
  };

  function updateRole() {
    if (!roleSelect) return;
    const role = roleSelect.value;
    const data = roleContent[role];
    if (panelTitle) panelTitle.textContent = data.greeting;
    if (panelSubtitle) panelSubtitle.textContent = data.subtitle;
    if (statOneLabel) statOneLabel.textContent = data.stats[0];
    if (statTwoLabel) statTwoLabel.textContent = data.stats[1];
    if (statThreeLabel) statThreeLabel.textContent = data.stats[2];
    if (statOne) statOne.textContent = data.values[0];
    if (statTwo) statTwo.textContent = data.values[1];
    if (statThree) statThree.textContent = data.values[2];
    renderPanel(currentPanel);
  }

  if (roleSelect) {
    roleSelect.addEventListener("change", updateRole);
  }

  function renderPanel(panel) {
    currentPanel = panel;
    $$(".sim-nav").forEach(b => b.classList.toggle("active", b.dataset.panel === panel));
    if (panelCrumb) {
      panelCrumb.textContent = ({
        overview: "Overview",
        attendance: "Attendance",
        materials: "Study materials",
        performance: "Performance"
      })[panel];
    }
    const role = roleSelect ? roleSelect.value : "teacher";

    if (panel === "overview" || panel === "attendance") {
      const isAttPanel = panel === "attendance";
      if (widgetTitle) widgetTitle.textContent = isAttPanel ? "Attendance register" : "Today's attendance";
      if (widgetDescription) {
        widgetDescription.textContent = isAttPanel
          ? "Tap a student's button to change their sample attendance status."
          : "Mark a sample student present to see the attendance count update.";
      }
      demoPanel.innerHTML = `
        <div class="demo-stats">
          <div class="demo-stat">
            <span>${roleContent[role].stats[0]}</span>
            <strong>${roleContent[role].values[0]}</strong>
            <small>Sample institute</small>
          </div>
          <div class="demo-stat">
            <span>${roleContent[role].stats[1]}</span>
            <strong>${roleContent[role].values[1]}</strong>
            <small class="stat-good">● Sample metric</small>
          </div>
          <div class="demo-stat">
            <span>${roleContent[role].stats[2]}</span>
            <strong>${roleContent[role].values[2]}</strong>
            <small>Illustrative data</small>
          </div>
        </div>
        <div class="demo-work-grid">
          <div class="demo-widget">
            <div class="widget-heading">
              <strong>${isAttPanel ? "Attendance register" : "Today's attendance"}</strong>
              <span class="widget-tag">DEMO</span>
            </div>
            <p>${role === "student" ? "A sample view of attendance in your class." : "Mark a sample student present to see the attendance count update."}</p>
            <div class="student-list" id="studentList">
              ${students.map((s, i) => `
                <div class="student-row" data-student="${s.name}">
                  <span class="student-avatar ${s.avatar}">${s.initials}</span>
                  <span><strong>${s.name}</strong><small>${s.cls}</small></span>
                  <button class="attendance-button ${s.present ? "present" : ""}" data-index="${i}" data-present="${s.present}">
                    ${s.present ? "Present ✓" : "Mark present +"}
                  </button>
                </div>
              `).join("")}
            </div>
            <div class="widget-foot">
              <span id="attendanceCount">${students.filter(s => s.present).length} of ${students.length} marked present in this mini-demo</span>
              <button class="text-button" id="markAll">Mark all present →</button>
            </div>
          </div>
          <div class="demo-widget ai-widget">
            <div class="ai-widget-head">
              <span class="ai-star">✦</span>
              <div>
                <strong>AI learning assistant</strong>
                <small>Concept simulator</small>
              </div>
              <span class="ai-online" aria-label="Online">●</span>
            </div>
            <p>Choose a sample situation and generate a helpful next step.</p>
            <label class="field-label" for="aiScenario">What would you like help with?</label>
            <div class="select-wrapper">
              <select id="aiScenario">
                <option value="attendance">Attendance has dropped</option>
                <option value="maths">A student struggles with algebra</option>
                <option value="revision">Plan a revision session</option>
                <option value="parent">Write a parent update</option>
              </select>
            </div>
            <button class="button button-primary ai-generate" id="generateAdvice"><span>✦</span> Generate suggestion</button>
            <div class="ai-result" id="aiResult" aria-live="polite">
              <span class="result-spark">✦</span>
              <div>
                <strong>Your suggestion will appear here</strong>
                <p>This is a simulated AI experience using example scenarios—not a connected AI service.</p>
              </div>
            </div>
            <small class="sim-disclaimer">Demo output is illustrative and should be reviewed by a teacher.</small>
          </div>
        </div>
        <div class="demo-bottom-note"><span>ⓘ</span> This playground uses fictional sample data. No real student information is collected or saved.</div>
      `;
      bindAttendance();
      bindAI();
    } else if (panel === "materials") {
      demoPanel.innerHTML = `
        <div class="demo-stats">
          <div class="demo-stat"><span>Resources shared</span><strong>24</strong><small>Sample library</small></div>
          <div class="demo-stat"><span>Subjects</span><strong>6</strong><small>Illustrative data</small></div>
          <div class="demo-stat"><span>New this week</span><strong>5</strong><small>Example uploads</small></div>
        </div>
        <div class="demo-widget">
          <div class="widget-heading">
            <strong>Study material library</strong>
            <span class="widget-tag">SAMPLE FILES</span>
          </div>
          <p>Explore sample notes and assignments. Preview buttons demonstrate the interaction with instant sample feedback.</p>
          <div class="materials-list">
            ${[
              ["Algebra revision notes", "PDF · 8 pages"],
              ["Science chapter summary", "PDF · 5 pages"],
              ["Weekly practice worksheet", "PDF · 2 pages"],
              ["Exam preparation checklist", "PDF · 1 page"]
            ].map(m => `
              <div class="material-item">
                <span class="material-file">PDF</span>
                <span><strong>${m[0]}</strong><small>${m[1]}</small></span>
                <button class="material-preview-btn" data-material="${m[0]}" aria-label="Preview ${m[0]}">Preview ↗</button>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="demo-bottom-note"><span>ⓘ</span> These are illustrative resource cards; no files are uploaded or downloaded in this preview.</div>
      `;
      $$(".material-preview-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          showToast(`Previewing: ${btn.dataset.material}`, "Sample resource opened in demo mode. Cloud hosting connects in production.");
        });
      });
    } else {
      // Performance panel
      demoPanel.innerHTML = `
        <div class="demo-stats">
          <div class="demo-stat"><span>Average score</span><strong>82%</strong><small class="stat-good">● Sample metric</small></div>
          <div class="demo-stat"><span>Improved this month</span><strong>68%</strong><small>Illustrative data</small></div>
          <div class="demo-stat"><span>Topics to revisit</span><strong>4</strong><small>Sample insight</small></div>
        </div>
        <div class="performance-summary">
          <div class="performance-box">
            <h4>Sample class performance</h4>
            <p>Illustrative score pattern across recent tests.</p>
            <div class="score-bars">
              <span style="height:48%" title="Test 1: 48%"></span>
              <span style="height:62%" title="Test 2: 62%"></span>
              <span style="height:57%" title="Test 3: 57%"></span>
              <span style="height:75%" title="Test 4: 75%"></span>
              <span style="height:86%" title="Test 5: 86%"></span>
            </div>
            <div class="score-labels">
              <span>Test 1</span><span>Test 2</span><span>Test 3</span><span>Test 4</span><span>Test 5</span>
            </div>
          </div>
          <div class="performance-box">
            <h4>Suggested focus</h4>
            <p>Based on this fictional class snapshot.</p>
            <div class="ai-result">
              <span class="result-spark">✦</span>
              <div>
                <strong>Revisit algebra foundations</strong>
                <p>Try a short recap, then give students 3 practice questions and review the results.</p>
              </div>
            </div>
            <div class="demo-bottom-note">Teacher judgement should guide every learning decision.</div>
          </div>
        </div>
        <div class="demo-bottom-note"><span>ⓘ</span> All figures are fictional examples and do not represent real student outcomes.</div>
      `;
    }
  }

  function bindAttendance() {
    $$(".attendance-button").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        if (!isNaN(idx) && students[idx]) {
          students[idx].present = !students[idx].present;
          renderPanel(currentPanel);
        }
      });
    });

    const all = $("#markAll");
    if (all) {
      all.addEventListener("click", () => {
        students = students.map(s => ({ ...s, present: true }));
        renderPanel(currentPanel);
      });
    }
  }

  const suggestions = {
    attendance: {
      title: "Build a supportive attendance follow-up",
      text: "Start by checking the attendance pattern across the last few weeks. Speak privately with the student, ask whether there are barriers to attending, and agree on a realistic catch-up plan. Avoid assuming the reason for absences.",
      steps: [
        "Review the recent register and confirm the dates.",
        "Have a private, non-judgemental check-in.",
        "Share missed notes and agree on one next step."
      ],
      review: "Use only verified attendance records and follow your institute's safeguarding and contact policies."
    },
    maths: {
      title: "Break algebra into small, checkable steps",
      text: "Begin with a quick diagnostic question on variables and inverse operations. Model one example aloud, solve one together, then give three short practice questions. Use the student's errors to choose the next explanation.",
      steps: [
        "Check prerequisite understanding first.",
        "Model one worked example, then practise together.",
        "Review three answers and revisit the exact sticking point."
      ],
      review: "Treat this as a teaching idea, not a judgement of the student's ability. Adjust for their current level."
    },
    revision: {
      title: "Try a focused 30-minute revision block",
      text: "Use retrieval practice rather than rereading alone. Ask the learner to recall key ideas, solve a few mixed questions, and explain mistakes in their own words. Finish by noting what still feels unclear.",
      steps: [
        "5 min: recall key ideas without notes.",
        "15 min: solve mixed practice questions.",
        "10 min: review mistakes and write one follow-up goal."
      ],
      review: "Adapt the length and difficulty to the learner's age, workload, and accessibility needs."
    },
    parent: {
      title: "Send a constructive, specific parent update",
      text: "Keep the message factual, kind, and focused on support. Mention the topic being practised, one achievable action at home, and how the teacher will help in class. Avoid sharing comparisons with other students.",
      steps: [
        "State the learning focus clearly.",
        "Suggest one manageable practice activity.",
        "Invite the parent to share relevant context."
      ],
      review: "Check the facts and institute communication policy before sending. This demo does not send messages."
    }
  };

  function bindAI() {
    const generate = $("#generateAdvice");
    if (!generate) return;

    generate.addEventListener("click", () => {
      const scenarioEl = $("#aiScenario");
      const key = scenarioEl ? scenarioEl.value : "attendance";
      const item = suggestions[key];
      const result = $("#aiResult");
      if (!item || !result) return;

      generate.disabled = true;
      generate.innerHTML = "<span>✦</span> Preparing example…";
      result.innerHTML = `<span class="result-spark">✦</span><div><strong>Preparing a structured example…</strong><p>Organising a suggested action and review points.</p></div>`;

      window.setTimeout(() => {
        result.innerHTML = `
          <span class="result-spark">✦</span>
          <div>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
            <ul class="ai-action-list">${item.steps.map(step => `<li>${step}</li>`).join("")}</ul>
            <p class="ai-review-note"><strong>Teacher review:</strong> ${item.review}</p>
            <small class="ai-script-label">SCRIPTED DEMO RESPONSE · NOT LIVE AI</small>
          </div>
        `;
        generate.disabled = false;
        generate.innerHTML = "<span>✦</span> Generate another suggestion";
      }, 350);
    });
  }

  $$(".sim-nav").forEach(btn => {
    btn.addEventListener("click", () => renderPanel(btn.dataset.panel));
  });

  function resetDemo() {
    students = defaultStudents.map(s => ({ ...s }));
    if (roleSelect) roleSelect.value = "teacher";
    renderPanel("overview");
    showToast("Demo reset", "Fictional data has been restored to default values.");
  }

  const resetDemoBtn = $("#resetDemo");
  if (resetDemoBtn) resetDemoBtn.addEventListener("click", resetDemo);

  bindAttendance();
  bindAI();

  /* -------------------------------------------------------------
     7. Auto-sliding Workflow Carousel with Touch Swipe Support
     ------------------------------------------------------------- */
  (function initWorkflowCarousel() {
    const carousel = document.getElementById("workflowCarousel");
    if (!carousel) return;
    const slides = [...carousel.querySelectorAll(".workflow-slide")];
    const dots = [...carousel.querySelectorAll(".workflow-dot")];
    const pauseButton = document.getElementById("workflowPause");
    const prevButton = document.getElementById("workflowPrev");
    const nextButton = document.getElementById("workflowNext");
    let index = 0;
    let timer = null;
    let paused = false;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showSlide(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        slide.setAttribute("aria-hidden", String(i !== index));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-selected", String(i === index));
      });
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function start() {
      stop();
      if (!paused && !reduceMotion && !document.hidden) {
        timer = window.setInterval(() => showSlide(index + 1), 4400);
      }
    }

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.slide));
        start();
      });
    });

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        showSlide(index - 1);
        start();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        showSlide(index + 1);
        start();
      });
    }

    if (pauseButton) {
      pauseButton.addEventListener("click", () => {
        paused = !paused;
        pauseButton.setAttribute("aria-pressed", String(paused));
        pauseButton.textContent = paused ? "▶ Play" : "Ⅱ Pause";
        paused ? stop() : start();
      });
    }

    // Touch Swipe Detection for mobile and tablet
    let touchStartX = 0;
    let touchStartY = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      stop();
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is significantly stronger than vertical scroll
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          showSlide(index + 1); // Swipe left = next
        } else {
          showSlide(index - 1); // Swipe right = prev
        }
      }
      start();
    }, { passive: true });

    // Keyboard navigation when focused
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        showSlide(index - 1);
        start();
      } else if (e.key === "ArrowRight") {
        showSlide(index + 1);
        start();
      }
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

    showSlide(0);
    start();
  })();

  /* -------------------------------------------------------------
     8. Back to Top Button
     ------------------------------------------------------------- */
  const backToTop = $("#backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

})();
