document.addEventListener('DOMContentLoaded', () => {
  const quiz = [
    {
      question: "1. 将来AIに最も代替される可能性が高い職業はどれですか？",
      choices: [
        "データ入力作業員",
        "看護師",
        "建築家",
        "心理カウンセラー"
      ],
      answer: 0
    },
    {
      question: "2. AIによる自動化の影響を最も受けにくい職業はどれですか？",
      choices: [
        "創造的な作家",
        "レジ係",
        "テレマーケター",
        "データ処理担当者"
      ],
      answer: 0
    },
    {
      question: "3. AIによって代替される可能性が高いとされる職業はどれですか？",
      choices: [
        "会計士",
        "教師",
        "医師",
        "弁護士"
      ],
      answer: 0
    },
    {
      question: "4. AIによる自動化が進む中、最も影響を受ける可能性が高い職業はどれですか？",
      choices: [
        "カスタマーサポート担当者",
        "プロジェクトマネージャー",
        "研究者",
        "芸術家"
      ],
      answer: 0
    },
    {
      question: "5. AIによって代替される可能性が低い職業はどれですか？",
      choices: [
        "創造的なデザイナー",
        "データ分析者",
        "工場のライン作業員",
        "電話オペレーター"
      ],
      answer: 0
    }
  ];

  let current = 0, score = 0, timeLeft = 15, timerId;

  const splash      = document.getElementById('splash');
  const startBtn    = document.getElementById('startBtn');
  const quizScreen  = document.getElementById('quiz');
  const resultScreen= document.getElementById('result');
  const questionEl  = document.getElementById('question');
  const choicesEl   = document.getElementById('choices');
  const timerEl     = document.getElementById('time');
  const nextBtn     = document.getElementById('next');
  const restartBtn  = document.getElementById('restart');
  const backBtn     = document.getElementById('backToStart');
  const scoreEl     = document.getElementById('scoreText');

  startBtn.addEventListener('click', () => {
    splash.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
  });

  restartBtn.addEventListener('click', () => {
    resetAll();
    quizScreen.classList.remove('hidden');
  });

  backBtn.addEventListener('click', () => {
    resetAll();
    splash.classList.remove('hidden');
  });

  nextBtn.addEventListener('click', () => {
    current++;
    if (current < quiz.length) loadQuestion();
    else showResult();
  });

  function resetAll() {
    clearInterval(timerId);
    current = 0; score = 0;
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    nextBtn.disabled = true;
  }

  function startTimer() {
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        selectAnswer(null);
      }
    }, 1000);
  }

  function loadQuestion() {
    nextBtn.disabled = true;
    choicesEl.innerHTML = '';
    const q = quiz[current];
    questionEl.textContent = q.question;
    q.choices.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.addEventListener('click', () => selectAnswer(idx));
      choicesEl.appendChild(btn);
    });
    startTimer();
  }

  function selectAnswer(idx) {
    clearInterval(timerId);
    Array.from(choicesEl.children).forEach((btn, i) => {
      btn.disabled = true;
      btn.style.background = (i === quiz[current].answer)
        ? '#c8e6c9' : '#ffcdd2';
    });
    if (idx === quiz[current].answer) score++;
    nextBtn.disabled = false;
  }

  function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${quiz.length}`;
  }
});
