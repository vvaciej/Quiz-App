import './style.css'
import { HTMLAnswersArr } from './answers';

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
    // backBtn.classList.add('active');
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
  newDiv.classList.add('flex', 'flex-col', 'gap-y-5');
  
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

  return [ someSelected, isCorrect ];
}

/* ---- Show Next Question ---- */
let currentQuestion = 0;

const increaseProgressBar = () => {
  const progressBar = document.querySelectorAll('.progress-bar');

  const newWidth = (currentQuestion + 1) * 9 + '%';

  progressBar.forEach(bar => {
    bar.style.setProperty('--before-width', newWidth);
  });
}

const showNextQuestion = () => {
  allAnswersSection[currentQuestion].classList.add('hide');
  currentQuestion++;
  allAnswersSection[currentQuestion].classList.remove('hide');

  increaseProgressBar();
  generateNewQuestion();
}

const valided = () => {
  const someSelected = checkIfIsSomeSelected();
  const check = someSelected.every(e => e);

  if (check) showNextQuestion();
}

/* ---- Load Storaged ---- */
document.addEventListener('DOMContentLoaded', () => {
  const isSwitched = localStorage.getItem('switched');
  if (isSwitched == 'true') {
    switchTheme();
  }
})