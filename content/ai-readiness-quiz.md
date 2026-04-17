---
title: "Is Your Business AI-Ready? Free Assessment"
description: "Take this 2-minute quiz to discover how prepared your business is for AI automation — get a personalized readiness score, a savings estimate, and a priority action plan."
layout: single
image: /images/quiz/quiz-hero.png
---

<div id="quiz-app" data-tier="">

  <!-- ===== AURORA BACKGROUND (intro only) ===== -->
  <div class="quiz-aurora" aria-hidden="true">
    <span class="quiz-aurora-blob b1"></span>
    <span class="quiz-aurora-blob b2"></span>
    <span class="quiz-aurora-blob b3"></span>
  </div>

  <!-- ===== INTRO SCREEN ===== -->
  <div class="quiz-screen quiz-intro active" id="screen-intro">
    <div class="quiz-intro-grid">
      <div class="quiz-intro-copy">
        <div class="quiz-intro-badge">
          <span class="quiz-intro-dot"></span>
          Free · No signup
        </div>
        <h1 class="quiz-intro-title">Is your business<br><span class="quiz-accent">AI&#8209;ready?</span></h1>
        <p class="quiz-intro-sub">10 questions. 2 minutes. Get a personalized readiness score, an estimate of how many hours and dollars AI could save you, and a priority action plan you can start this week.</p>
        <div class="quiz-intro-stats">
          <div class="quiz-stat"><span class="quiz-stat-number">10</span><span class="quiz-stat-label">Questions</span></div>
          <div class="quiz-stat-divider"></div>
          <div class="quiz-stat"><span class="quiz-stat-number">~2 min</span><span class="quiz-stat-label">To complete</span></div>
          <div class="quiz-stat-divider"></div>
          <div class="quiz-stat"><span class="quiz-stat-number">$</span><span class="quiz-stat-label">Savings estimate</span></div>
        </div>
        <button class="quiz-btn-start" onclick="startQuiz()">
          Start the Assessment
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <p class="quiz-intro-note">Results appear instantly. No email required.</p>
      </div>
      <div class="quiz-intro-visual">
        <div class="quiz-intro-visual-glow"></div>
        <img src="/images/quiz/quiz-hero.png" alt="AI readiness assessment visual — a glowing brain with a golden halo surrounded by floating data panels" class="quiz-intro-visual-img" loading="eager" />
        <div class="quiz-intro-chip quiz-intro-chip-1">
          <span class="quiz-chip-icon" aria-hidden="true">&#9889;</span>
          <span>Save ~10 hrs/week</span>
        </div>
        <div class="quiz-intro-chip quiz-intro-chip-2">
          <span class="quiz-chip-icon" aria-hidden="true">&#128176;</span>
          <span>Up to $15k/year</span>
        </div>
        <div class="quiz-intro-chip quiz-intro-chip-3">
          <span class="quiz-chip-icon" aria-hidden="true">&#128200;</span>
          <span>Peer benchmark</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== PROGRESS BAR ===== -->
  <div class="quiz-progress-wrap" id="quiz-progress" style="display:none;">
    <button class="quiz-back-btn" id="quiz-back" onclick="goBack()" aria-label="Go back to previous question">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back
    </button>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" id="progress-fill"></div>
    </div>
    <span class="quiz-progress-label" id="progress-label">1 of 10</span>
  </div>

  <!-- ===== QUESTIONS ===== -->
  <div class="quiz-screen quiz-question" id="screen-q0" data-cat="foundation">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128187;</span>
      <div>
        <div class="quiz-q-cat">Digital Foundation</div>
        <div class="quiz-q-number">Question 1 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How do you manage your daily business tasks?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(0,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">Mostly pen and paper, sticky notes, or memory</span></button>
      <button class="quiz-option" onclick="answer(0,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">Basic digital tools — email, spreadsheets, maybe Google Docs</span></button>
      <button class="quiz-option" onclick="answer(0,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">Dedicated software for most things — CRM, project management, accounting</span></button>
      <button class="quiz-option" onclick="answer(0,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">Integrated systems with some automations already running</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q1" data-cat="automation">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#9889;</span>
      <div>
        <div class="quiz-q-cat">Automation Potential</div>
        <div class="quiz-q-number">Question 2 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How much of your work week goes to repetitive tasks?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(1,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">Very little — most of my work is creative or unique each time</span></button>
      <button class="quiz-option" onclick="answer(1,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">A few hours a week on routine admin, data entry, or scheduling</span></button>
      <button class="quiz-option" onclick="answer(1,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">1-2 hours a day on tasks that follow the same pattern</span></button>
      <button class="quiz-option" onclick="answer(1,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">More than half my day is routine tasks I wish someone else could do</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q2" data-cat="data">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128202;</span>
      <div>
        <div class="quiz-q-cat">Data &amp; Process Maturity</div>
        <div class="quiz-q-number">Question 3 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">What does your business data situation look like?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(2,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I don't really track data digitally — it's mostly in my head</span></button>
      <button class="quiz-option" onclick="answer(2,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">Some data in spreadsheets or basic tools, but it's scattered</span></button>
      <button class="quiz-option" onclick="answer(2,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">Organized data across several tools — analytics, CRM, sales records</span></button>
      <button class="quiz-option" onclick="answer(2,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">Clean, structured data with dashboards and regular reporting</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q3" data-cat="content">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#9997;</span>
      <div>
        <div class="quiz-q-cat">Content &amp; Social Volume</div>
        <div class="quiz-q-number">Question 4 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How much content does your business create?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(3,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">Almost none — a social post here and there, maybe</span></button>
      <button class="quiz-option" onclick="answer(3,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">Some regular content — weekly social posts or a monthly newsletter</span></button>
      <button class="quiz-option" onclick="answer(3,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">Quite a bit — blog posts, social media, emails, and marketing materials</span></button>
      <button class="quiz-option" onclick="answer(3,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">A lot — daily content across multiple channels and formats</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q4" data-cat="content">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#11088;</span>
      <div>
        <div class="quiz-q-cat">Content &amp; Social Volume</div>
        <div class="quiz-q-number">Question 5 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How do you handle customer reviews and feedback?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(4,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I rarely get reviews, or don't check them</span></button>
      <button class="quiz-option" onclick="answer(4,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">I check reviews sometimes but don't have a system for it</span></button>
      <button class="quiz-option" onclick="answer(4,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">I monitor and respond to reviews regularly, but it's all manual</span></button>
      <button class="quiz-option" onclick="answer(4,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">I have alerts, templates, or a system for tracking and analyzing feedback</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q5" data-cat="foundation">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128736;</span>
      <div>
        <div class="quiz-q-cat">Digital Foundation</div>
        <div class="quiz-q-number">Question 6 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">What's your comfort level with new digital tools?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(5,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I prefer sticking with what I know — new tools stress me out</span></button>
      <button class="quiz-option" onclick="answer(5,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">I'll try something new if someone walks me through it</span></button>
      <button class="quiz-option" onclick="answer(5,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">I regularly try new tools and usually pick them up fast</span></button>
      <button class="quiz-option" onclick="answer(5,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">I actively hunt for new tools and love experimenting with technology</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q6" data-cat="automation">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128241;</span>
      <div>
        <div class="quiz-q-cat">Automation Potential</div>
        <div class="quiz-q-number">Question 7 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How much time do you spend on social media management?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(6,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I barely have a social media presence for my business</span></button>
      <button class="quiz-option" onclick="answer(6,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">I post occasionally but it feels like a chore</span></button>
      <button class="quiz-option" onclick="answer(6,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">I post regularly but spending hours creating content each week</span></button>
      <button class="quiz-option" onclick="answer(6,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">Social media is a core channel — I post daily across multiple platforms</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q7" data-cat="data">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128176;</span>
      <div>
        <div class="quiz-q-cat">Data &amp; Process Maturity</div>
        <div class="quiz-q-number">Question 8 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">What's your approach to business tool spending?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(7,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I avoid paying for tools whenever possible</span></button>
      <button class="quiz-option" onclick="answer(7,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">I use mostly free tools and only pay when absolutely necessary</span></button>
      <button class="quiz-option" onclick="answer(7,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">I invest in tools that clearly save me time or make me money</span></button>
      <button class="quiz-option" onclick="answer(7,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">I regularly evaluate tools based on ROI and invest confidently</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q8" data-cat="mindset">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#127919;</span>
      <div>
        <div class="quiz-q-cat">AI Readiness Mindset</div>
        <div class="quiz-q-number">Question 9 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">How is your industry responding to AI?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(8,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">Very traditional — almost nobody in my space talks about AI</span></button>
      <button class="quiz-option" onclick="answer(8,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">A few early adopters are experimenting, but it's not mainstream</span></button>
      <button class="quiz-option" onclick="answer(8,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">AI tools are becoming common — competitors are starting to use them</span></button>
      <button class="quiz-option" onclick="answer(8,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">AI is already reshaping my industry — those not adopting are falling behind</span></button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q9" data-cat="mindset">
    <div class="quiz-q-head">
      <span class="quiz-q-cat-icon" aria-hidden="true">&#128161;</span>
      <div>
        <div class="quiz-q-cat">AI Readiness Mindset</div>
        <div class="quiz-q-number">Question 10 of 10</div>
      </div>
    </div>
    <h3 class="quiz-q-text">When you think about using AI in your business, what comes to mind?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(9,1)"><span class="quiz-option-icon">A</span><span class="quiz-option-text">I'm honestly not sure how AI could help my specific business</span></button>
      <button class="quiz-option" onclick="answer(9,2)"><span class="quiz-option-icon">B</span><span class="quiz-option-text">I've heard it can help, but I don't know where to start</span></button>
      <button class="quiz-option" onclick="answer(9,3)"><span class="quiz-option-icon">C</span><span class="quiz-option-text">I have specific tasks in mind that AI could probably handle</span></button>
      <button class="quiz-option" onclick="answer(9,4)"><span class="quiz-option-icon">D</span><span class="quiz-option-text">I've already tried AI tools and I'm looking to go deeper</span></button>
    </div>
  </div>

  <!-- ===== CALCULATING SCREEN ===== -->
  <div class="quiz-screen quiz-calculating" id="screen-calculating">
    <div class="quiz-calc-spinner">
      <svg viewBox="0 0 50 50" class="quiz-spinner-svg">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#EEF2FF" />
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#4F46E5" stroke-dasharray="80 126" stroke-linecap="round" class="quiz-spinner-path" />
      </svg>
    </div>
    <h3 class="quiz-calc-title">Building your report</h3>
    <ul class="quiz-calc-steps">
      <li class="quiz-calc-step" data-step="1"><span class="quiz-calc-check">&#10003;</span> Analyzing your 10 responses</li>
      <li class="quiz-calc-step" data-step="2"><span class="quiz-calc-check">&#10003;</span> Calculating potential hours saved</li>
      <li class="quiz-calc-step" data-step="3"><span class="quiz-calc-check">&#10003;</span> Benchmarking against small business peers</li>
      <li class="quiz-calc-step" data-step="4"><span class="quiz-calc-check">&#10003;</span> Matching your priority action plan</li>
    </ul>
  </div>

  <!-- ===== RESULTS SCREEN ===== -->
  <div class="quiz-screen quiz-results" id="screen-results">
    <canvas class="quiz-confetti" id="confetti-canvas" aria-hidden="true"></canvas>

    <!-- Hero result card -->
    <div class="quiz-result-hero">
      <div class="quiz-result-hero-visual">
        <img src="/images/quiz/tier-explorer.png" alt="Your AI readiness tier illustration" id="tier-image" class="quiz-tier-img" />
        <div class="quiz-tier-img-glow" id="tier-img-glow"></div>
      </div>
      <div class="quiz-result-hero-body">
        <div class="quiz-result-badge" id="result-badge">AI Explorer</div>
        <h2 class="quiz-result-title" id="result-title">Your AI Readiness Level</h2>
        <div class="quiz-score-row">
          <div class="quiz-result-score-wrap">
            <svg viewBox="0 0 160 160" class="quiz-score-ring">
              <circle cx="80" cy="80" r="70" fill="none" stroke="#EEF2FF" stroke-width="10" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" stroke-width="10" stroke-dasharray="440" stroke-dashoffset="440" stroke-linecap="round" transform="rotate(-90 80 80)" class="quiz-score-fill" id="score-ring" />
            </svg>
            <div class="quiz-score-inner">
              <span class="quiz-score-num" id="score-number">0</span>
              <span class="quiz-score-of">/ 40</span>
            </div>
          </div>
          <div class="quiz-score-meta">
            <div class="quiz-score-meta-row">
              <span class="quiz-score-meta-label">Percentile</span>
              <span class="quiz-score-meta-value"><span id="percentile-number">0</span><span class="quiz-score-meta-sup">th</span></span>
            </div>
            <div class="quiz-score-meta-bar">
              <div class="quiz-score-meta-bar-fill" id="percentile-bar"></div>
            </div>
            <p class="quiz-score-meta-desc" id="percentile-desc">Higher than most small business owners.</p>
          </div>
        </div>
        <p class="quiz-result-desc" id="result-desc">Loading your personalized results...</p>
      </div>
    </div>

    <!-- VALUE STATS ROW -->
    <div class="quiz-value-stats">
      <div class="quiz-value-card">
        <div class="quiz-value-card-icon">&#9201;</div>
        <div class="quiz-value-card-label">Hours AI could save you</div>
        <div class="quiz-value-card-number"><span id="hours-saved">0</span><span class="quiz-value-card-unit"> / week</span></div>
        <div class="quiz-value-card-sub" id="hours-saved-sub">Based on your answers about repetitive tasks &amp; content.</div>
      </div>
      <div class="quiz-value-card">
        <div class="quiz-value-card-icon">&#128176;</div>
        <div class="quiz-value-card-label">Estimated value of that time</div>
        <div class="quiz-value-card-number">$<span id="dollars-saved">0</span><span class="quiz-value-card-unit"> / year</span></div>
        <div class="quiz-value-card-sub">At a conservative $35/hr opportunity cost.</div>
      </div>
      <div class="quiz-value-card">
        <div class="quiz-value-card-icon">&#128200;</div>
        <div class="quiz-value-card-label">Your biggest opportunity</div>
        <div class="quiz-value-card-number quiz-value-card-small" id="biggest-opportunity">&mdash;</div>
        <div class="quiz-value-card-sub">The area where automation will pay back fastest.</div>
      </div>
    </div>

    <!-- RADAR CHART -->
    <div class="quiz-radar-section">
      <h3 class="quiz-section-title">Your readiness across 5 dimensions</h3>
      <p class="quiz-section-sub">Each axis is scored 0–8. The further from center, the more prepared you are.</p>
      <div class="quiz-radar-wrap">
        <svg viewBox="-160 -160 320 320" class="quiz-radar-svg" id="radar-svg" aria-hidden="true">
          <!-- Grid rings -->
          <polygon points="" class="quiz-radar-grid" id="radar-grid-100"></polygon>
          <polygon points="" class="quiz-radar-grid" id="radar-grid-75"></polygon>
          <polygon points="" class="quiz-radar-grid" id="radar-grid-50"></polygon>
          <polygon points="" class="quiz-radar-grid" id="radar-grid-25"></polygon>
          <!-- Axes -->
          <g id="radar-axes"></g>
          <!-- Data shape -->
          <polygon points="" class="quiz-radar-shape" id="radar-shape"></polygon>
          <!-- Data points -->
          <g id="radar-points"></g>
          <!-- Axis labels -->
          <g id="radar-labels"></g>
        </svg>
        <div class="quiz-radar-legend" id="radar-legend"></div>
      </div>
    </div>

    <!-- ACTION PLAN -->
    <div class="quiz-plan-section">
      <h3 class="quiz-section-title">Your priority action plan</h3>
      <p class="quiz-section-sub">Sequenced for your tier. Start at the top — it's the highest-ROI move you can make.</p>
      <div class="quiz-plan-timeline" id="plan-timeline">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- EMAIL CAPTURE -->
    <div class="quiz-email-capture" id="email-capture">
      <div class="quiz-email-icon" aria-hidden="true">&#128231;</div>
      <h3 class="quiz-email-title">Want this plan in your inbox?</h3>
      <p class="quiz-email-sub">Get your full action plan emailed to you, plus one practical AI automation tip a week. No fluff. Unsubscribe anytime.</p>
      <form class="quiz-email-form" id="quiz-email-form" onsubmit="submitEmail(event)">
        <input type="email" name="email" id="quiz-email-input" placeholder="you@yourbusiness.com" class="quiz-email-input" required autocomplete="email" />
        <input type="text" name="website" class="quiz-email-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <button type="submit" class="quiz-email-btn">
          <span class="quiz-email-btn-label">Send me the plan</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
      <div class="quiz-email-status" id="quiz-email-status" aria-live="polite"></div>
    </div>

    <!-- SHARE -->
    <div class="quiz-result-share">
      <p class="quiz-share-label">Know someone who'd find this useful?</p>
      <div class="quiz-share-buttons">
        <button class="quiz-share-btn quiz-share-x" onclick="shareX()" aria-label="Share on X">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X
        </button>
        <button class="quiz-share-btn quiz-share-li" onclick="shareLinkedIn()" aria-label="Share on LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </button>
        <button class="quiz-share-btn quiz-share-wa" onclick="shareWhatsApp()" aria-label="Share on WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
        <button class="quiz-share-btn quiz-share-copy" onclick="copyLink()" aria-label="Copy link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          <span id="copy-label">Copy link</span>
        </button>
      </div>
    </div>

    <div class="quiz-result-footer">
      <button class="quiz-btn-retake" onclick="retakeQuiz()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
        Retake quiz
      </button>
      <a href="/tools/" class="quiz-btn-tools">Explore our AI tools &rarr;</a>
    </div>
  </div>
</div>

<style>
/* ===== CSS VARS + RESET ===== */
#quiz-app {
  --q-ink: #111827;
  --q-muted: #6B7280;
  --q-faint: #9CA3AF;
  --q-line: #E5E7EB;
  --q-tint: #EEF2FF;
  --q-accent: #4F46E5;
  --q-accent-2: #7C3AED;
  --q-gold: #F59E0B;
  --q-berry: #2563EB;
  --q-radius: 16px;
  --q-radius-sm: 10px;
  --tier-color: #4F46E5;
  --tier-tint: #EEF2FF;
  --tier-grad: linear-gradient(135deg, #4F46E5, #7C3AED);

  max-width: 760px;
  margin: 0 auto 48px;
  position: relative;
  min-height: 520px;
}
#quiz-app *, #quiz-app *::before, #quiz-app *::after { box-sizing: border-box; }

/* Tier theming */
#quiz-app[data-tier="tier-1"] { --tier-color: #D97706; --tier-tint: #FEF3C7; --tier-grad: linear-gradient(135deg, #F59E0B, #D97706); }
#quiz-app[data-tier="tier-2"] { --tier-color: #2563EB; --tier-tint: #DBEAFE; --tier-grad: linear-gradient(135deg, #2563EB, #4F46E5); }
#quiz-app[data-tier="tier-3"] { --tier-color: #059669; --tier-tint: #D1FAE5; --tier-grad: linear-gradient(135deg, #10B981, #059669); }
#quiz-app[data-tier="tier-4"] { --tier-color: #7C3AED; --tier-tint: #EDE9FE; --tier-grad: linear-gradient(135deg, #7C3AED, #5B21B6); }

/* ===== AURORA BACKGROUND (intro) ===== */
.quiz-aurora {
  position: absolute;
  inset: -40px -20px auto -20px;
  height: 580px;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
  border-radius: 24px;
}
#quiz-app[data-phase="intro"] .quiz-aurora { opacity: 1; }
.quiz-aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  animation: quiz-float 14s ease-in-out infinite;
}
.quiz-aurora-blob.b1 { width: 360px; height: 360px; background: #A5B4FC; top: -100px; left: -80px; }
.quiz-aurora-blob.b2 { width: 300px; height: 300px; background: #FCD34D; top: 60px; right: -60px; animation-delay: -4s; }
.quiz-aurora-blob.b3 { width: 280px; height: 280px; background: #C4B5FD; bottom: -80px; left: 40%; animation-delay: -8s; }
@keyframes quiz-float {
  0%, 100% { transform: translate(0,0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.08); }
  66% { transform: translate(-20px, 25px) scale(0.95); }
}

/* ===== SCREENS ===== */
.quiz-screen {
  display: none;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: relative;
  z-index: 1;
}
.quiz-screen.active { display: block; opacity: 1; transform: translateY(0); }
.quiz-screen.fade-out { opacity: 0; transform: translateY(-12px); }

/* ===== INTRO ===== */
.quiz-intro { padding: 16px 0 0; }
.quiz-intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}
.quiz-intro-copy { text-align: left; }
.quiz-intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(79,70,229,0.2);
  color: #4F46E5;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.quiz-intro-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
  animation: quiz-pulse-dot 2s ease-in-out infinite;
}
@keyframes quiz-pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.25); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0.1); }
}
.quiz-intro-title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.035em;
  color: #111827;
  margin: 0 0 16px;
}
.quiz-accent {
  background: linear-gradient(135deg, #4F46E5, #7C3AED);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.quiz-intro-sub {
  font-size: 16px;
  color: #4B5563;
  line-height: 1.65;
  margin: 0 0 28px;
  max-width: 440px;
}
.quiz-intro-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}
.quiz-stat { display: flex; flex-direction: column; gap: 2px; }
.quiz-stat-number { font-size: 19px; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
.quiz-stat-label { font-size: 12px; color: #9CA3AF; font-weight: 500; }
.quiz-stat-divider { width: 1px; height: 28px; background: #E5E7EB; }
.quiz-btn-start {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #4F46E5, #6D28D9);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  letter-spacing: -0.01em;
  box-shadow: 0 4px 14px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
}
.quiz-btn-start:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(79,70,229,0.45); }
.quiz-btn-start:active { transform: translateY(0); }
.quiz-intro-note { font-size: 12px; color: #9CA3AF; margin: 14px 0 0; }

/* Intro visual */
.quiz-intro-visual {
  position: relative;
  aspect-ratio: 1/1;
  width: 100%;
  max-width: 360px;
  margin: 0 0 0 auto;
}
.quiz-intro-visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(79,70,229,0.25), 0 4px 12px rgba(0,0,0,0.08);
  animation: quiz-visual-in 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.quiz-intro-visual-glow {
  position: absolute;
  inset: -10%;
  background: radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, transparent 65%);
  filter: blur(20px);
  z-index: -1;
  animation: quiz-glow-pulse 6s ease-in-out infinite;
}
@keyframes quiz-visual-in { from { opacity: 0; transform: scale(0.92) rotate(-2deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
@keyframes quiz-glow-pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }

.quiz-intro-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(17,24,39,0.08);
  padding: 8px 14px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  box-shadow: 0 8px 24px rgba(17,24,39,0.12);
  animation: quiz-chip-float 5s ease-in-out infinite;
}
.quiz-chip-icon { font-size: 15px; }
.quiz-intro-chip-1 { top: 8%; left: -18%; animation-delay: -1s; }
.quiz-intro-chip-2 { top: 48%; right: -12%; animation-delay: -2.5s; }
.quiz-intro-chip-3 { bottom: 6%; left: -8%; animation-delay: -4s; }
@keyframes quiz-chip-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ===== PROGRESS BAR ===== */
.quiz-progress-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  padding-top: 8px;
  position: relative;
  z-index: 1;
}
.quiz-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: 1.5px solid #E5E7EB;
  color: #6B7280;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
  opacity: 0;
  pointer-events: none;
}
.quiz-back-btn.visible { opacity: 1; pointer-events: auto; }
.quiz-back-btn:hover { border-color: #4F46E5; color: #4F46E5; }
.quiz-progress-bar {
  flex: 1;
  height: 8px;
  background: #EEF2FF;
  border-radius: 10px;
  overflow: hidden;
}
.quiz-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4F46E5, #7C3AED);
  border-radius: 10px;
  width: 10%;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.quiz-progress-label {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  white-space: nowrap;
  min-width: 52px;
  text-align: right;
}

/* ===== QUESTIONS ===== */
.quiz-q-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.quiz-q-cat-icon {
  font-size: 18px;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EEF2FF;
  border-radius: 10px;
}
.quiz-q-cat {
  font-size: 11px;
  font-weight: 700;
  color: #4F46E5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.2;
}
.quiz-q-number { font-size: 12px; color: #9CA3AF; font-weight: 500; margin-top: 2px; }
.quiz-q-text {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  margin: 0 0 24px;
  letter-spacing: -0.02em;
}
.quiz-options { display: flex; flex-direction: column; gap: 10px; }
.quiz-option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: inherit;
  width: 100%;
}
.quiz-option:hover {
  border-color: #4F46E5;
  background: #FAFAFE;
  box-shadow: 0 2px 12px rgba(79,70,229,0.08);
  transform: translateY(-1px);
}
.quiz-option:active { transform: scale(0.99); }
.quiz-option.selected {
  border-color: #4F46E5;
  background: linear-gradient(135deg, #EEF2FF, #F5F3FF);
  box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
}
.quiz-option-icon {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s ease;
}
.quiz-option:hover .quiz-option-icon { background: #EEF2FF; color: #4F46E5; }
.quiz-option.selected .quiz-option-icon { background: #4F46E5; color: #fff; }
.quiz-option-text { font-size: 15px; color: #374151; line-height: 1.5; padding-top: 3px; }

/* ===== CALCULATING ===== */
.quiz-calculating { text-align: center; padding: 40px 0 60px; }
.quiz-calc-spinner { width: 56px; height: 56px; margin: 0 auto 20px; }
.quiz-spinner-svg { width: 100%; height: 100%; animation: quiz-spin 1.2s linear infinite; }
.quiz-spinner-path { animation: quiz-dash 1.5s ease-in-out infinite; }
@keyframes quiz-spin { 100% { transform: rotate(360deg); } }
@keyframes quiz-dash {
  0% { stroke-dasharray: 1 126; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 80 126; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 1 126; stroke-dashoffset: -126; }
}
.quiz-calc-title { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 20px; }
.quiz-calc-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}
.quiz-calc-step {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #6B7280;
  opacity: 0.4;
  transition: opacity 0.4s ease, color 0.4s ease;
}
.quiz-calc-step.active { opacity: 1; color: #111827; }
.quiz-calc-step.done { opacity: 0.85; color: #059669; }
.quiz-calc-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E5E7EB;
  color: transparent;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.3s ease;
}
.quiz-calc-step.done .quiz-calc-check { background: #059669; color: #fff; }

/* ===== RESULTS ===== */
.quiz-results { padding: 8px 0 0; position: relative; }
.quiz-confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  width: 100vw;
  height: 100vh;
}

/* Hero block */
.quiz-result-hero {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 28px;
  align-items: center;
  background: linear-gradient(135deg, var(--tier-tint) 0%, rgba(255,255,255,0.6) 100%);
  border: 1px solid var(--q-line);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}
.quiz-result-hero::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 220px;
  height: 220px;
  background: var(--tier-grad);
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}
.quiz-result-hero-visual {
  position: relative;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
}
.quiz-tier-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  animation: quiz-visual-in 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.quiz-tier-img-glow {
  position: absolute;
  inset: -10%;
  background: var(--tier-grad);
  filter: blur(40px);
  opacity: 0.5;
  z-index: -1;
  animation: quiz-glow-pulse 4s ease-in-out infinite;
}
.quiz-result-hero-body { text-align: left; position: relative; z-index: 1; }
.quiz-result-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
  background: var(--tier-color);
  color: #fff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
}
.quiz-result-title {
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.quiz-score-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
}
.quiz-result-score-wrap { position: relative; width: 120px; height: 120px; flex-shrink: 0; color: var(--tier-color); }
.quiz-score-ring { width: 100%; height: 100%; }
.quiz-score-fill { transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
.quiz-score-inner { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
.quiz-score-num { display: block; font-size: 34px; font-weight: 800; color: #111827; line-height: 1; letter-spacing: -0.03em; }
.quiz-score-of { font-size: 11px; color: #9CA3AF; font-weight: 500; }
.quiz-score-meta { flex: 1; min-width: 0; }
.quiz-score-meta-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
.quiz-score-meta-label { font-size: 12px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.quiz-score-meta-value { font-size: 26px; font-weight: 800; color: var(--tier-color); line-height: 1; }
.quiz-score-meta-sup { font-size: 13px; margin-left: 2px; vertical-align: super; }
.quiz-score-meta-bar { height: 6px; background: #F3F4F6; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
.quiz-score-meta-bar-fill { height: 100%; background: var(--tier-grad); border-radius: 10px; width: 0%; transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s; }
.quiz-score-meta-desc { font-size: 13px; color: #6B7280; line-height: 1.4; margin: 0; }
.quiz-result-desc { font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0; }

/* VALUE STATS */
.quiz-value-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 40px;
}
.quiz-value-card {
  background: #fff;
  border: 1px solid var(--q-line);
  border-radius: 16px;
  padding: 20px;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}
.quiz-value-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 3px;
  background: var(--tier-grad);
}
.quiz-value-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(17,24,39,0.06); }
.quiz-value-card-icon { font-size: 22px; margin-bottom: 10px; }
.quiz-value-card-label { font-size: 12px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
.quiz-value-card-number {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 8px;
}
.quiz-value-card-small { font-size: 20px; line-height: 1.2; }
.quiz-value-card-unit { font-size: 14px; font-weight: 600; color: #9CA3AF; }
.quiz-value-card-sub { font-size: 12px; color: #6B7280; line-height: 1.5; }

/* RADAR */
.quiz-radar-section { margin-bottom: 40px; }
.quiz-section-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px;
  text-align: center;
  letter-spacing: -0.02em;
}
.quiz-section-sub { font-size: 14px; color: #6B7280; text-align: center; margin: 0 0 22px; }
.quiz-radar-wrap {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: center;
  background: #fff;
  border: 1px solid var(--q-line);
  border-radius: 16px;
  padding: 24px;
}
.quiz-radar-svg { width: 100%; height: auto; max-width: 320px; }
.quiz-radar-grid { fill: #F9FAFB; stroke: #E5E7EB; stroke-width: 1; }
.quiz-radar-shape { fill: var(--tier-color); fill-opacity: 0.15; stroke: var(--tier-color); stroke-width: 2; stroke-linejoin: round; transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
.quiz-radar-point { fill: #fff; stroke: var(--tier-color); stroke-width: 2.5; }
.quiz-radar-axis { stroke: #E5E7EB; stroke-width: 1; }
.quiz-radar-label { font-size: 10px; font-weight: 600; fill: #6B7280; font-family: inherit; }
.quiz-radar-legend { display: flex; flex-direction: column; gap: 10px; }
.quiz-radar-legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background: #F9FAFB;
  border-radius: 10px;
  font-size: 13px;
}
.quiz-radar-legend-label { display: flex; align-items: center; gap: 8px; color: #374151; font-weight: 500; }
.quiz-radar-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.quiz-radar-legend-score { font-weight: 700; color: #111827; font-size: 13px; }

/* ACTION PLAN */
.quiz-plan-section { margin-bottom: 40px; }
.quiz-plan-timeline {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.quiz-plan-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: stretch;
}
.quiz-plan-when {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 0 20px 4px;
  border-left: 2px solid var(--tier-color);
  padding-left: 18px;
  position: relative;
}
.quiz-plan-when::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 22px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tier-color);
  box-shadow: 0 0 0 4px var(--tier-tint);
}
.quiz-plan-when-label { font-size: 12px; font-weight: 700; color: var(--tier-color); text-transform: uppercase; letter-spacing: 0.08em; }
.quiz-plan-when-time { font-size: 13px; color: #6B7280; }
.quiz-plan-cards { display: flex; flex-direction: column; gap: 10px; }
.quiz-plan-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border: 1px solid var(--q-line);
  border-radius: 12px;
  padding: 16px 18px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.quiz-plan-card:hover {
  transform: translateY(-1px);
  border-color: var(--tier-color);
  box-shadow: 0 6px 18px rgba(17,24,39,0.05);
}
.quiz-plan-card-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: var(--tier-tint);
}
.quiz-plan-card-body { flex: 1; min-width: 0; }
.quiz-plan-card-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0 0 4px; line-height: 1.35; }
.quiz-plan-card-desc { font-size: 13px; color: #6B7280; line-height: 1.5; margin: 0 0 6px; }
.quiz-plan-card-meta { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; }
.quiz-plan-card-time { display: inline-flex; align-items: center; gap: 4px; color: #6B7280; font-weight: 500; }
.quiz-plan-card-link { display: inline-flex; align-items: center; gap: 3px; color: var(--tier-color); font-weight: 600; text-decoration: none; }
.quiz-plan-card-link::after { content: '→'; transition: transform 0.2s ease; }
.quiz-plan-card:hover .quiz-plan-card-link::after { transform: translateX(2px); }

/* EMAIL CAPTURE */
.quiz-email-capture {
  background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  color: #fff;
  border-radius: 20px;
  padding: 32px 28px;
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}
.quiz-email-capture::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--tier-color) 0%, transparent 60%);
  opacity: 0.3;
  pointer-events: none;
}
.quiz-email-capture > * { position: relative; z-index: 1; }
.quiz-email-icon {
  font-size: 32px;
  width: 56px;
  height: 56px;
  background: rgba(255,255,255,0.08);
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.quiz-email-title { font-size: 22px; font-weight: 700; margin: 0 0 8px; letter-spacing: -0.02em; }
.quiz-email-sub { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; margin: 0 0 22px; max-width: 480px; margin-left: auto; margin-right: auto; }
.quiz-email-form {
  display: flex;
  gap: 8px;
  max-width: 440px;
  margin: 0 auto;
  flex-wrap: wrap;
}
.quiz-email-input {
  flex: 1;
  min-width: 200px;
  padding: 13px 16px;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.quiz-email-input::placeholder { color: rgba(255,255,255,0.4); }
.quiz-email-input:focus {
  outline: none;
  border-color: var(--tier-color);
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--tier-color) 25%, transparent);
}
.quiz-email-honeypot { position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; opacity: 0; }
.quiz-email-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--tier-grad);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 13px 22px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}
.quiz-email-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(0,0,0,0.3); }
.quiz-email-btn:disabled { opacity: 0.7; cursor: wait; }
.quiz-email-status {
  font-size: 13px;
  margin-top: 14px;
  min-height: 16px;
}
.quiz-email-status.success { color: #6EE7B7; }
.quiz-email-status.error { color: #FCA5A5; }

/* SHARE */
.quiz-result-share {
  background: #F9FAFB;
  border: 1px solid var(--q-line);
  border-radius: 16px;
  padding: 22px;
  margin-bottom: 20px;
  text-align: center;
}
.quiz-share-label { font-size: 14px; font-weight: 600; color: #374151; margin: 0 0 14px; }
.quiz-share-buttons { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.quiz-share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border: 1.5px solid var(--q-line);
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}
.quiz-share-btn:hover { border-color: var(--tier-color); color: var(--tier-color); transform: translateY(-1px); }
.quiz-share-x:hover { border-color: #111; color: #111; }
.quiz-share-li:hover { border-color: #0A66C2; color: #0A66C2; }
.quiz-share-wa:hover { border-color: #25D366; color: #25D366; }

/* FOOTER */
.quiz-result-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 8px 0 0;
}
.quiz-btn-retake {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1.5px solid var(--q-line);
  color: #6B7280;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}
.quiz-btn-retake:hover { border-color: var(--tier-color); color: var(--tier-color); }
.quiz-btn-tools {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--tier-color);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  padding: 9px 4px;
}
.quiz-btn-tools:hover { text-decoration: underline; }

/* ===== MOBILE ===== */
@media (max-width: 720px) {
  .quiz-intro-grid { grid-template-columns: 1fr; gap: 28px; }
  .quiz-intro-visual { order: -1; max-width: 260px; margin: 0 auto; }
  .quiz-intro-chip-1 { top: 4%; left: -6%; }
  .quiz-intro-chip-2 { top: 44%; right: -4%; }
  .quiz-intro-chip-3 { bottom: 4%; left: -2%; }
  .quiz-intro-title { font-size: 34px; }
  .quiz-intro-sub { font-size: 15px; }
  .quiz-intro-stats { gap: 14px; }
  .quiz-stat-number { font-size: 16px; }
  .quiz-btn-start { font-size: 15px; padding: 13px 24px; }

  .quiz-q-text { font-size: 20px; }
  .quiz-option { padding: 14px 14px; gap: 12px; }
  .quiz-option-icon { width: 26px; height: 26px; font-size: 12px; }
  .quiz-option-text { font-size: 14px; }

  .quiz-result-hero { grid-template-columns: 1fr; padding: 20px; gap: 20px; }
  .quiz-result-hero-visual { max-width: 200px; margin: 0 auto; }
  .quiz-result-title { font-size: 22px; }
  .quiz-score-row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .quiz-result-score-wrap { width: 110px; height: 110px; margin: 0 auto; }
  .quiz-score-meta { width: 100%; }

  .quiz-value-stats { grid-template-columns: 1fr; }
  .quiz-radar-wrap { grid-template-columns: 1fr; gap: 20px; padding: 20px; }
  .quiz-radar-svg { max-width: 280px; margin: 0 auto; }

  .quiz-plan-row { grid-template-columns: 1fr; gap: 10px; }
  .quiz-plan-when { flex-direction: row; align-items: center; gap: 10px; padding: 0 0 0 16px; }
  .quiz-plan-when::before { top: 4px; }

  .quiz-email-form { flex-direction: column; }
  .quiz-email-btn { width: 100%; justify-content: center; }

  .quiz-share-buttons { flex-direction: row; }
  .quiz-share-btn { flex: 1; justify-content: center; padding: 9px 10px; font-size: 12px; }
}
</style>

<script>
(function() {
  'use strict';

  // Hide the template's post-header to avoid duplicate title
  var postHeader = document.querySelector('.post-header');
  if (postHeader) postHeader.style.display = 'none';
  var postSingle = document.querySelector('.post-single');
  if (postSingle) postSingle.style.paddingTop = '24px';

  var app = document.getElementById('quiz-app');
  app.setAttribute('data-phase', 'intro');

  var scores = [];
  var currentQ = 0;
  var totalQ = 10;

  // Potential weekly hours saveable per answer (index = question, value = [a,b,c,d])
  var hoursSaveableTable = [
    [5, 4, 2, 1],    // Q1 daily task management
    [1, 4, 8, 15],   // Q2 repetitive %
    [1, 3, 2, 1],    // Q3 data
    [0, 2, 5, 8],    // Q4 content
    [0, 1, 3, 1],    // Q5 reviews
    [0, 0, 0, 0],    // Q6 comfort — doesn't save hours directly
    [0, 2, 6, 10],   // Q7 social
    [0, 0, 0, 0],    // Q8 spending
    [0, 0, 0, 0],    // Q9 industry
    [0, 0, 0, 0]     // Q10 mindset
  ];

  var dimensions = [
    { name: 'Digital Foundation', short: 'Foundation', questions: [0, 5], color: '#4F46E5' },
    { name: 'Data & Process', short: 'Data', questions: [2, 7], color: '#7C3AED' },
    { name: 'Automation', short: 'Automation', questions: [1, 6], color: '#2563EB' },
    { name: 'Content & Social', short: 'Content', questions: [3, 4], color: '#0891B2' },
    { name: 'AI Mindset', short: 'Mindset', questions: [8, 9], color: '#059669' }
  ];

  var tiers = [
    {
      name: 'AI Explorer',
      tierClass: 'tier-1',
      image: '/images/quiz/tier-explorer.png',
      min: 10, max: 17,
      title: 'You\'re Sitting on a Gold Mine',
      desc: 'Businesses at your stage see the biggest gains from AI because you have the most to automate. The plan below gets you from zero to meaningful automation in under a week — at zero cost.',
      plan: [
        { when: 'THIS WEEK', time: '~2 hours total', cards: [
          { icon: '&#9889;', title: 'Replace 3 paid tools with free AI', desc: 'ChatGPT, Claude, and Gemini can replace writing assistants, research tools, and email drafters most people are paying for. Businesses save $200–$500/month just by switching.', link: '/posts/free-ai-tools-replace-expensive-software-2026/', linkText: 'See the 47-tool list', estTime: '30 min' }
        ]},
        { when: 'THIS MONTH', time: '~4 hours total', cards: [
          { icon: '&#128187;', title: 'Automate your top 3 time-wasters', desc: 'Pick the 3 tasks you repeat most — scheduling, invoicing, social posting. Step-by-step guide with free tools, each one takes ~30 min to set up.', link: '/posts/automate-business-tasks-with-ai-2026/', linkText: 'See the automation guide', estTime: '2 hours' },
          { icon: '&#128202;', title: 'Start collecting business intelligence', desc: 'Competitor reviews, pricing, and customer feedback are all publicly available. Once you start tracking it, you\'ll spot opportunities they\'re missing.', link: '/posts/how-to-scrape-google-reviews/', linkText: 'How to collect review data', estTime: '1 hour' }
        ]},
        { when: 'THIS QUARTER', time: '~3 hours total', cards: [
          { icon: '&#128176;', title: 'Hit your 10-hour/week savings target', desc: 'That\'s realistic at your stage. Businesses that follow this sequence — free AI tools, then task automation, then data collection — typically hit that target within their first 3 months.', link: '/posts/how-to-make-money-with-ai-2026/', linkText: 'See the full roadmap', estTime: '—' }
        ]}
      ]
    },
    {
      name: 'AI Apprentice',
      tierClass: 'tier-2',
      image: '/images/quiz/tier-apprentice.png',
      min: 18, max: 25,
      title: 'You\'re in the Sweet Spot',
      desc: 'You have the digital foundation already. What you\'re missing is the connective tissue — automations that make your existing tools talk to each other. Businesses at your level save $3,000–$8,000/year just by connecting what they already have.',
      plan: [
        { when: 'THIS WEEK', time: '~3 hours total', cards: [
          { icon: '&#128640;', title: 'Automate content repurposing', desc: 'One blog post → 5–7 social posts, newsletter excerpt, and a thread — automatically. Highest-ROI automation for your stage, saves 4–6 hrs/week.', link: '/posts/automate-social-media-content-with-mcp/', linkText: 'See it in action', estTime: '1 hour' },
          { icon: '&#128176;', title: 'Audit your software spend', desc: 'You likely pay for 5–12 subscriptions. At least 3 have better free AI alternatives. We mapped 47 specific replacements.', link: '/posts/free-ai-tools-replace-expensive-software-2026/', linkText: 'Find your replacements', estTime: '45 min' }
        ]},
        { when: 'THIS MONTH', time: '~4 hours total', cards: [
          { icon: '&#11088;', title: 'Stop missing reviews (and the insights in them)', desc: 'Automated monitoring catches every new review, alerts you, and reveals patterns — what customers love, what competitors get wrong.', link: '/posts/how-to-scrape-google-reviews/', linkText: 'Set up review automation', estTime: '1 hour' },
          { icon: '&#128736;', title: 'Unlock your secret weapon: web data', desc: 'Competitor pricing, customer complaints, market positioning — all publicly available. Web scraping turns it into structured intelligence.', link: '/posts/web-scraping-for-beginners-2026-guide/', linkText: 'Start scraping', estTime: '2 hours' }
        ]},
        { when: 'THIS QUARTER', time: '~6 hours total', cards: [
          { icon: '&#127919;', title: 'Build your first multi-step automation', desc: 'Chain 3–5 of the individual automations above into one pipeline. This is where the 20x productivity gains actually come from.', link: '/posts/automate-business-tasks-with-ai-2026/', linkText: 'Chain automation guide', estTime: '4 hours' }
        ]}
      ]
    },
    {
      name: 'AI Strategist',
      tierClass: 'tier-3',
      image: '/images/quiz/tier-strategist.png',
      min: 26, max: 33,
      title: 'You\'re Ready to Build Real Competitive Advantages',
      desc: 'You\'re ahead of 80% of small businesses. You have the digital maturity, the data discipline, and the mindset. Now it\'s about compounding — building pipelines that run 24/7 and create advantages competitors can\'t easily copy.',
      plan: [
        { when: 'THIS WEEK', time: '~4 hours total', cards: [
          { icon: '&#9889;', title: 'Build an always-on content machine', desc: 'Automated pipeline that transforms, schedules, and distributes across every channel without you touching it. One input, seven outputs.', link: '/posts/automate-social-media-content-with-mcp/', linkText: 'Build the pipeline', estTime: '3 hours' }
        ]},
        { when: 'THIS MONTH', time: '~8 hours total', cards: [
          { icon: '&#127919;', title: 'Turn competitor reviews into strategy', desc: 'Extract and analyze competitor reviews at scale — thousands of them. Find the exact complaints their customers have that your business could solve.', link: '/posts/scrape-google-maps-lead-generation/', linkText: 'Extract competitive intel', estTime: '3 hours' },
          { icon: '&#128640;', title: 'Deploy automations that never sleep', desc: 'MCP servers on cloud infrastructure running 24/7 — monitoring, scraping, transforming, alerting. Setup takes an afternoon; time savings compound forever.', link: '/posts/deploy-mcp-server-production/', linkText: 'Deploy first server', estTime: '4 hours' }
        ]},
        { when: 'THIS QUARTER', time: 'Ongoing', cards: [
          { icon: '&#128161;', title: 'Monetize what you\'ve built', desc: 'The automation skills you\'re building have direct monetary value. Freelancers charge $50–$200/hr for AI automation consulting, or you can productize your workflows.', link: '/posts/how-to-make-money-with-ai-2026/', linkText: '12 proven AI income methods', estTime: '—' }
        ]}
      ]
    },
    {
      name: 'AI Pioneer',
      tierClass: 'tier-4',
      image: '/images/quiz/tier-pioneer.png',
      min: 34, max: 40,
      title: 'You\'re in the Top 5% — Here\'s How to Stay There',
      desc: 'You\'re not just AI-ready — you\'re AI-native. Digital maturity, data discipline, automation mindset, and competitive awareness are all firing. Your moat is real, but it only lasts if you keep building. The moves below widen the gap.',
      plan: [
        { when: 'THIS WEEK', time: '~5 hours total', cards: [
          { icon: '&#128736;', title: 'Build custom AI pipelines for your exact workflow', desc: 'Off-the-shelf tools are designed for average use cases. You\'re past that. Build custom MCP servers tailored to your specific data sources, formats, and business logic — this is the layer competitors cannot copy.', link: '/posts/deploy-mcp-server-production/', linkText: 'Advanced deployment', estTime: '5 hours' }
        ]},
        { when: 'THIS MONTH', time: '~10 hours total', cards: [
          { icon: '&#127760;', title: 'Scale data-driven lead generation', desc: 'Scrape Google Maps for targeted leads, monitor competitor pricing in real-time, track sentiment across your market. Report 3–5x more qualified leads at a fraction of traditional marketing costs.', link: '/posts/scrape-google-maps-lead-generation/', linkText: 'Build your lead engine', estTime: '6 hours' },
          { icon: '&#128176;', title: 'Productize and sell your automations', desc: 'Package your workflows as products on marketplaces like Apify, create industry templates, or license automations to other businesses. Near-zero marginal cost — build once, sell forever.', link: '/posts/how-to-make-money-with-ai-2026/', linkText: 'Turn automation into income', estTime: '4 hours' }
        ]},
        { when: 'THIS QUARTER', time: 'Ongoing', cards: [
          { icon: '&#9889;', title: 'Get ahead of the AI agent wave', desc: 'Autonomous agents that browse, research, and act without prompting are the next frontier. Standards like WebMCP are making this real right now. You have the foundation to adopt this before your industry even knows it exists.', link: '/posts/webmcp-chrome-ai-agents-explained/', linkText: 'Understand AI agents', estTime: '—' }
        ]}
      ]
    }
  ];

  // ===== PUBLIC =====
  window.startQuiz = function() {
    scores = new Array(totalQ).fill(0);
    currentQ = 0;
    app.setAttribute('data-phase', 'quiz');
    showScreen('screen-intro', false);
    document.getElementById('quiz-progress').style.display = 'flex';
    updateProgress();
    showScreen('screen-q0', true);
  };

  window.answer = function(qIndex, score) {
    scores[qIndex] = score;
    var opts = document.querySelectorAll('#screen-q' + qIndex + ' .quiz-option');
    opts.forEach(function(o) { o.classList.remove('selected'); });
    var clickedIdx = score - 1;
    if (opts[clickedIdx]) opts[clickedIdx].classList.add('selected');

    setTimeout(function() {
      var nextQ = qIndex + 1;
      if (nextQ < totalQ) {
        currentQ = nextQ;
        showScreen('screen-q' + qIndex, false);
        updateProgress();
        setTimeout(function() { showScreen('screen-q' + nextQ, true); }, 80);
      } else {
        showScreen('screen-q' + qIndex, false);
        document.getElementById('quiz-progress').style.display = 'none';
        app.setAttribute('data-phase', 'calculating');
        showScreen('screen-calculating', true);
        runCalcSteps();
        setTimeout(function() {
          showScreen('screen-calculating', false);
          setTimeout(function() {
            renderResults();
            app.setAttribute('data-phase', 'results');
            showScreen('screen-results', true);
          }, 100);
        }, 2600);
      }
    }, 320);
  };

  window.goBack = function() {
    if (currentQ === 0) return;
    var prevQ = currentQ - 1;
    showScreen('screen-q' + currentQ, false);
    currentQ = prevQ;
    updateProgress();
    setTimeout(function() { showScreen('screen-q' + prevQ, true); }, 80);
  };

  window.retakeQuiz = function() {
    showScreen('screen-results', false);
    app.setAttribute('data-phase', 'intro');
    app.setAttribute('data-tier', '');
    document.querySelectorAll('.quiz-option.selected').forEach(function(o) { o.classList.remove('selected'); });
    setTimeout(function() { showScreen('screen-intro', true); }, 100);
  };

  // ===== RENDERING =====
  function showScreen(id, show) {
    var el = document.getElementById(id);
    if (!el) return;
    if (show) {
      el.style.display = 'block';
      void el.offsetHeight;
      el.classList.add('active');
      el.classList.remove('fade-out');
    } else {
      el.classList.add('fade-out');
      el.classList.remove('active');
      setTimeout(function() { el.style.display = 'none'; el.classList.remove('fade-out'); }, 300);
    }
  }

  function updateProgress() {
    var pct = ((currentQ + 1) / totalQ) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent = (currentQ + 1) + ' of ' + totalQ;
    var backBtn = document.getElementById('quiz-back');
    if (currentQ > 0) backBtn.classList.add('visible');
    else backBtn.classList.remove('visible');
  }

  function runCalcSteps() {
    var steps = document.querySelectorAll('.quiz-calc-step');
    steps.forEach(function(s) { s.classList.remove('active', 'done'); });
    var delays = [50, 600, 1200, 1800];
    steps.forEach(function(step, i) {
      setTimeout(function() {
        step.classList.add('active');
        setTimeout(function() { step.classList.add('done'); }, 400);
      }, delays[i]);
    });
  }

  function calcHoursSaved() {
    var total = 0;
    for (var i = 0; i < scores.length; i++) {
      var s = scores[i];
      if (s >= 1 && s <= 4) total += hoursSaveableTable[i][s - 1];
    }
    // Clamp to plausible range
    return Math.max(3, Math.min(22, Math.round(total * 0.7)));
  }

  function calcPercentile(score) {
    // Bell-curve-ish mapping for small business AI readiness
    var p;
    if (score <= 12) p = Math.max(3, (score - 9) * 4);
    else if (score <= 17) p = 12 + (score - 12) * 4;
    else if (score <= 22) p = 32 + (score - 17) * 4;
    else if (score <= 27) p = 52 + (score - 22) * 5;
    else if (score <= 32) p = 77 + (score - 27) * 3;
    else p = 92 + (score - 32) * 1;
    return Math.max(2, Math.min(99, Math.round(p)));
  }

  function percentileDesc(p) {
    if (p >= 90) return 'Higher than ' + p + '% of small business owners we\'ve seen take this quiz. You\'re in rare company.';
    if (p >= 70) return 'Higher than ' + p + '% of small business owners. You\'re well ahead of the curve.';
    if (p >= 50) return 'Higher than ' + p + '% of small business owners. You\'re above average.';
    if (p >= 30) return p + 'th percentile. Plenty of headroom — and that means plenty to gain from automation.';
    return p + 'th percentile. That\'s not bad news — it means the biggest wins are still ahead of you.';
  }

  function findBiggestOpportunity() {
    var best = { dim: null, savings: -1 };
    for (var d = 0; d < dimensions.length; d++) {
      var dim = dimensions[d];
      var maxDim = dim.questions.length * 4;
      var score = 0;
      for (var q = 0; q < dim.questions.length; q++) score += scores[dim.questions[q]];
      var gap = maxDim - score; // bigger gap = bigger opportunity
      if (gap > best.savings) { best.savings = gap; best.dim = dim; }
    }
    return best.dim;
  }

  function renderResults() {
    var total = scores.reduce(function(a, b) { return a + b; }, 0);

    // Tier
    var tier = tiers[0];
    for (var i = 0; i < tiers.length; i++) {
      if (total >= tiers[i].min && total <= tiers[i].max) { tier = tiers[i]; break; }
    }
    app.setAttribute('data-tier', tier.tierClass);

    // Hero image
    var img = document.getElementById('tier-image');
    img.src = tier.image;
    img.alt = tier.name + ' illustration';

    // Score ring
    var circumference = 2 * Math.PI * 70;
    var offset = circumference - (total / 40) * circumference;
    document.getElementById('score-ring').style.strokeDashoffset = offset;
    animateNumber('score-number', 0, total, 1200);

    // Badge, title, desc
    var badge = document.getElementById('result-badge');
    badge.textContent = tier.name;
    document.getElementById('result-title').textContent = tier.title;
    document.getElementById('result-desc').textContent = tier.desc;

    // Percentile
    var p = calcPercentile(total);
    animateNumber('percentile-number', 0, p, 1400);
    setTimeout(function() {
      document.getElementById('percentile-bar').style.width = p + '%';
    }, 200);
    document.getElementById('percentile-desc').textContent = percentileDesc(p);

    // Hours + $ saved
    var hrs = calcHoursSaved();
    animateNumber('hours-saved', 0, hrs, 1400);
    var dollars = hrs * 48 * 35;
    animateNumber('dollars-saved', 0, dollars, 1800, true);
    var hrsSub = document.getElementById('hours-saved-sub');
    if (hrs <= 5) hrsSub.textContent = 'You\'re efficient already — these are the gains from targeted automations.';
    else if (hrs <= 10) hrsSub.textContent = 'Most of this is in repetitive tasks and content workflows.';
    else hrsSub.textContent = 'Significant repetitive work — automation will pay back very fast.';

    // Biggest opportunity
    var opp = findBiggestOpportunity();
    document.getElementById('biggest-opportunity').textContent = opp ? opp.name : 'Automation';

    // Radar chart
    renderRadar(dimensions);

    // Action plan
    renderPlan(tier.plan);
  }

  function renderRadar(dims) {
    var radius = 120;
    var nAxes = dims.length;
    var cx = 0, cy = 0;

    // Grid rings
    [1, 0.75, 0.5, 0.25].forEach(function(scale, idx) {
      var pts = [];
      for (var i = 0; i < nAxes; i++) {
        var angle = (Math.PI * 2 * i) / nAxes - Math.PI / 2;
        var x = cx + Math.cos(angle) * radius * scale;
        var y = cy + Math.sin(angle) * radius * scale;
        pts.push(x.toFixed(1) + ',' + y.toFixed(1));
      }
      var ids = ['radar-grid-100', 'radar-grid-75', 'radar-grid-50', 'radar-grid-25'];
      document.getElementById(ids[idx]).setAttribute('points', pts.join(' '));
    });

    // Axes
    var axesEl = document.getElementById('radar-axes');
    axesEl.innerHTML = '';
    for (var i = 0; i < nAxes; i++) {
      var angle = (Math.PI * 2 * i) / nAxes - Math.PI / 2;
      var x = cx + Math.cos(angle) * radius;
      var y = cy + Math.sin(angle) * radius;
      axesEl.innerHTML += '<line x1="0" y1="0" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="quiz-radar-axis" />';
    }

    // Data shape + points
    var shapePts = [];
    var pointsEl = document.getElementById('radar-points');
    pointsEl.innerHTML = '';
    var labelsEl = document.getElementById('radar-labels');
    labelsEl.innerHTML = '';
    var legendHTML = '';

    for (var i = 0; i < nAxes; i++) {
      var dim = dims[i];
      var dimScore = 0;
      for (var q = 0; q < dim.questions.length; q++) dimScore += scores[dim.questions[q]];
      var maxDim = dim.questions.length * 4;
      var ratio = dimScore / maxDim;
      var angle = (Math.PI * 2 * i) / nAxes - Math.PI / 2;
      var x = cx + Math.cos(angle) * radius * ratio;
      var y = cy + Math.sin(angle) * radius * ratio;
      shapePts.push(x.toFixed(1) + ',' + y.toFixed(1));

      // Data point
      pointsEl.innerHTML += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4" class="quiz-radar-point" />';

      // Label
      var lx = cx + Math.cos(angle) * (radius + 22);
      var ly = cy + Math.sin(angle) * (radius + 22);
      var anchor = 'middle';
      if (Math.cos(angle) > 0.4) anchor = 'start';
      else if (Math.cos(angle) < -0.4) anchor = 'end';
      labelsEl.innerHTML += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 3).toFixed(1) + '" text-anchor="' + anchor + '" class="quiz-radar-label">' + dim.short + '</text>';

      legendHTML += '<div class="quiz-radar-legend-item">' +
        '<div class="quiz-radar-legend-label"><span class="quiz-radar-legend-dot" style="background:' + dim.color + '"></span>' + dim.name + '</div>' +
        '<div class="quiz-radar-legend-score">' + dimScore + ' / ' + maxDim + '</div>' +
        '</div>';
    }

    // Start shape at center, animate out
    var shape = document.getElementById('radar-shape');
    var center = [];
    for (var j = 0; j < nAxes; j++) center.push('0,0');
    shape.setAttribute('points', center.join(' '));
    setTimeout(function() { shape.setAttribute('points', shapePts.join(' ')); }, 300);

    document.getElementById('radar-legend').innerHTML = legendHTML;
  }

  function renderPlan(plan) {
    var html = '';
    for (var p = 0; p < plan.length; p++) {
      var row = plan[p];
      var cardsHTML = '';
      for (var c = 0; c < row.cards.length; c++) {
        var card = row.cards[c];
        cardsHTML += '<a href="' + card.link + '" class="quiz-plan-card">' +
          '<div class="quiz-plan-card-icon">' + card.icon + '</div>' +
          '<div class="quiz-plan-card-body">' +
            '<div class="quiz-plan-card-title">' + card.title + '</div>' +
            '<div class="quiz-plan-card-desc">' + card.desc + '</div>' +
            '<div class="quiz-plan-card-meta">' +
              '<span class="quiz-plan-card-time">&#9201; ' + card.estTime + '</span>' +
              '<span class="quiz-plan-card-link">' + card.linkText + '</span>' +
            '</div>' +
          '</div>' +
        '</a>';
      }
      html += '<div class="quiz-plan-row">' +
        '<div class="quiz-plan-when">' +
          '<span class="quiz-plan-when-label">' + row.when + '</span>' +
          '<span class="quiz-plan-when-time">' + row.time + '</span>' +
        '</div>' +
        '<div class="quiz-plan-cards">' + cardsHTML + '</div>' +
      '</div>';
    }
    document.getElementById('plan-timeline').innerHTML = html;
  }

  function animateNumber(elId, start, end, duration, isCurrency) {
    var el = document.getElementById(elId);
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var val = Math.round(start + (end - start) * ease);
      el.textContent = isCurrency ? val.toLocaleString('en-US') : val;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Fire confetti for high tiers once score is revealed
    if (elId === 'score-number' && end >= 26) {
      setTimeout(fireConfetti, 400);
    }
  }

  // ===== CONFETTI (pure canvas, no deps) =====
  function fireConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();

    var colors = ['#4F46E5', '#7C3AED', '#F59E0B', '#10B981', '#EC4899', '#2563EB'];
    var pieces = [];
    var count = window.innerWidth < 600 ? 70 : 140;
    var origin = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 4 + Math.random() * 6;
      pieces.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    var start = performance.now();
    function tick(now) {
      var elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        p.vy += 0.18; // gravity
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (elapsed > 2000) p.opacity = Math.max(0, p.opacity - 0.015);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (elapsed < 4500) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(tick);
  }

  // ===== EMAIL CAPTURE =====
  window.submitEmail = function(e) {
    e.preventDefault();
    var form = document.getElementById('quiz-email-form');
    var input = document.getElementById('quiz-email-input');
    var status = document.getElementById('quiz-email-status');
    var btn = form.querySelector('.quiz-email-btn');
    var btnLabel = btn.querySelector('.quiz-email-btn-label');
    var honey = form.querySelector('.quiz-email-honeypot');
    var email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.className = 'quiz-email-status error';
      return;
    }

    btn.disabled = true;
    btnLabel.textContent = 'Sending...';
    status.textContent = '';
    status.className = 'quiz-email-status';

    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: email, website: honey.value, source: 'ai-readiness-quiz' })
    })
      .then(function(r) { return r.json().then(function(j) { return { status: r.status, data: j }; }); })
      .then(function(res) {
        var s = res.data && res.data.status;
        if (s === 'ok' || s === 'pending-confirm') {
          status.textContent = 'Check your inbox — we\'ll send your plan shortly.';
          status.className = 'quiz-email-status success';
          btnLabel.textContent = 'Sent ✓';
        } else if (s === 'already') {
          status.textContent = 'You\'re already subscribed — thanks!';
          status.className = 'quiz-email-status success';
          btnLabel.textContent = 'Got it ✓';
        } else if (s === 'invalid') {
          status.textContent = 'That email doesn\'t look valid.';
          status.className = 'quiz-email-status error';
          btn.disabled = false;
          btnLabel.textContent = 'Send me the plan';
        } else {
          status.textContent = 'Something went wrong. Please try again.';
          status.className = 'quiz-email-status error';
          btn.disabled = false;
          btnLabel.textContent = 'Send me the plan';
        }
      })
      .catch(function() {
        status.textContent = 'Network error. Please try again.';
        status.className = 'quiz-email-status error';
        btn.disabled = false;
        btnLabel.textContent = 'Send me the plan';
      });
  };

  // ===== SHARE =====
  function currentTotal() { return scores.reduce(function(a, b) { return a + b; }, 0); }
  function currentTierName() {
    var total = currentTotal();
    for (var i = 0; i < tiers.length; i++) if (total >= tiers[i].min && total <= tiers[i].max) return tiers[i].name;
    return tiers[tiers.length - 1].name;
  }
  function shareText() {
    var total = currentTotal();
    return 'I scored ' + total + '/40 on the AI Readiness Assessment — I\'m an "' + currentTierName() + '". How AI-ready is your business?';
  }
  window.shareX = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(shareText()) + '&url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
  };
  window.shareLinkedIn = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
  };
  window.shareWhatsApp = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    var text = shareText() + ' ' + url;
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  };
  window.copyLink = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        var label = document.getElementById('copy-label');
        label.textContent = 'Copied!';
        setTimeout(function() { label.textContent = 'Copy link'; }, 2000);
      });
    }
  };

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', function(e) {
    if (app.getAttribute('data-phase') !== 'quiz') return;
    var key = e.key.toLowerCase();
    var map = { a: 1, b: 2, c: 3, d: 4, '1': 1, '2': 2, '3': 3, '4': 4 };
    if (map[key]) {
      e.preventDefault();
      window.answer(currentQ, map[key]);
    } else if (e.key === 'Backspace' && currentQ > 0) {
      e.preventDefault();
      window.goBack();
    }
  });
})();
</script>
