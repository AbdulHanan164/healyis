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
      if (pct >= 80) { grade = 'excellent'; msg = '🏆 Excellent!';    subMsg = 'You have a strong understanding of this topic.'; }
      else if (pct >= 60) { grade = 'good'; msg = '👍 Good Work!';   subMsg = 'Solid knowledge — review the explanations to fill in the gaps.'; }
      else if (pct >= 40) { grade = 'ok';   msg = '📚 Keep Learning'; subMsg = "You're on your way — re-read the article and try again!"; }
      else { grade = 'poor'; msg = '💪 Keep Practising'; subMsg = 'This is a tough topic. Read the article again and retake the quiz!'; }

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
              <button class="btn btn-primary btn-sm" onclick="QuizEngine._restart('${containerId}')">🔄 Retake Quiz</button>
              <a href="quiz-hub.html" class="btn btn-outline btn-sm">📚 All Quizzes</a>
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
        <strong>${isCorrect ? '✅ Correct!' : `❌ Not quite. The correct answer was: <em>${q.options[correctIdx]}</em>`}</strong>
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
