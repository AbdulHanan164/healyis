// ─────────────────────────────────────────────
//  Healyis — Quiz Engine
// ─────────────────────────────────────────────

const QuizEngine = (() => {

  // Mount a quiz into a DOM element by ID
  function mount(containerId, quizData) {
    const container = document.getElementById(containerId);
    if (!container || !quizData) return;

    let current = 0;
    let score   = 0;
    let answered = false;

    function render() {
      if (current >= quizData.questions.length) {
        showResults();
        return;
      }
      const q   = quizData.questions[current];
      const pct = Math.round((current / quizData.questions.length) * 100);

      container.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-header">
            <h3>🧠 ${quizData.title}</h3>
            <div class="quiz-progress-bar">
              <div class="quiz-progress-fill" style="width:${pct}%"></div>
            </div>
            <div class="quiz-counter">Question ${current + 1} of ${quizData.questions.length}</div>
          </div>

          <p class="quiz-question">${q.q}</p>

          <div class="quiz-options">
            ${q.options.map((opt, i) =>
              `<button class="quiz-option" data-index="${i}" onclick="QuizEngine._handleAnswer(this, ${i}, ${q.correct}, '${containerId}')">
                <span class="opt-letter">${'ABCD'[i]}.</span> ${opt}
              </button>`
            ).join('')}
          </div>

          <div id="quizFeedback_${containerId}" class="hidden"></div>

          <div class="quiz-nav">
            <button id="quizNextBtn_${containerId}" class="btn btn-primary btn-sm hidden"
              onclick="QuizEngine._next('${containerId}')">
              ${current + 1 < quizData.questions.length ? 'Next Question →' : 'See Results →'}
            </button>
          </div>
        </div>`;
    }

    function showResults() {
      const pct = Math.round((score / quizData.questions.length) * 100);
      let grade, msg, subMsg;
      if (pct >= 80) { grade = 'excellent'; msg = 'Excellent!';     subMsg = 'You have a strong understanding of this topic.'; }
      else if (pct >= 60) { grade = 'good'; msg = 'Good Work!';    subMsg = 'Solid knowledge — review the explanations to fill in the gaps.'; }
      else if (pct >= 40) { grade = 'ok';   msg = 'Keep Learning'; subMsg = "You're on your way — re-read the article and try again!"; }
      else { grade = 'poor'; msg = 'Keep Practising'; subMsg = 'This is a tough topic. Read the article again and retake the quiz!'; }

      // Save best score
      const scores  = JSON.parse(localStorage.getItem('healyis_quiz_scores') || '{}');
      const quizId  = Object.keys(QUIZZES).find(k => QUIZZES[k] === quizData);
      if (quizId && (scores[quizId] === undefined || score > scores[quizId])) {
        scores[quizId] = score;
        localStorage.setItem('healyis_quiz_scores', JSON.stringify(scores));
      }

      container.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-results">
            <div class="score-circle ${grade}">
              <span class="score-num">${score}</span>
              <span class="score-denom">/ ${quizData.questions.length}</span>
            </div>
            <div class="score-msg">${msg}</div>
            <div class="score-submsg">${subMsg}</div>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
              <button class="btn btn-primary btn-sm" onclick="QuizEngine._restart('${containerId}')"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-1px;margin-right:5px"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>Retake Quiz</button>
              <a href="quiz-hub.html" class="btn btn-outline btn-sm"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="vertical-align:-1px;margin-right:5px"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>All Quizzes</a>
            </div>
          </div>
        </div>`;
    }

    // Store state on container so callbacks can access it
    container._quizState = { current: () => current, score: () => score, quizData,
      incCurrent: () => current++, incScore: () => score++,
      setAnswered: (v) => answered = v, isAnswered: () => answered,
      render, showResults };

    render();
  }

  // Answer handler — called from inline onclick
  function _handleAnswer(btn, selectedIdx, correctIdx, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !container._quizState) return;
    const state = container._quizState;
    if (state.isAnswered()) return;
    state.setAnswered(true);

    const options = container.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === correctIdx) opt.classList.add(selectedIdx === correctIdx ? 'correct' : 'reveal');
      else if (i === selectedIdx) opt.classList.add('wrong');
    });

    const isCorrect = selectedIdx === correctIdx;
    if (isCorrect) state.incScore();

    const q = state.quizData.questions[state.current()];
    const feedback = document.getElementById(`quizFeedback_${containerId}`);
    if (feedback) {
      feedback.className = `quiz-feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;
      feedback.innerHTML = `
        <strong>${isCorrect ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px"><polyline points="20 6 9 17 4 12"/></svg>Correct!' : `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Not quite. The correct answer was: <em>${q.options[correctIdx]}</em>`}</strong>
        <br><span style="margin-top:6px;display:block">${q.explanation}</span>`;
    }

    const nextBtn = document.getElementById(`quizNextBtn_${containerId}`);
    nextBtn?.classList.remove('hidden');
  }

  function _next(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !container._quizState) return;
    const state = container._quizState;
    state.incCurrent();
    state.setAnswered(false);
    if (state.current() >= state.quizData.questions.length) {
      state.showResults();
    } else {
      state.render();
    }
  }

  function _restart(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !container._quizState) return;
    const quizData = container._quizState.quizData;
    mount(containerId, quizData);
  }

  return { mount, _handleAnswer, _next, _restart };
})();
