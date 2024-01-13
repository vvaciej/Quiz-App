import './style.css'
import { HTMLAnswersArr } from './answers';

/* ---- Theme Switcher ---- */
const themeSwitcher = document.querySelector('.theme-switcher');

themeSwitcher.addEventListener('click', () => {
  themeSwitcher.classList.toggle('switched');
});

/* ---- Choose Quiz ---- */
const allOptions = document.querySelectorAll('.choose-quiz-btn');
const chooseQuizDiv = document.querySelector('.main-choose-quiz');
const allAnswersSection = document.querySelectorAll('.text-question-area');
const backBtn = document.querySelector('.back-btn');

const showChoosedQuiz = (event) => {
  const [html, css, js, access] = allOptions;
  const clickedBtn = event.currentTarget;

  if (clickedBtn === html) {
    chooseQuizDiv.classList.add('hide');
    allAnswersSection[currentQuestion].classList.remove('hide');
    backBtn.classList.add('active');
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

/* ---- Back Btn ---- */
backBtn.addEventListener('click', () => {
  if (currentQuestion === 0) {
    backBtn.classList.remove('active');
    newDiv.innerHTML = '';
    chooseQuizDiv.classList.remove('hide');
    allAnswersSection[currentQuestion].classList.add('hide');
  } else if (currentQuestion > 0) {
    allAnswersSection[currentQuestion].classList.add('hide');
    currentQuestion -= 1;

    allAnswersSection[currentQuestion].classList.remove('hide');
    generateNewQuestion();
  }
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
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>A</b></h1></div>
    <h2>
      <p class="question-text">${HTMLAnswersArr[currentQuestion].first}</p>
    </h2>
  </button>
  <button class="question-btn answer second">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>B</b></h1></div>
    <h2>
      <p class="question-text">${HTMLAnswersArr[currentQuestion].second}</p>
    </h2>
  </button>
  <button class="question-btn answer third">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>C</b></h1></div>
    <h2>
      <p class="question-text">${HTMLAnswersArr[currentQuestion].third}</p>
    </h2>
  </button>
  <button class="question-btn answer fourth">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>D</b></h1></div>
    <h2>
      <p class="question-text">${HTMLAnswersArr[currentQuestion].fourth}</p>
    </h2>
  </button>
  <button class="submit-answer not-selected">
    <h1><b>Submit answer</b></h1>
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
const handleAnswerClick = (e) => {
  const clickedBtn = e.currentTarget;
  newAnswersArr.forEach(btn => btn.classList.remove('selected'));
  clickedBtn.classList.add('selected');

  newSubmits.forEach(submit => submit.classList.remove('not-selected'));
}

/* ---- Check Validity To Submit ---- */
const checkIfIsSomeSelected = () => {
  const whatIsCorrect = HTMLAnswersArr[currentQuestion].correctAnswer;
  let someSelected = false;
  let isCorrect = false;

  newAnswersArr.forEach(btn => {
    if (btn.classList.contains('selected')) {
      someSelected = true;
      if (btn.classList.contains(whatIsCorrect)) {
        isCorrect = true;
      }
    }
  })

  if (!isCorrect) {
    newAnswersArr.forEach(e => {
      if (e.classList.contains('selected')) {
        e.classList.add('error');
      }
    })
  }

  return [ someSelected, isCorrect ];
}

/* ---- Show Next Question ---- */
let currentQuestion = 0;

const increaseProgressBar = () => {
  const progressBar = document.querySelectorAll('.progress-bar');

  const newWidth = (currentQuestion + 1) * 10 + '%';

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