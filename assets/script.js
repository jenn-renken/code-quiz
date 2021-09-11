var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("question-choice");
var buttonEl = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");

// The array of questions for the game.
var questions = [
    { 
        question: 'Who invented JavaScript?', 
        choices: ['Elon Musk', 'Steve Jobs', 'Bill Gates', 'Brendan Eich'],
        answer: 'Brendan Eich' 
    },
    { q: 'There are 365 days in a year.', a: 't' },
    { q: 'There are 42 ounces in a pound.', a: 'f' },
    { q: 'The Declaration of Independence was created in 1745.', a: 'f' },
    { q: 'Bananas are vegetables.', a: 'f' }
  ];

// We start the game with a score of 0.
// var score = 0;

// Loop over every question object
// for (var i = 0; i < questions.length; i++) {
//   // Display current question to user and ask OK/Cancel
//   var answer = confirm(questions[i].q);

//   // Compare answers
//   if (
//     (answer === true && questions[i].a === 't') ||
//     (answer === false && questions[i].a === 'f')
//   ) {
//     // Increase score
//     score++;
//     // Alert the user
//     alert('Correct!');
//   } else {
//     alert('Wrong!');
//   }
// }

// Show total at end
// alert('You got ' + score + '/' + questions.length);

// add event listener to start button to initialize quiz
buttonEl.addEventListener("click", startQuiz);

// timer will begin

// questions array

// global selectors
    // questions
    // start button
    // choices element
    // timer

// function to start the quiz
function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("style", "display:none");
    console.log("hello");
}

    

