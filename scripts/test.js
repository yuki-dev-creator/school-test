const app = document.getElementById("app");
const nextBtn = document.getElementById("next");
const progressTxt = document.getElementById("progress");
const againBtn = document.getElementById("again");
const backgroundAudio = new Audio("../audio/backgroundAudio.mp3");
const musicBtn = document.getElementById("music");
const failAudio = new Audio("../audio/failAudio.mp3");
const winAudio = new Audio("../audio/winAudio.mp3");
const timeTxt = document.getElementById("time");
let time = 0;
let isPlaying = true;
let timerInterval = null;

function getTestTime() {
  time = 0;
  for (let i = 0; i < questions.length; i++) {
    const element = questions[i];
    console.log(element.time);
    time = time + element.time;
  }
  timeOn();
  timerInterval = setInterval(function () {
    time--;
    timeOn();

    // new function >>>

    // end of function <<<

    if (time <= 0) {
      finishTest();
    }
  }, 1000);
}

// first time show
//time (seconds) -> 2:00

backgroundAudio.volume = 0.3;
backgroundAudio.play();
backgroundAudio.onended = function () {
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
};

function finishTest() {
  clearInterval(timerInterval);
  nextBtn.style.display = "none";
  const isWin = score > questions.length / 2;
  let text = isWin ? "Good job!" : "Try again :(";
  let iconStatus = isWin ? "success" : "error";
  backgroundAudio.pause();
  if (isWin) winAudio.play();
  else failAudio.play();

  Swal.fire({
    title: text,
    text: `your score is ${score} / ${questions.length}`,
    icon: iconStatus,
  });
}
// 0:9
// 00:09 +
// 00:011
function timeOn() {
  let seconds = time % 60;
  let minutes = Math.floor(time / 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let localTime = minutes + ":" + seconds;
  timeTxt.textContent = localTime;
}

let currentIndex = 0;
let score = 0;

console.log(questions);

function renderQuestion() {
  const question = questions[currentIndex];
  console.log(question);

  app.innerHTML = "";

  progressTxt.textContent = `Вопрос № ${currentIndex + 1}`;
  const title = document.createElement("h3");
  title.textContent = question.question;
  title.classList.add("question-txt");
  app.appendChild(title);

  const options = question.options;

  console.log(options);
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const label = document.createElement("label");
    label.textContent = option;
    label.classList.add("question-label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "answer";
    input.value = i;

    label.appendChild(input);
    app.appendChild(label);
  }
}

musicBtn.onclick = function () {
  if (isPlaying) {
    backgroundAudio.pause();
    musicBtn.textContent = "play";
  } else {
    backgroundAudio.play();
    musicBtn.textContent = "stop playing music";
  }
  isPlaying = !isPlaying;
};

nextBtn.onclick = function () {
  const selected = document.querySelectorAll('input[name="answer"]:checked');
  console.log(selected);
  if (selected.length === 0) {
    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "okay",
    });
    return;
  }

  const usersValues = Array.from(selected).map((item) => +item.value);
  const correctValues = questions[currentIndex].correct;
  const isCorrect =
    usersValues.length === correctValues.length &&
    usersValues.every((val) => correctValues.includes(val));

  if (isCorrect === true) {
    score++;
  }

  currentIndex++;

  if (currentIndex === questions.length - 1) {
    nextBtn.textContent = "end test";
  }

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    finishTest();
  }
};

againBtn.onclick = function () {
  currentIndex = 0;
  score = 0;
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "next";
  getTestTime();
  renderQuestion();
};

getTestTime();
renderQuestion();
