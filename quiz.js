const container = document.querySelector('.container')
const questions = document.querySelector('.quizQuestions');
const options = document.querySelector('.quizOptions');
const answers = document.querySelector('.quizAnswers');
const getScore = document.querySelector('.scoreCard')
const getAlert = document.querySelector('.alert');
const nextBtn = document.querySelector('.nextBtn');
const startBtn = document.querySelector('.startBtn')
const timerbtn = document.querySelector('.timer');



let questionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timeStop = null;

const quiz = [
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["String", "Selector", "Style", "Pseudo-class"],
        answer: "String"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Transfer Machine Language",
            "Hyperlinks Textual Media Language",
            "Hyperlink Transfer Machine Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which of the following is used to style a webpage?",
        options: ["HTML", "CSS", "Python", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "<ul>"
    },
    {
        question: "Which symbol is used to denote IDs in CSS?",
        options: ["#", ".", "$", "&"],
        answer: "#"
    }
]

let showQuestions = ()=> {
    timerbtn.style.display = "block";
  let questionDetails = quiz[questionIndex];
  questions.textContent = questionDetails.question;
   options.textContent = "";
  for(let i = 0; i< questionDetails.options.length; i++) {
      const currentOption = questionDetails.options[i];
      const optionDiv = document.createElement('div');
      optionDiv.className = 'choice'
      optionDiv.textContent = currentOption;
      options.appendChild(optionDiv);

      optionDiv.addEventListener('click',()=>{
        if(optionDiv.classList.contains('selected')) {
            optionDiv.classList.remove('selected')
        }
        else {
            optionDiv.classList.add('selected')
        }
      })
  }
  if(questionIndex<quiz.length){
    showTimer();
  }
  
} 

const showAnswer = () => {
    const selectedAnswer = document.querySelector('.choice.selected');
    if(selectedAnswer.textContent === quiz[questionIndex].answer) {
        // alert("Correct Answer");
        showAlert("Correct Answer");
        score++;
    }
    else{
        // alert("Wrong Answer")
        showAlert(`Wrong Answer !! The Correct Answer is ${quiz[questionIndex].answer}`);
    }
    timeLeft = 15;
    questionIndex++;
    if(questionIndex < quiz.length) {
        showQuestions();
    }
    else{
        showScore();
        quizOver = true;
        stopTimer();
        timerbtn.style.display = "none";
    }
}

const showAlert = (msg) => {
  getAlert.textContent = msg;
  getAlert.style.display = "block";
  setTimeout(()=>{
 getAlert.style.display ="none";
  },2000)
//   getAlert.style.display = "block";
}

const showTimer = () => {
    clearInterval(timeStop);
    timerbtn.textContent = timeLeft;
    // timeLeft--;
    let countDown = () => {
        timeLeft--;
        timerbtn.textContent = timeLeft;
        if(timeLeft === 0) {
            const confirmUser = confirm("Time's Up!! Do you want to play Again")
            if(confirmUser) {
                timeLeft = 15;
                startQuiz();
            }
            else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
   timeStop = setInterval(countDown,1000)
}
let startQuiz = () => {
    timeLeft = 15;
    timerbtn.style.display = "flex";
    showQuestions();
}
let stopTimer = () => {
    clearInterval(timeStop);
}
const showScore = () => {
    getAlert.style.display = "none"
    questions.textContent = "";
    options.textContent ="";
    getScore.textContent = `You scored ${score} out of ${quiz.length}`
    showAlert("Quiz Completed")
    nextBtn.textContent = "Play Again";
    // timerbtn.style.display = "none"
}
// showQuestions();
nextBtn.addEventListener('click',()=>{
   const selectedOption = document.querySelector('.choice.selected');
   if(!selectedOption && nextBtn.textContent === "Next") {
    //    alert("please select an answer");
    showAlert("please select an answer");
    getAlert.style.display = "block";
    return;
   }
   else if(quizOver) {
     nextBtn.textContent = "Next";
     getScore.textContent ="";
     questionIndex = 0;
     score =0;
     quizOver = false;
     startQuiz();
    //  getAlert.style.display = "none";
   }
   else {
    showAnswer();  
   }
})

startBtn.addEventListener('click',()=>{
    startBtn.style.display = 'none';
    container.style.display = 'block';
    startQuiz();
})

