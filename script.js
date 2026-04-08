// Brendan McCaffrey - IT 3203 Milestone 2
// Handles quiz submission, grading, and results display

// Wait for the page to load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dnsQuiz");
  const resetButton = document.getElementById("resetButton");

  // Handle quiz submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Warn user if questions are unanswered
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

  // Handle quiz reset
  resetButton.addEventListener("click", function () {
    setTimeout(resetQuizUI, 0);
  });
});

// Main grading logic for the quiz
function gradeQuiz() {
  let score = 0;
  const totalQuestions = 5;
  const questionDetails = [];

  // Question 1 (fill in the blank)
  const q1 = document.getElementById("q1").value.trim().toLowerCase();
  const q1CorrectAnswer = "Domain Name System";

  if (
    q1 === "domain name system" ||
    q1 === "the domain name system"
  ) {
    score++;
    questionDetails.push({ question: 1, points: "1/1", result: "Correct", answer: q1CorrectAnswer });
  } else {
    questionDetails.push({ question: 1, points: "0/1", result: "Incorrect", answer: q1CorrectAnswer });
  }

  // Question 2 (multiple choice)
  const q2Selected = document.querySelector('input[name="q2"]:checked')?.value;
  const q2CorrectValue = "b";
  const q2CorrectAnswer = "IP addresses";

  if (q2Selected === q2CorrectValue) {
    score++;
    questionDetails.push({ question: 2, points: "1/1", result: "Correct", answer: q2CorrectAnswer });
  } else {
    questionDetails.push({ question: 2, points: "0/1", result: "Incorrect", answer: q2CorrectAnswer });
  }

  // Question 3
  const q3Selected = document.querySelector('input[name="q3"]:checked')?.value;
  const q3CorrectValue = "c";
  const q3CorrectAnswer = "Authoritative name server";

  if (q3Selected === q3CorrectValue) {
    score++;
    questionDetails.push({ question: 3, points: "1/1", result: "Correct", answer: q3CorrectAnswer });
  } else {
    questionDetails.push({ question: 3, points: "0/1", result: "Incorrect", answer: q3CorrectAnswer });
  }

  // Question 4
  const q4Selected = document.querySelector('input[name="q4"]:checked')?.value;
  const q4CorrectValue = "a";
  const q4CorrectAnswer = "How long data can stay cached";

  if (q4Selected === q4CorrectValue) {
    score++;
    questionDetails.push({ question: 4, points: "1/1", result: "Correct", answer: q4CorrectAnswer });
  } else {
    questionDetails.push({ question: 4, points: "0/1", result: "Incorrect", answer: q4CorrectAnswer });
  }

  // Question 5 (multi-select)
  const q5Checked = Array.from(
    document.querySelectorAll('input[name="q5"]:checked')
  ).map((option) => option.value).sort();

  const q5Correct = ["dnssec", "doh", "dot"].sort();
  const q5CorrectAnswer = "DNSSEC, DNS over HTTPS (DoH), and DNS over TLS (DoT)";

  if (arraysEqual(q5Checked, q5Correct)) {
    score++;
    questionDetails.push({ question: 5, points: "1/1", result: "Correct", answer: q5CorrectAnswer });
  } else {
    questionDetails.push({ question: 5, points: "0/1", result: "Incorrect", answer: q5CorrectAnswer });
  }

  showResults(score, totalQuestions, questionDetails);
}

// Display results
function showResults(score, totalQuestions, questionDetails) {
  const overallResult = document.getElementById("overallResult");
  const totalScore = document.getElementById("totalScore");
  const questionResults = document.getElementById("questionResults");
  const resultsBox = document.getElementById("results");

  const passed = score >= 3;

  overallResult.textContent = passed ? "Overall Result: Pass" : "Overall Result: Fail";
  overallResult.className = passed ? "correct" : "incorrect";

  totalScore.textContent = `Total Score: ${score} out of ${totalQuestions}`;
  totalScore.className = passed ? "correct" : "incorrect";

  // Build detailed results for each question
  questionResults.innerHTML = "";

  questionDetails.forEach((item) => {
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
  resultsBox.scrollIntoView({ behavior: "smooth" });
}

// Reset UI
function resetQuizUI() {
  // Reset all quiz inputs
  document.getElementById("dnsQuiz").reset();

  // Clear results
  document.getElementById("overallResult").textContent = "";
  document.getElementById("totalScore").textContent = "";
  document.getElementById("questionResults").innerHTML = "";
  document.getElementById("results").style.display = "none";
  
  // Scroll back to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Check that all questions have input
function allQuestionsAnswered() {
  return (
    document.getElementById("q1").value.trim() !== "" &&
    document.querySelector('input[name="q2"]:checked') &&
    document.querySelector('input[name="q3"]:checked') &&
    document.querySelector('input[name="q4"]:checked') &&
    document.querySelector('input[name="q5"]:checked')
  );
}

// Utility function for comparing arrays
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}