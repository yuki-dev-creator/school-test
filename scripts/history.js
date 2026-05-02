const history = JSON.parse(localStorage.getItem("tests"));
const historyBlock = document.getElementById("history");

const dictionary = {
  math: "Математика",
  informatics: "Информатика",
};

function createHistory() {
  if (history === null) {
    const title = document.createElement("h3");
    title.textContent = "Тесты не пройдены";
    title.classList.add("history-title");
    historyBlock.appendChild(title);
    console.log("no tests");
  } else {
    const tests = Object.entries(history);
    for (let i = 0; i < tests.length; i++) {
      const categoryBlock = document.createElement("div");
      const titleText = tests[i][0];
      const passedTests = tests[i][1];

      const testTitle = dictionary[titleText];
      const title = document.createElement("h3");
      title.textContent = testTitle;
      categoryBlock.appendChild(title);

      for (let j = 0; j < passedTests.length; j++) {
        const resultText =
          "Счет - " +
          passedTests[j].score +
          ". Максимум -  " +
          passedTests[j].max;
        console.log(resultText);

        const titleScore = document.createElement("p");
        titleScore.textContent = resultText;
        categoryBlock.appendChild(titleScore);
      }
      console.log(passedTests);

      historyBlock.appendChild(categoryBlock);
      console.log(titleText);
      console.log(testTitle);
    }
  }
}
createHistory();
