import './style.css'
import confetti from 'canvas-confetti';
import { HTMLAnswersArr } from './answers';

let score = 0;
/* ---- Theme Switcher ---- */
const themeSwitcher = document.querySelector('.theme-switcher');

const switchTheme = () => {
  themeSwitcher.classList.toggle('switched');
  
  const root = document.documentElement;
  root.classList.toggle('dark');
  root.classList.toggle('light');

  const switched = themeSwitcher.classList.contains('switched');
  localStorage.setItem('switched', String(switched));
};

themeSwitcher.addEventListener('click', switchTheme);

/* ---- Choose Quiz ---- */
const allOptions = document.querySelectorAll('.choose-quiz-btn');
const chooseQuizDiv = document.querySelector('.main-choose-quiz');
const allAnswersSection = document.querySelectorAll('.text-question-area');

const showChoosedQuiz = event => {
  const [html, css, js, access] = allOptions;
  const clickedBtn = event.currentTarget;

  if (clickedBtn === html) {
    chooseQuizDiv.classList.add('hide');
    allAnswersSection[currentQuestion].classList.remove('hide');
    // backBtn.classList.add('active'); //weqfdewf
    generateNewQuestion();
  } else if (clickedBtn === css) {
    alert('Prace techniczne');
  } else if (clickedBtn === js) {
    alert('Prace techniczne');
  } else if (clickedBtn === access) {
    alert('Prace techniczne');
  }
}

allOptions.forEach(btn => {
  btn.addEventListener('click', showChoosedQuiz);
})

/* ---- Generate Answers ---- */
const newDiv = document.createElement('div');
let newAnswersArr;
let newSubmits;

const generateNewQuestion = () => {
  const htmlAnswersSection = document.querySelectorAll('.html-quiz-questions-section');
  newDiv.classList.add('flex', 'flex-col', 'gap-y-4');
  
  const newAnswers = `
  <button class="question-btn answer first">
  <div class="quiz-icon"><h1 class="quiz-answer-text">A</h1></div>
  <p class="answer-text">${HTMLAnswersArr[currentQuestion].first}</p>
  </button>
  <button class="question-btn answer second">
  <div class="quiz-icon"><h1 class="quiz-answer-text">B</h1></div>
  <p class="answer-text">${HTMLAnswersArr[currentQuestion].second}</p>
  </button>
  <button class="question-btn answer third">
  <div class="quiz-icon"><h1 class="quiz-answer-text">C</h1></div>
  <p class="answer-text">${HTMLAnswersArr[currentQuestion].third}</p>
  </button>
  <button class="question-btn answer fourth">
  <div class="quiz-icon"><h1 class="quiz-answer-text">D</h1></div>
  <p class="answer-text">${HTMLAnswersArr[currentQuestion].fourth}</p>
  </button>
  <button class="submit-answer not-selected">
  <h1 class="submit-text">Submit answer</h1>
  </button>
  `
  
  newDiv.innerHTML = newAnswers;
  htmlAnswersSection[currentQuestion].append(newDiv);
  
  newSubmits = newDiv.querySelectorAll('.submit-answer');
  newSubmits.forEach(btn => btn.addEventListener('click', valided));

  newAnswersArr = newDiv.querySelectorAll('.question-btn.answer');
  newAnswersArr.forEach(btn => btn.addEventListener('click', handleAnswerClick));

  newAnswersArr.forEach(btn => {
    const answerText = btn.querySelector('.answer-text').textContent.trim();
    if (answerText === '') {
      btn.remove();
    }
  });
}

/* ---- Select Your Answer ---- */
const handleAnswerClick = event => {
  const clickedBtn = event.currentTarget;
  newAnswersArr.forEach(btn => btn.classList.remove('selected'));
  clickedBtn.classList.add('selected');

  newSubmits.forEach(submit => submit.classList.remove('not-selected'));
}

/* ---- Check Validity To Submit ---- */
const checkIfIsSomeSelected = () => {
  const whatIsCorrect = HTMLAnswersArr[currentQuestion].correctAnswer;
  let someSelected = false;
  let isCorrect = false;

  newAnswersArr.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      someSelected = true;
      if (btn.classList.contains(whatIsCorrect)) {
        isCorrect = true;
      } else {
        btn.classList.add('error');
      }
    }
  })

  const checkForScore = Array.from(newAnswersArr).some(btn => btn.classList.contains('error'));
  if (!checkForScore) score++;

  return [ someSelected, isCorrect ];
}

/* ---- Show Next Question ---- */
const progressBar = document.querySelectorAll('.progress-bar');
let currentQuestion = 0;

const increaseProgressBar = () => {
  const newWidth = (currentQuestion + 1) * 9.2 + '%';

  progressBar.forEach(bar => {
    bar.style.setProperty('--before-width', newWidth);
  });
}

const scoreContainer = document.querySelector('.score-container');

const showNextQuestion = () => {
  allAnswersSection[currentQuestion].classList.add('hide');
  currentQuestion++;
  
  if (currentQuestion === 10) {
    results();
  } else if (currentQuestion < 10) {
    allAnswersSection[currentQuestion].classList.remove('hide');
    
    increaseProgressBar();
    generateNewQuestion();
  }
}

const valided = () => {
  const someSelected = checkIfIsSomeSelected();
  const check = someSelected.every(e => e);
  
  if (check) showNextQuestion();
}

const results = () => {
  scoreContainer.classList.remove('hide');
  const scoreText = document.querySelector('.score-number');
  scoreText.textContent = `${score}`;

  let confetties = setInterval(() => {
    confetti();
  }, 800)

  setTimeout(() => {
    clearInterval(confetties);
  }, 2200)
}

/* ---- Play Again ---- */
const playAgainBtn = document.querySelector('.play-again-btn');

playAgainBtn.addEventListener('click', () => {
  scoreContainer.classList.add('hide');
  chooseQuizDiv.classList.remove('hide');
  
  resetAll();
});

const resetAll = () => {
  score = 0;
  currentQuestion = 0;

  progressBar.forEach(bar => {
    bar.style.setProperty('--before-width', '9%');
  });
}

/* ---- Load Storaged ---- */
document.addEventListener('DOMContentLoaded', () => {
  const isSwitched = localStorage.getItem('switched');
  if (isSwitched == 'true') {
    switchTheme();
  }
  
  // const quizSection = document.querySelector('.quiz-section');
  const quizTextSection = document.querySelector('.main-text-section');
  // quizSection.classList.add('loaded');
  quizTextSection.classList.add('loaded');
})