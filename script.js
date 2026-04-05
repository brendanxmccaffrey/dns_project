document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dnsQuiz");
  const resetButton = document.getElementById("resetButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!allQuestionsAnswered()) {
      const confirmSubmit = confirm(
        "You have unanswered questions. Do you want to submit anyway?"
      );
      if (!confirmSubmit) {
        return;
      }
    }

    gradeQuiz();
  });

  resetButton.addEventListener("click", function () {
    setTimeout(resetQuizUI, 0);
  });
});

function gradeQuiz() {
  let score = 0;
  const totalQuestions = 5;
  const questionDetails = [];

  clearFeedback();

  // Question 1
  const q1 = document.getElementById("q1");
  const q1Feedback = document.getElementById("q1-feedback");
  const q1Answer = q1.value.trim().toLowerCase();
  const q1CorrectAnswer = "Domain Name System";

  if (
    q1Answer === "domain name system" ||
    q1Answer === "the domain name system"
  ) {
    score++;
    q1Feedback.textContent = "Correct";
    q1Feedback.className = "feedback correct";
    q1.classList.add("highlight-correct");
    questionDetails.push({
      question: 1,
      points: "1/1",
      result: "Correct",
      answer: q1CorrectAnswer
    });
  } else {
    q1Feedback.textContent = "Incorrect. Correct answer: Domain Name System";
    q1Feedback.className = "feedback incorrect";
    q1.classList.add("highlight-incorrect");
    questionDetails.push({
      question: 1,
      points: "0/1",
      result: "Incorrect",
      answer: q1CorrectAnswer
    });
  }

  // Question 2
  const q2Feedback = document.getElementById("q2-feedback");
  const q2Options = document.getElementsByName("q2");
  let q2Selected = null;
  const q2CorrectValue = "b";
  const q2CorrectAnswer = "IP addresses";

  q2Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q2Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === q2CorrectValue) {
      label.classList.add("correct-answer");
    }
  });

  if (q2Selected === q2CorrectValue) {
    score++;
    q2Feedback.textContent = "Correct";
    q2Feedback.className = "feedback correct";
    questionDetails.push({
      question: 2,
      points: "1/1",
      result: "Correct",
      answer: q2CorrectAnswer
    });
  } else {
    q2Feedback.textContent = "Incorrect. Correct answer: IP addresses";
    q2Feedback.className = "feedback incorrect";
    questionDetails.push({
      question: 2,
      points: "0/1",
      result: "Incorrect",
      answer: q2CorrectAnswer
    });
  }

  // Question 3
  const q3Feedback = document.getElementById("q3-feedback");
  const q3Options = document.getElementsByName("q3");
  let q3Selected = null;
  const q3CorrectValue = "c";
  const q3CorrectAnswer = "Authoritative name server";

  q3Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q3Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === q3CorrectValue) {
      label.classList.add("correct-answer");
    }
  });

  if (q3Selected === q3CorrectValue) {
    score++;
    q3Feedback.textContent = "Correct";
    q3Feedback.className = "feedback correct";
    questionDetails.push({
      question: 3,
      points: "1/1",
      result: "Correct",
      answer: q3CorrectAnswer
    });
  } else {
    q3Feedback.textContent =
      "Incorrect. Correct answer: Authoritative name server";
    q3Feedback.className = "feedback incorrect";
    questionDetails.push({
      question: 3,
      points: "0/1",
      result: "Incorrect",
      answer: q3CorrectAnswer
    });
  }

  // Question 4
  const q4Feedback = document.getElementById("q4-feedback");
  const q4Options = document.getElementsByName("q4");
  let q4Selected = null;
  const q4CorrectValue = "a";
  const q4CorrectAnswer = "How long data can stay cached";

  q4Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q4Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === q4CorrectValue) {
      label.classList.add("correct-answer");
    }
  });

  if (q4Selected === q4CorrectValue) {
    score++;
    q4Feedback.textContent = "Correct";
    q4Feedback.className = "feedback correct";
    questionDetails.push({
      question: 4,
      points: "1/1",
      result: "Correct",
      answer: q4CorrectAnswer
    });
  } else {
    q4Feedback.textContent =
      "Incorrect. Correct answer: How long data can stay cached";
    q4Feedback.className = "feedback incorrect";
    questionDetails.push({
      question: 4,
      points: "0/1",
      result: "Incorrect",
      answer: q4CorrectAnswer
    });
  }

  // Question 5
  const q5Feedback = document.getElementById("q5-feedback");
  const q5Checked = Array.from(
    document.querySelectorAll('input[name="q5"]:checked')
  )
    .map((option) => option.value)
    .sort();

  const q5Correct = ["dnssec", "doh", "dot"].sort();
  const q5CorrectAnswer = "DNSSEC, DNS over HTTPS (DoH), and DNS over TLS (DoT)";

  document.querySelectorAll('input[name="q5"]').forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      label.classList.add("selected-answer");
    }
    if (q5Correct.includes(option.value)) {
      label.classList.add("correct-answer");
    }
  });

  if (arraysEqual(q5Checked, q5Correct)) {
    score++;
    q5Feedback.textContent = "Correct";
    q5Feedback.className = "feedback correct";
    questionDetails.push({
      question: 5,
      points: "1/1",
      result: "Correct",
      answer: q5CorrectAnswer
    });
  } else {
    q5Feedback.textContent =
      "Incorrect. Correct answers: DNSSEC, DNS over HTTPS (DoH), and DNS over TLS (DoT)";
    q5Feedback.className = "feedback incorrect";
    questionDetails.push({
      question: 5,
      points: "0/1",
      result: "Incorrect",
      answer: q5CorrectAnswer
    });
  }

  showResults(score, totalQuestions, questionDetails);
}

