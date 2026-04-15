---
title: "Is Your Business AI-Ready? Free Assessment"
description: "Take this 2-minute quiz to discover how prepared your business is for AI automation — and get a personalized action plan with free tool recommendations."
layout: single
---

<div id="quiz-app">

  <!-- ===== INTRO SCREEN ===== -->
  <div class="quiz-screen quiz-intro active" id="screen-intro">
    <div class="quiz-intro-badge">Free Assessment</div>
    <h2 class="quiz-intro-title">Find Out in<br><span class="quiz-accent">2 Minutes</span></h2>
    <p class="quiz-intro-sub">Answer 10 quick questions about how you run your business today. You'll get a personalized AI readiness score and a custom action plan to start saving time and money with automation.</p>
    <div class="quiz-intro-stats">
      <div class="quiz-stat">
        <span class="quiz-stat-number">10</span>
        <span class="quiz-stat-label">Questions</span>
      </div>
      <div class="quiz-stat-divider"></div>
      <div class="quiz-stat">
        <span class="quiz-stat-number">2 min</span>
        <span class="quiz-stat-label">To complete</span>
      </div>
      <div class="quiz-stat-divider"></div>
      <div class="quiz-stat">
        <span class="quiz-stat-number">Free</span>
        <span class="quiz-stat-label">No signup</span>
      </div>
    </div>
    <button class="quiz-btn-start" onclick="startQuiz()">
      Start the Assessment
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
    <p class="quiz-intro-note">No email required. Your results appear instantly.</p>
  </div>

  <!-- ===== PROGRESS BAR ===== -->
  <div class="quiz-progress-wrap" id="quiz-progress" style="display:none;">
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" id="progress-fill"></div>
    </div>
    <span class="quiz-progress-label" id="progress-label">1 of 10</span>
  </div>

  <!-- ===== QUESTIONS ===== -->
  <div class="quiz-screen quiz-question" id="screen-q0">
    <div class="quiz-q-number">Question 1 of 10</div>
    <h3 class="quiz-q-text">How do you manage your daily business tasks?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(0,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">Mostly pen and paper, sticky notes, or memory</span>
      </button>
      <button class="quiz-option" onclick="answer(0,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">Basic digital tools — email, spreadsheets, maybe Google Docs</span>
      </button>
      <button class="quiz-option" onclick="answer(0,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">Dedicated software for most things — CRM, project management, accounting</span>
      </button>
      <button class="quiz-option" onclick="answer(0,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">Integrated systems with some automations already running</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q1">
    <div class="quiz-q-number">Question 2 of 10</div>
    <h3 class="quiz-q-text">How much of your work week goes to repetitive tasks?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(1,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">Very little — most of my work is creative or unique each time</span>
      </button>
      <button class="quiz-option" onclick="answer(1,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">A few hours a week on routine admin, data entry, or scheduling</span>
      </button>
      <button class="quiz-option" onclick="answer(1,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">1-2 hours a day on tasks that follow the same pattern</span>
      </button>
      <button class="quiz-option" onclick="answer(1,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">More than half my day is routine tasks I wish someone else could do</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q2">
    <div class="quiz-q-number">Question 3 of 10</div>
    <h3 class="quiz-q-text">What does your business data situation look like?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(2,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I don't really track data digitally — it's mostly in my head</span>
      </button>
      <button class="quiz-option" onclick="answer(2,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">Some data in spreadsheets or basic tools, but it's scattered</span>
      </button>
      <button class="quiz-option" onclick="answer(2,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">Organized data across several tools — analytics, CRM, sales records</span>
      </button>
      <button class="quiz-option" onclick="answer(2,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">Clean, structured data with dashboards and regular reporting</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q3">
    <div class="quiz-q-number">Question 4 of 10</div>
    <h3 class="quiz-q-text">How much content does your business create?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(3,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">Almost none — a social post here and there, maybe</span>
      </button>
      <button class="quiz-option" onclick="answer(3,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">Some regular content — weekly social posts or a monthly newsletter</span>
      </button>
      <button class="quiz-option" onclick="answer(3,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">Quite a bit — blog posts, social media, emails, and marketing materials</span>
      </button>
      <button class="quiz-option" onclick="answer(3,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">A lot — daily content across multiple channels and formats</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q4">
    <div class="quiz-q-number">Question 5 of 10</div>
    <h3 class="quiz-q-text">How do you handle customer reviews and feedback?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(4,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I rarely get reviews, or don't check them</span>
      </button>
      <button class="quiz-option" onclick="answer(4,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">I check reviews sometimes but don't have a system for it</span>
      </button>
      <button class="quiz-option" onclick="answer(4,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">I monitor and respond to reviews regularly, but it's all manual</span>
      </button>
      <button class="quiz-option" onclick="answer(4,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">I have alerts, templates, or a system for tracking and analyzing feedback</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q5">
    <div class="quiz-q-number">Question 6 of 10</div>
    <h3 class="quiz-q-text">What's your comfort level with new digital tools?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(5,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I prefer sticking with what I know — new tools stress me out</span>
      </button>
      <button class="quiz-option" onclick="answer(5,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">I'll try something new if someone walks me through it</span>
      </button>
      <button class="quiz-option" onclick="answer(5,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">I regularly try new tools and usually pick them up fast</span>
      </button>
      <button class="quiz-option" onclick="answer(5,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">I actively hunt for new tools and love experimenting with technology</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q6">
    <div class="quiz-q-number">Question 7 of 10</div>
    <h3 class="quiz-q-text">How much time do you spend on social media management?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(6,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I barely have a social media presence for my business</span>
      </button>
      <button class="quiz-option" onclick="answer(6,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">I post occasionally but it feels like a chore</span>
      </button>
      <button class="quiz-option" onclick="answer(6,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">I post regularly but spending hours creating content each week</span>
      </button>
      <button class="quiz-option" onclick="answer(6,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">Social media is a core channel — I post daily across multiple platforms</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q7">
    <div class="quiz-q-number">Question 8 of 10</div>
    <h3 class="quiz-q-text">What's your approach to business tool spending?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(7,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I avoid paying for tools whenever possible</span>
      </button>
      <button class="quiz-option" onclick="answer(7,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">I use mostly free tools and only pay when absolutely necessary</span>
      </button>
      <button class="quiz-option" onclick="answer(7,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">I invest in tools that clearly save me time or make me money</span>
      </button>
      <button class="quiz-option" onclick="answer(7,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">I regularly evaluate tools based on ROI and invest confidently</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q8">
    <div class="quiz-q-number">Question 9 of 10</div>
    <h3 class="quiz-q-text">How is your industry responding to AI?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(8,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">Very traditional — almost nobody in my space talks about AI</span>
      </button>
      <button class="quiz-option" onclick="answer(8,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">A few early adopters are experimenting, but it's not mainstream</span>
      </button>
      <button class="quiz-option" onclick="answer(8,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">AI tools are becoming common — competitors are starting to use them</span>
      </button>
      <button class="quiz-option" onclick="answer(8,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">AI is already reshaping my industry — those not adopting are falling behind</span>
      </button>
    </div>
  </div>

  <div class="quiz-screen quiz-question" id="screen-q9">
    <div class="quiz-q-number">Question 10 of 10</div>
    <h3 class="quiz-q-text">When you think about using AI in your business, what comes to mind?</h3>
    <div class="quiz-options">
      <button class="quiz-option" onclick="answer(9,1)">
        <span class="quiz-option-icon">A</span>
        <span class="quiz-option-text">I'm honestly not sure how AI could help my specific business</span>
      </button>
      <button class="quiz-option" onclick="answer(9,2)">
        <span class="quiz-option-icon">B</span>
        <span class="quiz-option-text">I've heard it can help, but I don't know where to start</span>
      </button>
      <button class="quiz-option" onclick="answer(9,3)">
        <span class="quiz-option-icon">C</span>
        <span class="quiz-option-text">I have specific tasks in mind that AI could probably handle</span>
      </button>
      <button class="quiz-option" onclick="answer(9,4)">
        <span class="quiz-option-icon">D</span>
        <span class="quiz-option-text">I've already tried AI tools and I'm looking to go deeper</span>
      </button>
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
    <h3 class="quiz-calc-title">Analyzing your responses...</h3>
    <p class="quiz-calc-sub">Building your personalized AI readiness report</p>
  </div>

  <!-- ===== RESULTS SCREEN ===== -->
  <div class="quiz-screen quiz-results" id="screen-results">
    <div class="quiz-result-score-wrap">
      <svg viewBox="0 0 160 160" class="quiz-score-ring">
        <circle cx="80" cy="80" r="70" fill="none" stroke="#EEF2FF" stroke-width="10" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="#4F46E5" stroke-width="10"
                stroke-dasharray="440" stroke-dashoffset="440" stroke-linecap="round"
                transform="rotate(-90 80 80)" class="quiz-score-fill" id="score-ring" />
      </svg>
      <div class="quiz-score-inner">
        <span class="quiz-score-num" id="score-number">0</span>
        <span class="quiz-score-of">out of 40</span>
      </div>
    </div>

    <div class="quiz-result-badge" id="result-badge">AI Explorer</div>
    <h2 class="quiz-result-title" id="result-title">Your AI Readiness Level</h2>
    <p class="quiz-result-desc" id="result-desc">Loading your personalized results...</p>

    <div class="quiz-result-breakdown" id="result-breakdown">
      <!-- Filled by JS -->
    </div>

    <div class="quiz-result-recs">
      <h3 class="quiz-recs-title">Your Personalized Action Plan</h3>
      <div class="quiz-recs-list" id="result-recs">
        <!-- Filled by JS -->
      </div>
    </div>

    <div class="quiz-result-share">
      <p class="quiz-share-label">Think a friend or colleague could benefit?</p>
      <div class="quiz-share-buttons">
        <button class="quiz-share-btn quiz-share-x" onclick="shareX()" aria-label="Share on X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          Share on X
        </button>
        <button class="quiz-share-btn quiz-share-li" onclick="shareLinkedIn()" aria-label="Share on LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Share on LinkedIn
        </button>
        <button class="quiz-share-btn quiz-share-copy" onclick="copyLink()" aria-label="Copy link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          <span id="copy-label">Copy Link</span>
        </button>
      </div>
    </div>

    <button class="quiz-btn-retake" onclick="retakeQuiz()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
      Retake Quiz
    </button>
  </div>
</div>

<style>
/* ===== QUIZ RESET & CONTAINER ===== */
#quiz-app {
  max-width: 660px;
  margin: 0 auto 48px;
  position: relative;
  min-height: 480px;
}
#quiz-app *, #quiz-app *::before, #quiz-app *::after {
  box-sizing: border-box;
}

/* ===== SCREENS ===== */
.quiz-screen {
  display: none;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.quiz-screen.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}
.quiz-screen.fade-out {
  opacity: 0;
  transform: translateY(-12px);
}

/* ===== INTRO ===== */
.quiz-intro {
  text-align: center;
  padding: 20px 0 0;
}
.quiz-intro-badge {
  display: inline-block;
  background: #EEF2FF;
  color: #4F46E5;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  letter-spacing: 0.03em;
  margin-bottom: 24px;
}
.quiz-intro-title {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #111827;
  margin-bottom: 20px;
}
.quiz-accent {
  color: #4F46E5;
}
.quiz-intro-sub {
  font-size: 17px;
  color: #6B7280;
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto 32px;
}
.quiz-intro-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-bottom: 36px;
}
.quiz-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.quiz-stat-number {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}
.quiz-stat-label {
  font-size: 13px;
  color: #9CA3AF;
  font-weight: 500;
}
.quiz-stat-divider {
  width: 1px;
  height: 36px;
  background: #E5E7EB;
}
.quiz-btn-start {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #4F46E5;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  padding: 16px 36px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  letter-spacing: -0.01em;
}
.quiz-btn-start:hover {
  background: #4338CA;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(79,70,229,0.3);
}
.quiz-btn-start:active {
  transform: translateY(0);
}
.quiz-intro-note {
  font-size: 13px;
  color: #9CA3AF;
  margin-top: 16px;
}

/* ===== PROGRESS BAR ===== */
.quiz-progress-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
  padding-top: 8px;
}
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
  font-size: 13px;
  font-weight: 600;
  color: #9CA3AF;
  white-space: nowrap;
  min-width: 50px;
  text-align: right;
}

/* ===== QUESTIONS ===== */
.quiz-q-number {
  font-size: 13px;
  font-weight: 600;
  color: #4F46E5;
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}
.quiz-q-text {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
  margin-bottom: 28px;
  letter-spacing: -0.02em;
}
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quiz-option {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  padding: 18px 20px;
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
}
.quiz-option:active {
  transform: scale(0.98);
}
.quiz-option.selected {
  border-color: #4F46E5;
  background: #EEF2FF;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
}
.quiz-option-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s ease;
}
.quiz-option:hover .quiz-option-icon {
  background: #EEF2FF;
  color: #4F46E5;
}
.quiz-option.selected .quiz-option-icon {
  background: #4F46E5;
  color: #fff;
}
.quiz-option-text {
  font-size: 15px;
  color: #374151;
  line-height: 1.5;
  padding-top: 4px;
}

/* ===== CALCULATING ===== */
.quiz-calculating {
  text-align: center;
  padding: 80px 0;
}
.quiz-calc-spinner {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
}
.quiz-spinner-svg {
  width: 100%;
  height: 100%;
  animation: quiz-spin 1.2s linear infinite;
}
.quiz-spinner-path {
  animation: quiz-dash 1.5s ease-in-out infinite;
}
@keyframes quiz-spin {
  100% { transform: rotate(360deg); }
}
@keyframes quiz-dash {
  0% { stroke-dasharray: 1 126; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 80 126; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 1 126; stroke-dashoffset: -126; }
}
.quiz-calc-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}
.quiz-calc-sub {
  font-size: 15px;
  color: #9CA3AF;
}

