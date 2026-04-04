const app = document.getElementById("app");
const nextBtn = document.getElementById("next");
const progressTxt = document.getElementById("progress");
const againBtn = document.getElementById("again");
const backgroundAudio = new Audio("../../audio/backgroundAudio.mp3");
const musicBtn = document.getElementById("music");
const failAudio = new Audio("../../audio/failAudio.mp3");
const winAudio = new Audio("../../audio/winAudio.mp3");
const timeTxt = document.getElementById("time");
const hintBtn = document.getElementById("hint");
const hintTxt = document.getElementById("hint-text");
const countHintsTxt = document.getElementById("count-hint");
const testTitleTxt = document.getElementById("title");
const dictionary = {
  Математика: "math",
  Информатика: "informatics",
  география: "geography",
};
const testTitle = dictionary[testTitleTxt.textContent];
console.log(testTitle);
let time = 0;
let isPlaying = true;
let timerInterval = null;
let currentIndex = 0;
let score = 0;
let countHints = 3;

backgroundAudio.volume = 0.3;
backgroundAudio.play();
backgroundAudio.onended = function () {
  backgroundAudio.currentTime = 0;
  backgroundAudio.play();
};

countHintsTxt.textContent = `Количество подсказок: ${countHints}`;

function getTestTime() {
  time = 0;
  for (let i = 0; i < tasks.length; i++) {
    const element = tasks[i];
    console.log(element.time);
    time = time + element.time;
  }
  timeOn();
  timerInterval = setInterval(function () {
    time--;
    timeOn();

    console.log(1);

    if (time <= 0) {
      finishTest();
    }
  }, 1000);
}

// score: 5
// maximum:10
function finishTest() {
  clearInterval(timerInterval);
  nextBtn.style.display = "none";
  const isWin = score > tasks.length / 2;
  let text = isWin ? "Good job!" : "Try again :(";
  let iconStatus = isWin ? "success" : "error";
  backgroundAudio.pause();
  if (isWin) winAudio.play();
  else failAudio.play();
  const finaleScore = {
    score: score,
    max: tasks.length,
  };
  console.log(finaleScore);
  Swal.fire({
    title: text,
    text: `your score is ${score} / ${tasks.length}`,
    icon: iconStatus,
  });
}

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

function renderQuestion() {
  const question = tasks[currentIndex];
  console.log(question);

  app.innerHTML = "";
  hintTxt.textContent = "";

  progressTxt.textContent = `Вопрос № ${currentIndex + 1}`;
  const title = document.createElement("h3");
  title.textContent = question.question;
  title.classList.add("question-txt");
  app.appendChild(title);

  const label = document.createElement("label");
  label.textContent = "Enter answer";
  label.classList.add("question-label");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "answer";

  if (countHints <= 0) {
    hintBtn.style.display = "none";
  } else {
    hintBtn.style.display = "inline-block";
  }

  label.appendChild(input);
  app.appendChild(label);
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
  const inputAnswer = document.querySelector('input[name="answer"]');
  const userAnswer = inputAnswer.value;
  if (userAnswer.length === 0) {
    console.log(1);

    Swal.fire({
      title: "Error!",
      text: "Do you want to continue",
      icon: "error",
      confirmButtonText: "okay",
    });
    return;
  }
  console.log(tasks[currentIndex].answer);
  console.log(userAnswer);

  const isCorrect =
    userAnswer.toLowerCase() ==
    tasks[currentIndex].answer.toString().toLowerCase();
  console.log(isCorrect);

  if (isCorrect === true) {
    score++;
  }

  currentIndex++;

  if (currentIndex === tasks.length - 1) {
    nextBtn.textContent = "end test";
  }

  if (currentIndex < tasks.length) {
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
  clearInterval(timerInterval);
  getTestTime();
  renderQuestion();
};

hintBtn.onclick = function () {
  hintTxt.textContent = tasks[currentIndex].hint;
  hintBtn.style.display = "none";
  countHints--;
  if (countHints !== 0)
    countHintsTxt.textContent = `Количество подсказок: ${countHints}`;
  else countHintsTxt.textContent = "Увы, подсказок больше нет.";
};

getTestTime();
renderQuestion();
