import './style.css'

/* ---- Theme Switcher ---- */
const themeSwitcher = document.querySelector('.theme-switcher');

themeSwitcher.addEventListener('click', () => {
  themeSwitcher.classList.toggle('switched');
});

/* ---- Choose Quiz ---- */
const allOptions = document.querySelectorAll('.choose-quiz-btn');
const chooseQuizDiv = document.querySelector('.main-choose-quiz');
const allAnswersSection = document.querySelectorAll('.text-question-area');

const showChoosedQuiz = (event) => {
  const [html, css, js, access] = allOptions;
  const clickedBtn = event.currentTarget;

  if (clickedBtn === html) {
    chooseQuizDiv.classList.add('hide');
    allAnswersSection[currentQuestion].classList.remove('hide');
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

/* ---- Show Next Question ---- */
const submitBtn = document.querySelectorAll('.submit-answer');
let currentQuestion = 0;

const showNextQuestion = () => {
  allAnswersSection[currentQuestion].classList.add('hide');
  currentQuestion++;
  allAnswersSection[currentQuestion].classList.remove('hide');
  generateNewQuestion();
}

submitBtn.forEach(btn => btn.addEventListener('click', showNextQuestion))

/* ---- Generate Answers ---- */
const generateNewQuestion = () => {
  alert(currentQuestion);
  const htmlAnswersSection = document.querySelectorAll('.html-quiz-questions-section');
  const newDiv = document.createElement('div');
  newDiv.classList.add('flex', 'flex-col', 'gap-y-5')
  const newAnswers = `
  <button class="question-btn">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>A</b></h1></div>
    <h2>
      <p>${HTMLAnswersArr[currentQuestion].first}</p>
    </h2>
  </button>
  <button class="question-btn">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>B</b></h1></div>
    <h2>
      <p>${HTMLAnswersArr[currentQuestion].second}</p>
    </h2>
  </button>
  <button class="question-btn">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>C</b></h1></div>
    <h2>
      <p>${HTMLAnswersArr[currentQuestion].third}</p>
    </h2>
  </button>
  <button class="question-btn">
    <div class="quiz-icon"><h1 class="quiz-answer-text"><b>D</b></h1></div>
    <h2>
      <p>${HTMLAnswersArr[currentQuestion].fourth}</p>
    </h2>
  </button>
  `
  newDiv.innerHTML = newAnswers;
  htmlAnswersSection[currentQuestion].prepend(newDiv);
}

const HTMLAnswersArr = [
  {
    first: 'Kod semantyczny to sposób na tworzenie stron internetowych bez użycia tagów HTML.',
    second: 'Jest to kod używany tylko do stylizacji strony internetowej.',
    third: 'Kod semantyczny to kod, który zawiera tylko komentarze dla programistów i nie ma wpływu na wygląd strony.',
    fourth: 'Kodem semantycznym nazywamy, używanie tagów w HTML, które dobrze definiją strukturę i znaczenie zawartości.'
  },
  {
    first: 'Accessibility to narzędzie do ukrywania treści przed użytkownikami, którzy nie powinni jej widzieć.',
    second: 'Accessibility to rodzaj animacji, który przyciąga uwagę użytkowników do określonych elementów na stronie.',
    third: 'Accessibility to pisanie kodu HTML w taki sposób aby użytkownicy z niepełnosprawnościami mogli swobodnie korzystać z strony.',
    fourth: 'Accessibility to skomplikowane style CSS, które nadają stronie estetyczny wygląd.'
  }
]