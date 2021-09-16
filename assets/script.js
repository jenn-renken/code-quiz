// var questionsEl = document.getElementById("questions");
// var choicesEl = document.getElementById("question-choice");
// var buttonEl = document.getElementById("start-btn");

// Array of questions for the quiz.
var questions = [
    { 
        question: 'Who invented JavaScript?', 
        choices: ['Elon Musk', 'Steve Jobs', 'Bill Gates', 'Brendan Eich'],
        answer: 'Brendan Eich' 
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A useful tool to debug code and print content is:",
        choices: ["for()", "document.getElementById", ".addEventListener", "console.log()"],
        answer: "console.log()"
    },
    {    
        question: "Which of the following is a data type?",
        choices: ["prompt", "boolean", "alert", "variable"],
        answer: "boolean"
    },
    {
        question: "What is an array used for?",
        choices: ["storing numbers and strings", "iterating through data", "displaying content", "none of the above"],
        answer: "storing numbers and strings"
    },
  ];

  var score = 0;
  var questionIndex = 0;

  var elements = {
     startQuiz: document.querySelector("#startQuiz"),
     question: document.querySelector("#question"),
     intro: document.querySelector("#intro"),
     questionTitle: document.querySelector("#questionTitle"),
     currentTime: document.querySelector("#currentTime"),
     timer: document.querySelector("#startTime"),
     questionsDiv: document.querySelector("#questionsDiv"),
     wrapper: document.querySelector("#wrapper"),
     highScore: document.querySelector("#highScore"),
     clear: document.querySelector("#clear"),
     goBack: document.querySelector("#goBack"),
  };
  
// 20 seconds alotted per question
var secondsLeft = 1000;
var holdInterval = 0;
// 10 second penalty for incorrect answer
var penalty = 10;
var ulCreate = document.createElement("ul");

showElement(elements.intro);

function showElement(element) {
    var children = elements.wrapper.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.style.display = "none"
    }
    if (!element) {
        return;
    }
    element.style.display = "";
}

function startQuiz() {
    showQuizItem(0);
}

function showQuizItem(number) {
    showElement();
    var question = questions[number];
    elements.questionTitle.innerHTML = question.question;
    showElement(elements.question);
}

elements.startQuiz.addEventListener("click", startQuiz);

// triggers timer on click
timer.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(holdInterval);
            allDone();
            currentTime.textContent = "Time is up!";
        }

        }, 1000);
    }
    render(questionIndex);
});

// show question and choices
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // loop through questions in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";

        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;   
        }
    }

    if (questionIndex >= questions.length) {
        finishQuiz();
        createDiv.textContent = "Your score is " + score + "!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function finishQuiz() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "You finished the quiz!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // calculate time remaining and show score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Enter initials for score
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // set local storage for initials and score
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {
            alert("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            alert(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./HighScores.html");
        }
    });

}

// Clear scores
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

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
// buttonEl.addEventListener("click", startQuiz);

// timer will begin

// questions array

// global selectors
    // questions
    // start button
    // choices element
    // timer

// function to start the quiz
// function startQuiz() {
//     var startScreen = document.getElementById("start-screen");
//     startScreen.setAttribute("style", "display:none");
//     console.log("hello");
// }

    