/* ===== RESULTS ===== */
.quiz-results {
  text-align: center;
  padding: 16px 0 0;
}
.quiz-result-score-wrap {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 24px;
}
.quiz-score-ring {
  width: 100%;
  height: 100%;
}
.quiz-score-fill {
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.quiz-score-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.quiz-score-num {
  font-size: 42px;
  font-weight: 800;
  color: #111827;
  line-height: 1;
  letter-spacing: -0.03em;
}
.quiz-score-of {
  font-size: 13px;
  color: #9CA3AF;
  font-weight: 500;
}
.quiz-result-badge {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
  background: #EEF2FF;
  color: #4F46E5;
}
.quiz-result-badge.tier-1 { background: #FEF3C7; color: #92400E; }
.quiz-result-badge.tier-2 { background: #DBEAFE; color: #1E40AF; }
.quiz-result-badge.tier-3 { background: #D1FAE5; color: #065F46; }
.quiz-result-badge.tier-4 { background: #EDE9FE; color: #5B21B6; }
.quiz-result-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}
.quiz-result-desc {
  font-size: 16px;
  color: #6B7280;
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto 36px;
}

/* ===== BREAKDOWN BARS ===== */
.quiz-result-breakdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 40px;
  text-align: left;
}
.quiz-breakdown-item {
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 16px;
}
.quiz-breakdown-label {
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
}
.quiz-breakdown-bar-bg {
  height: 8px;
  background: #F3F4F6;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;
}
.quiz-breakdown-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  width: 0%;
}
.quiz-breakdown-bar-fill.color-0 { background: #4F46E5; }
.quiz-breakdown-bar-fill.color-1 { background: #7C3AED; }
.quiz-breakdown-bar-fill.color-2 { background: #2563EB; }
.quiz-breakdown-bar-fill.color-3 { background: #0891B2; }
.quiz-breakdown-bar-fill.color-4 { background: #059669; }
.quiz-breakdown-score {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

/* ===== RECOMMENDATIONS ===== */
.quiz-result-recs {
  text-align: left;
  margin-bottom: 36px;
}
.quiz-recs-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
  text-align: center;
}
.quiz-recs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quiz-rec-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  text-decoration: none;
}
.quiz-rec-card:hover {
  border-color: #4F46E5;
  box-shadow: 0 4px 12px rgba(79,70,229,0.08);
  transform: translateY(-1px);
}
.quiz-rec-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.quiz-rec-icon.green { background: #D1FAE5; }
.quiz-rec-icon.blue { background: #DBEAFE; }
.quiz-rec-icon.purple { background: #EDE9FE; }
.quiz-rec-icon.amber { background: #FEF3C7; }
.quiz-rec-icon.rose { background: #FFE4E6; }
.quiz-rec-body {
  flex: 1;
  min-width: 0;
}
.quiz-rec-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  line-height: 1.4;
}
.quiz-rec-desc {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}
.quiz-rec-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #4F46E5;
  margin-top: 6px;
  text-decoration: none;
}
.quiz-rec-link:hover {
  gap: 8px;
}

/* ===== SHARE ===== */
.quiz-result-share {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}
.quiz-share-label {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}
.quiz-share-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
.quiz-share-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}
.quiz-share-btn:hover {
  border-color: #4F46E5;
  color: #4F46E5;
  transform: translateY(-1px);
}
.quiz-share-x:hover { border-color: #111; color: #111; }
.quiz-share-li:hover { border-color: #0A66C2; color: #0A66C2; }

/* ===== RETAKE ===== */
.quiz-btn-retake {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1.5px solid #E5E7EB;
  color: #6B7280;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}
.quiz-btn-retake:hover {
  border-color: #4F46E5;
  color: #4F46E5;
}

/* ===== MOBILE ===== */
@media (max-width: 640px) {
  .quiz-intro-title { font-size: 28px; }
  .quiz-intro-stats { gap: 20px; }
  .quiz-stat-number { font-size: 18px; }
  .quiz-btn-start { font-size: 15px; padding: 14px 28px; }
  .quiz-q-text { font-size: 20px; }
  .quiz-option { padding: 14px 16px; gap: 12px; }
  .quiz-option-icon { width: 28px; height: 28px; font-size: 13px; }
  .quiz-option-text { font-size: 14px; padding-top: 3px; }
  .quiz-result-breakdown { grid-template-columns: 1fr; }
  .quiz-result-title { font-size: 24px; }
  .quiz-share-buttons { flex-direction: column; }
  .quiz-share-btn { justify-content: center; }
  .quiz-result-score-wrap { width: 130px; height: 130px; }
  .quiz-score-num { font-size: 34px; }
}
</style>

<script>
(function() {
  'use strict';

  // Hide the template's post-header to avoid duplicate title
  // (SEO title stays in <head> for crawlers)
  var postHeader = document.querySelector('.post-header');
  if (postHeader) postHeader.style.display = 'none';
  // Also remove extra top padding from post-single wrapper
  var postSingle = document.querySelector('.post-single');
  if (postSingle) postSingle.style.paddingTop = '24px';

  var scores = [];
  var currentQ = 0;
  var totalQ = 10;

  // Dimension mapping: which questions map to which readiness dimensions
  var dimensions = [
    { name: 'Digital Foundation', questions: [0, 5] },
    { name: 'Data & Process Maturity', questions: [2, 7] },
    { name: 'Automation Potential', questions: [1, 6] },
    { name: 'Content & Social Volume', questions: [3, 4] },
    { name: 'AI Readiness Mindset', questions: [8, 9] }
  ];

  // Result tiers
  var tiers = [
    {
      name: 'AI Explorer',
      tierClass: 'tier-1',
      min: 10, max: 17,
      title: 'You\'re at the Starting Line',
      desc: 'Your business has massive untapped potential for AI. You\'re doing a lot of things manually right now, which means every automation you add will have an outsized impact. The businesses seeing the biggest gains from AI in 2026 are the ones starting from where you are \u2014 because the improvement curve is steepest at the beginning.',
      recs: [
        { icon: '&#9889;', color: 'amber', title: 'Start with free AI assistants', desc: 'ChatGPT and Claude are free and can handle writing, brainstorming, and research right away.', link: '/posts/free-ai-tools-replace-expensive-software-2026/', linkText: 'See 47 free AI tools \u2192' },
        { icon: '&#128187;', color: 'blue', title: 'Move your workflows digital', desc: 'Before you automate, get your key processes into digital tools. Start with what takes the most time.', link: '/posts/automate-business-tasks-with-ai-2026/', linkText: 'Read the guide \u2192' },
        { icon: '&#128202;', color: 'green', title: 'Begin collecting data', desc: 'Start tracking customer reviews, website visits, and social media metrics. This data fuels future AI automation.', link: '/posts/how-to-scrape-google-reviews/', linkText: 'How reviews data works \u2192' }
      ]
    },
    {
      name: 'AI Apprentice',
      tierClass: 'tier-2',
      min: 18, max: 25,
      title: 'You\'ve Got a Solid Foundation',
      desc: 'You\'re digitally literate, you have some data to work with, and you see the value in automation. You\'re in the sweet spot \u2014 you have enough infrastructure to benefit from AI immediately, but you haven\'t hit diminishing returns yet. The tools you need already exist; it\'s about plugging them in.',
      recs: [
        { icon: '&#128640;', color: 'purple', title: 'Automate your content creation', desc: 'You create enough content to benefit from AI-powered repurposing. Turn one blog post into social posts for every platform automatically.', link: '/posts/automate-social-media-content-with-mcp/', linkText: 'See how it works \u2192' },
        { icon: '&#11088;', color: 'amber', title: 'Systematize review management', desc: 'You\'re already getting reviews \u2014 automate monitoring and response to save hours and never miss one.', link: '/posts/how-to-scrape-google-reviews/', linkText: 'Automate reviews \u2192' },
        { icon: '&#128176;', color: 'green', title: 'Replace expensive software with AI', desc: 'You\'re probably paying for tools that now have free AI alternatives. A quick audit could save thousands per year.', link: '/posts/free-ai-tools-replace-expensive-software-2026/', linkText: '47 free replacements \u2192' },
        { icon: '&#128736;', color: 'blue', title: 'Learn what web scraping can do', desc: 'Scraping publicly available data \u2014 competitor prices, leads, market trends \u2014 is a superpower most small businesses don\'t know about.', link: '/posts/web-scraping-for-beginners-2026-guide/', linkText: 'Beginner\'s guide \u2192' }
      ]
    },
    {
      name: 'AI Strategist',
      tierClass: 'tier-3',
      min: 26, max: 33,
      title: 'You\'re Primed for Automation',
      desc: 'Your business is digitally mature with solid processes and data. You think in terms of ROI and you\'re comfortable with technology. You\'re perfectly positioned to build end-to-end AI workflows that save serious time and money. Focus on connecting your existing tools into automated pipelines.',
      recs: [
        { icon: '&#9889;', color: 'purple', title: 'Build automated content pipelines', desc: 'With your content volume, automation isn\'t optional \u2014 it\'s the difference between maintaining and scaling. MCP servers can transform content across formats automatically.', link: '/posts/automate-social-media-content-with-mcp/', linkText: 'Build a pipeline \u2192' },
        { icon: '&#127919;', color: 'blue', title: 'Turn reviews into competitive intelligence', desc: 'You\'re already monitoring reviews. Take it further \u2014 extract and analyze competitor reviews at scale to find market gaps.', link: '/posts/scrape-google-maps-lead-generation/', linkText: 'Lead gen with data \u2192' },
        { icon: '&#128640;', color: 'green', title: 'Deploy production automations', desc: 'You\'re ready for always-on automation. Deploy MCP servers that run 24/7 without your involvement.', link: '/posts/deploy-mcp-server-production/', linkText: 'Deployment guide \u2192' },
        { icon: '&#128161;', color: 'amber', title: 'Make money with AI skills', desc: 'Your technical comfort means you could build and sell AI tools, not just use them. That\'s a real revenue opportunity.', link: '/posts/how-to-make-money-with-ai-2026/', linkText: 'Monetize AI \u2192' }
      ]
    },
    {
      name: 'AI Pioneer',
      tierClass: 'tier-4',
      min: 34, max: 40,
      title: 'You\'re Ahead of the Curve',
      desc: 'Your business is firing on all cylinders \u2014 digital maturity, data discipline, automation mindset, and competitive awareness. You\'re in the top tier of AI-readiness. Your next moves are about building compounding advantages: custom tools, multi-step workflows, and potentially selling your automation expertise.',
      recs: [
        { icon: '&#128736;', color: 'purple', title: 'Build custom MCP servers', desc: 'Standard tools aren\'t enough for you. Build custom AI pipelines tailored to your exact workflow.', link: '/posts/deploy-mcp-server-production/', linkText: 'Advanced deployment \u2192' },
        { icon: '&#127760;', color: 'blue', title: 'Scale with data-driven lead generation', desc: 'Scrape and analyze market data at scale \u2014 competitor pricing, Google Maps leads, review sentiment \u2014 to find opportunities others miss.', link: '/posts/scrape-google-maps-lead-generation/', linkText: 'Data-driven leads \u2192' },
        { icon: '&#128176;', color: 'green', title: 'Productize your automations', desc: 'You\'ve built workflows that work. Consider packaging them as tools and selling them on marketplaces.', link: '/posts/how-to-make-money-with-ai-2026/', linkText: 'Build for profit \u2192' },
        { icon: '&#9889;', color: 'amber', title: 'Stay ahead with AI agents', desc: 'The next wave is AI agents that can browse, research, and act autonomously. You\'re ready for it.', link: '/posts/webmcp-chrome-ai-agents-explained/', linkText: 'AI agents explained \u2192' }
      ]
    }
  ];

  window.startQuiz = function() {
    scores = new Array(totalQ).fill(0);
    currentQ = 0;
    showScreen('screen-intro', false);
    document.getElementById('quiz-progress').style.display = 'flex';
    updateProgress();
    showScreen('screen-q0', true);
  };

  window.answer = function(qIndex, score) {
    scores[qIndex] = score;
    // Visual feedback on selected option
    var opts = document.querySelectorAll('#screen-q' + qIndex + ' .quiz-option');
    opts.forEach(function(o) { o.classList.remove('selected'); });
    var clickedIdx = score - 1;
    if (opts[clickedIdx]) opts[clickedIdx].classList.add('selected');

    // Advance after a short delay for visual feedback
    setTimeout(function() {
      var nextQ = qIndex + 1;
      if (nextQ < totalQ) {
        currentQ = nextQ;
        showScreen('screen-q' + qIndex, false);
        updateProgress();
        setTimeout(function() {
          showScreen('screen-q' + nextQ, true);
        }, 80);
      } else {
        showScreen('screen-q' + qIndex, false);
        document.getElementById('quiz-progress').style.display = 'none';
        showScreen('screen-calculating', true);
        setTimeout(function() {
          showScreen('screen-calculating', false);
          setTimeout(function() {
            renderResults();
            showScreen('screen-results', true);
          }, 100);
        }, 2200);
      }
    }, 350);
  };

  window.retakeQuiz = function() {
    showScreen('screen-results', false);
    // Reset all selected states
    document.querySelectorAll('.quiz-option.selected').forEach(function(o) {
      o.classList.remove('selected');
    });
    setTimeout(function() {
      showScreen('screen-intro', true);
    }, 100);
  };

  function showScreen(id, show) {
    var el = document.getElementById(id);
    if (!el) return;
    if (show) {
      el.style.display = 'block';
      // Force reflow for animation
      void el.offsetHeight;
      el.classList.add('active');
      el.classList.remove('fade-out');
    } else {
      el.classList.add('fade-out');
      el.classList.remove('active');
      setTimeout(function() {
        el.style.display = 'none';
        el.classList.remove('fade-out');
      }, 300);
    }
  }

  function updateProgress() {
    var pct = ((currentQ + 1) / totalQ) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent = (currentQ + 1) + ' of ' + totalQ;
  }

  function renderResults() {
    var total = scores.reduce(function(a, b) { return a + b; }, 0);

    // Find tier
    var tier = tiers[0];
    for (var i = 0; i < tiers.length; i++) {
      if (total >= tiers[i].min && total <= tiers[i].max) {
        tier = tiers[i];
        break;
      }
    }

    // Animate score ring
    var circumference = 2 * Math.PI * 70; // ~440
    var offset = circumference - (total / 40) * circumference;
    var ring = document.getElementById('score-ring');
    ring.style.strokeDashoffset = offset;

    // Animate score number
    animateNumber('score-number', 0, total, 1200);

    // Set badge
    var badge = document.getElementById('result-badge');
    badge.textContent = tier.name;
    badge.className = 'quiz-result-badge ' + tier.tierClass;

    // Set text
    document.getElementById('result-title').textContent = tier.title;
    document.getElementById('result-desc').textContent = tier.desc;

    // Render dimension breakdown
    var breakdownHTML = '';
    for (var d = 0; d < dimensions.length; d++) {
      var dim = dimensions[d];
      var dimScore = 0;
      for (var q = 0; q < dim.questions.length; q++) {
        dimScore += scores[dim.questions[q]];
      }
      var maxDim = dim.questions.length * 4;
      var pct = Math.round((dimScore / maxDim) * 100);
      breakdownHTML += '<div class="quiz-breakdown-item">' +
        '<div class="quiz-breakdown-label">' + dim.name + '</div>' +
        '<div class="quiz-breakdown-bar-bg"><div class="quiz-breakdown-bar-fill color-' + d + '" data-width="' + pct + '%"></div></div>' +
        '<div class="quiz-breakdown-score">' + dimScore + ' / ' + maxDim + '</div>' +
        '</div>';
    }
    document.getElementById('result-breakdown').innerHTML = breakdownHTML;

    // Animate breakdown bars after a delay
    setTimeout(function() {
      var fills = document.querySelectorAll('.quiz-breakdown-bar-fill');
      fills.forEach(function(f) {
        f.style.width = f.getAttribute('data-width');
      });
    }, 200);

    // Render recommendations
    var recsHTML = '';
    for (var r = 0; r < tier.recs.length; r++) {
      var rec = tier.recs[r];
      recsHTML += '<a href="' + rec.link + '" class="quiz-rec-card">' +
        '<div class="quiz-rec-icon ' + rec.color + '" aria-hidden="true">' + rec.icon + '</div>' +
        '<div class="quiz-rec-body">' +
        '<div class="quiz-rec-title">' + rec.title + '</div>' +
        '<div class="quiz-rec-desc">' + rec.desc + '</div>' +
        '<span class="quiz-rec-link">' + rec.linkText + '</span>' +
        '</div></a>';
    }
    document.getElementById('result-recs').innerHTML = recsHTML;
  }

  function animateNumber(elId, start, end, duration) {
    var el = document.getElementById(elId);
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      // Ease out cubic
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Share functions
  window.shareX = function() {
    var total = scores.reduce(function(a, b) { return a + b; }, 0);
    var tier = getTierName(total);
    var text = 'I scored ' + total + '/40 on the AI Readiness Assessment \u2014 I\'m an "' + tier + '"! How AI-ready is your business?';
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
  };

  window.shareLinkedIn = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'width=550,height=420');
  };

  window.copyLink = function() {
    var url = 'https://godberrystudios.com/ai-readiness-quiz/';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        var label = document.getElementById('copy-label');
        label.textContent = 'Copied!';
        setTimeout(function() { label.textContent = 'Copy Link'; }, 2000);
      });
    }
  };

  function getTierName(total) {
    for (var i = 0; i < tiers.length; i++) {
      if (total >= tiers[i].min && total <= tiers[i].max) return tiers[i].name;
    }
    return tiers[tiers.length - 1].name;
  }
})();
</script>