function showResults(score, totalQuestions, questionDetails) {
  const overallResult = document.getElementById("overallResult");
  const totalScore = document.getElementById("totalScore");
  const questionResults = document.getElementById("questionResults");
  const resultsBox = document.getElementById("results");

  const passed = score >= 3;

  overallResult.textContent = passed
    ? "Overall Result: Pass"
    : "Overall Result: Fail";
  overallResult.className = passed ? "correct" : "incorrect";

  totalScore.textContent = "Total Score: " + score + " out of " + totalQuestions;
  totalScore.className = passed ? "correct" : "incorrect";

  questionResults.innerHTML = "";

  questionDetails.forEach(function (item) {
    const resultClass = item.result === "Correct" ? "correct" : "incorrect";

    questionResults.innerHTML += `
      <div class="question-result ${resultClass}">
        <p><strong>Question ${item.question}</strong></p>
        <p><strong>Score:</strong> ${item.points}</p>
        <p><strong>Result:</strong> ${item.result}</p>
        <p><strong>Correct Answer:</strong> ${item.answer}</p>
      </div>
    `;
  });

  resultsBox.style.display = "block";
}

function resetQuizUI() {
  clearFeedback();
  document.getElementById("overallResult").textContent = "";
  document.getElementById("overallResult").className = "";
  document.getElementById("totalScore").textContent = "";
  document.getElementById("totalScore").className = "";
  document.getElementById("questionResults").innerHTML = "";
}

function clearFeedback() {
  document.querySelectorAll(".feedback").forEach((item) => {
    item.textContent = "";
    item.className = "feedback";
  });

  document
    .querySelectorAll(
      ".highlight-correct, .highlight-incorrect, .selected-answer, .correct-answer"
    )
    .forEach((item) => {
      item.classList.remove(
        "highlight-correct",
        "highlight-incorrect",
        "selected-answer",
        "correct-answer"
      );
    });
}

function allQuestionsAnswered() {
  const q1 = document.getElementById("q1").value.trim();
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');
  const q4 = document.querySelector('input[name="q4"]:checked');
  const q5 = document.querySelector('input[name="q5"]:checked');

  if (q1 === "") return false;
  if (!q2) return false;
  if (!q3) return false;
  if (!q4) return false;
  if (!q5) return false;

  return true;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
