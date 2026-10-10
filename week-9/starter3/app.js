"use strict";

// ============================================
// Timed Practice Quiz Application
// ============================================
// This application creates a timed math quiz that:
// - Collects participant information
// - Displays a countdown timer
// - Validates answers against correct responses
// - Highlights incorrect answers
// - Shows final results

// Quiz configuration
const quizTime = 60; // Quiz duration in seconds
const correctAnswers = ["10", "4", "-6", "5", "-7"]; // Correct answer for each question

// ============================================
// DOM Element References
// ============================================

// Setup form elements
const quizSetup = document.getElementById("quizSetup");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailAddress = document.getElementById("emailAddress");
const courseSection = document.getElementById("courseSection");
const quizTopic = document.getElementById("quizTopic");
const errorBox = document.getElementById("errorBox"); // Display validation errors

// Participant summary section
const summarySection = document.getElementById("summarySection");
const summaryFirstName = document.getElementById("summaryFirstName");
const summaryLastName = document.getElementById("summaryLastName");
const summaryEmailAddress = document.getElementById("summaryEmailAddress");
const summaryCourseSection = document.getElementById("summaryCourseSection");
const summaryQuizTopic = document.getElementById("summaryQuizTopic");

// Quiz and results elements
const quizSection = document.getElementById("quizSection");
const quizClock = document.getElementById("quizClock"); // Timer display
const resultsSection = document.getElementById("resultsSection");
const resultsMessage = document.getElementById("resultsMessage");

// Quiz question inputs
const questionList = document.querySelectorAll("#quizQuestions input");

// ============================================
// Application State
// ============================================
let timeLeft = quizTime; // Tracks remaining time
let timerId = null; // Stores interval ID for countdown

// Initialize timer display
quizClock.value = quizTime;

// ============================================
// Event Listeners
// ============================================

// Handle quiz setup form submission
quizSetup.addEventListener("submit", function (event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Clear any previous error messages
  errorBox.textContent = "";

  // Validate that all participant fields are completed
  if (
    firstName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    emailAddress.value.trim() === "" ||
    courseSection.value.trim() === "" ||
    quizTopic.value.trim() === ""
  ) {
    errorBox.textContent = "Complete all five participant fields before starting the quiz.";
    return;
  }

  // Validate the email before showing the quiz or starting the timer
  const email = emailAddress.value;
  if (!email.includes("@") || /\s/.test(email) || !/\.(com|net)$/i.test(email)) {
    errorBox.textContent =
      "Email must contain an @ symbol, must not contain spaces, and must end in .com or .net.";
    return;
  }

  // Copy participant information to summary and show quiz
  summaryFirstName.textContent = firstName.value.trim();
  summaryLastName.textContent = lastName.value.trim();
  summaryEmailAddress.textContent = emailAddress.value.trim();
  summaryCourseSection.textContent = courseSection.value.trim();
  summaryQuizTopic.textContent = quizTopic.value.trim();
  summarySection.classList.remove("hidden");
  quizSection.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  // Initialize and start quiz with countdown timer
  resetQuiz();
  timerId = window.setInterval(countdown, 1000); // Call countdown every 1000ms
});

// ============================================
// Quiz Management Functions
// ============================================

/**
 * Reset quiz to initial state:
 * - Clear any active countdown
* - Reset time to full duration
 * - Clear all question inputs
 * - Remove wrong answer styling
 */
function resetQuiz() {
  window.clearInterval(timerId);
  timeLeft = quizTime;
  updateClock();

  clearAnswers();
  clearAnswerStyles();
}
/**
 * Update the quiz clock display with the current time left using the quizClock input field.
 */
function updateClock() {
  quizClock.value = timeLeft;
}

function clearAnswers() {
  questionList.forEach((input) => {
    input.value = "";
  });
}

function clearAnswerStyles() {
  questionList.forEach((input) => {
    input.classList.remove("wronganswer");
  });
}

/**
 * Countdown timer function - decrements time and shows results when expired
 * Called every 1000ms during active quiz
 */
function countdown() {
  if (timeLeft === 0) {
    // Time expired - stop timer and display results
    window.clearInterval(timerId);
    showResults();
  } else {
    // Decrement time and update display
    timeLeft--;
    updateClock();
  }
}

/**
 * Check all answers, show results section, and display score message
 */
function showResults() {
  // Validate and count correct answers
  const totalCorrect = checkAnswers();

  // Display results section
  resultsSection.classList.remove("hidden");

  // Build and display results message
  resultsMessage.textContent =
    summaryFirstName.textContent +
    ", you answered " +
    totalCorrect +
    " out of " +
    correctAnswers.length +
    " correctly.";
}

/**
 * Compare user answers against correct answers:
 * - Apply "wronganswer" class to incorrect responses
 * - Removes "wronganswer" class from correct responses
 * - Returns total count of correct answers
 */
function checkAnswers() {
  let correctCount = 0;

  // Check each question against its correct answer
  questionList.forEach((input, index) => {
    if (input.value.trim() === correctAnswers[index]) {
      // Correct answer - ensure styling is clean
      input.classList.remove("wronganswer");
      correctCount++;
    } else {
      // Incorrect or empty answer - highlight with error styling
      input.classList.add("wronganswer");
    }
  });

  return correctCount;
}
