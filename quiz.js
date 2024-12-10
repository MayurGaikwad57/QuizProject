const questions = document.querySelector('.quizQuestions');
const options = document.querySelector('.quizOptions');
const answers = document.querySelector('.quizAnswers');
const getScore = document.querySelector('.scoreCard')
const getAlert = document.querySelector('.alert');
const nextBtn = document.querySelector('.btn');


let questionIndex = 0;
let score = 0;
let quizOver = false;

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
    // getAlert.style.display = "none";
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
        showAlert("Wrong Answer");
    }
    questionIndex++;
    if(questionIndex < quiz.length) {
        showQuestions();
    }
    else{
        showScore();
        quizOver = true;
    }
}

const showAlert = (msg) => {
  getAlert.textContent = msg;
  getAlert.style.display = "block";
}

const showScore = () => {
    getAlert.style.display = "none"
    questions.textContent = "";
    options.textContent ="";
    getScore.textContent = `You scored ${score} out of ${quiz.length}`
    nextBtn.textContent = "Play Again";
    
    
}
showQuestions();
nextBtn.addEventListener('click',()=>{
   const selectedOption = document.querySelector('.choice.selected');
   if(!selectedOption && nextBtn.textContent === "Next") {
    //    alert("please select an answer");
    showAlert("please select an answer");
    getAlert.style.display = "block";
   }
   else if(quizOver) {
     nextBtn.textContent = "Next";
     getScore.textContent ="";
     questionIndex = 0;
     showQuestions();
     quizOver = false;
     score =0;
     getAlert.style.display = "block";
   }
   else {
    showAnswer();  
   }
})















