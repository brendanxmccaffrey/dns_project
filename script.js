// DNS Quiz grading script for the current quiz.html structure

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dnsQuiz");
  const resetButton = document.getElementById("resetButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!allQuestionsAnswered()) {
      const confirmSubmit = confirm("You have unanswered questions. Do you want to submit anyway?");
      if (!confirmSubmit) {
        return; // stop submission
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

  clearFeedback();

  // Question 1
  const q1 = document.getElementById("q1");
  const q1Feedback = document.getElementById("q1-feedback");
  const q1Answer = q1.value.trim().toLowerCase();

  if (
    q1Answer === "domain name system" ||
    q1Answer === "the domain name system"
  ) {
    score++;
    q1Feedback.textContent = "Correct";
    q1Feedback.className = "feedback correct";
    q1.classList.add("highlight-correct");
  } else {
    q1Feedback.textContent = "Incorrect. Correct answer: Domain Name System";
    q1Feedback.className = "feedback incorrect";
    q1.classList.add("highlight-incorrect");
  }

  // Question 2
  const q2Feedback = document.getElementById("q2-feedback");
  const q2Options = document.getElementsByName("q2");
  let q2Selected = null;

  q2Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q2Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === "b") {
      label.classList.add("correct-answer");
    }
  });

  if (q2Selected === "b") {
    score++;
    q2Feedback.textContent = "Correct";
    q2Feedback.className = "feedback correct";
  } else {
    q2Feedback.textContent = "Incorrect. Correct answer: IP addresses";
    q2Feedback.className = "feedback incorrect";
  }

  // Question 3
  const q3Feedback = document.getElementById("q3-feedback");
  const q3Options = document.getElementsByName("q3");
  let q3Selected = null;

  q3Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q3Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === "c") {
      label.classList.add("correct-answer");
    }
  });

  if (q3Selected === "c") {
    score++;
    q3Feedback.textContent =
      "Correct";
    q3Feedback.className = "feedback correct";
  } else {
    q3Feedback.textContent =
      "Incorrect. Correct answer: Authoritative name server";
    q3Feedback.className = "feedback incorrect";
  }

  // Question 4
  const q4Feedback = document.getElementById("q4-feedback");
  const q4Options = document.getElementsByName("q4");
  let q4Selected = null;

  q4Options.forEach((option) => {
    const label = option.parentElement;
    if (option.checked) {
      q4Selected = option.value;
      label.classList.add("selected-answer");
    }
    if (option.value === "a") {
      label.classList.add("correct-answer");
    }
  });

  if (q4Selected === "a") {
    score++;
    q4Feedback.textContent = "Correct";
    q4Feedback.className = "feedback correct";
  } else {
    q4Feedback.textContent =
      "Incorrect. Correct answer: How long data can stay cached";
    q4Feedback.className = "feedback incorrect";
  }

  // Question 5
  const q5Feedback = document.getElementById("q5-feedback");
  const q5Checked = Array.from(
    document.querySelectorAll('input[name="q5"]:checked')
  )
    .map((option) => option.value)
    .sort();

  const q5Correct = ["dnssec", "doh", "dot"].sort();

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
  } else {
    q5Feedback.textContent =
      "Incorrect. Correct answers: DNSSEC, DNS over HTTPS (DoH), and DNS over TLS (DoT)";
    q5Feedback.className = "feedback incorrect";
  }

  showResults(score, totalQuestions);
}

function showResults(score, totalQuestions) {
  const overallResult = document.getElementById("overallResult");
  const totalScore = document.getElementById("totalScore");
  const questionResults = document.getElementById("questionResults");

  const passed = score >= 3;

  overallResult.textContent = passed ? "Overall Result: Pass" : "Overall Result: Fail";
  overallResult.className = passed ? "correct" : "incorrect";

  totalScore.textContent = `Total Score: ${score} out of ${totalQuestions}`;

  questionResults.innerHTML = `
    <p><strong>Question 1:</strong> ${document.getElementById("q1-feedback").textContent}</p>
    <p><strong>Question 2:</strong> ${document.getElementById("q2-feedback").textContent}</p>
    <p><strong>Question 3:</strong> ${document.getElementById("q3-feedback").textContent}</p>
    <p><strong>Question 4:</strong> ${document.getElementById("q4-feedback").textContent}</p>
    <p><strong>Question 5:</strong> ${document.getElementById("q5-feedback").textContent}</p>
  `;
}

function resetQuizUI() {
  clearFeedback();

  document.getElementById("overallResult").textContent = "";
  document.getElementById("overallResult").className = "";
  document.getElementById("totalScore").textContent = "";
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