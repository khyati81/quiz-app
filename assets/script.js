const questions = [
   {
     questionText: "Commonly used data types DO NOT include:",
     options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
     answer: "3. alerts",
   },
   {
     questionText: "Arrays in JavaScript can be used to store ______.",
     options: [
       "1. numbers and strings",
       "2. other arrays",
       "3. booleans",
       "4. all of the above",
     ],
     answer: "4. all of the above",
   },
   {
     questionText:
       "String values must be enclosed within _____ when being assigned to variables.",
     options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
     answer: "3. quotes",
   },
   {
     questionText:
       "A very useful tool used during development and debugging for printing content to the debugger is:",
     options: [
       "1. JavaScript",
       "2. terminal/bash",
       "3. for loops",
       "4. console.log",
     ],
     answer: "4. console.log",
   },
   {
     questionText:
       "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
     options: ["1. break", "2. stop", "3. halt", "4. exit"],
     answer: "1. break",
   },
 ];
 // click on start button
 let startBtn = document.querySelector('.startBtn');
 startBtn.addEventListener('click' , startQuiz);
 
function startQuiz() {
  //add time and remove Rules div
   document.querySelector('.time').style.display = 'block';
   document.getElementById('quizRules').style.display = 'none';
   
   nextQuestion();

   //local storage
   let count =0;
   localStorage.setItem('countCorrect', count);
   let questionNo =0;
   localStorage.setItem('questionNoAt', questionNo);
  }

//iterator
function questionIterator(question) {
  let nextIndex = 0;
  return{
    next:function(){
      return nextIndex<question.length ?
      {value:question[nextIndex++] ,
       done:false}:
      {done:true}
    }
  }
}

const quesAns = questionIterator(questions);

  function nextQuestion() {
    const currentQuesAns = quesAns.next().value;
    let nextQuesHtml = document.getElementById('quiz');

    if(currentQuesAns != undefined){
      nextQuesHtml.innerHTML =` <div id="quizQuestion">
      <h2>${currentQuesAns.questionText}</h2>
      <div class="optionList">
          <div class="option">
             <input type="radio" name="optionRadio" value="${currentQuesAns.options[0]}" id=""> &nbsp;${currentQuesAns.options[0]}
          </div>
          <div class="option">
             <input type="radio" name="optionRadio" value="${currentQuesAns.options[1]}"  id="">&nbsp;${currentQuesAns.options[1]}
          </div>
          <div class="option">
              <input type="radio" name="optionRadio" value="${currentQuesAns.options[2]}" id="">&nbsp;${currentQuesAns.options[2]}
          </div>
          <div class="option">
              <input type="radio" name="optionRadio" value="${currentQuesAns.options[3]}" id="">&nbsp;${currentQuesAns.options[3]}
          </div>
      </div>
    
    </div>`;
    // document.getElementById('nextBtn').addEventListener('click', nextQuestion);

    //countdown for each question
    var countDownTimer = 10;
    var timer = setInterval(() => {
      document.getElementById('timeout').innerHTML = countDownTimer;
      countDownTimer--;
      if(countDownTimer==0){
        clearInterval(timer);
        nextQuestion();
      }
      if(countDownTimer==2){
        selectedInput();
      }
    }, 1000);

  }else{
    //display result
      document.getElementById('quizQuestion').style.display = 'none';
      document.querySelector('.time').style.display = 'none';
      let correctAns = localStorage.getItem('countCorrect');
      document.getElementById('quiz').innerHTML = `<div id="result">
                                                      <div class="textArea">Your final score is </div>
                                                      <div class="scoreArea">${correctAns}/5</div>
                                                   </div>`;
    }
  }

  function selectedInput() {
    var ele = document.getElementsByName('optionRadio');
    let nextQuestionNo = localStorage.getItem('questionNoAt'); 
    // console.log("given ans : "+questions[nextQuestionNo].answer);      
    for(let i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        // console.log("User ans : "+ele[i].value); 
        if(ele[i].value == questions[nextQuestionNo].answer){
          let correctAns = localStorage.getItem('countCorrect'); 
          correctAns++;
          localStorage.setItem('countCorrect', correctAns);
          // console.log('correct ans');
        }else{
          console.log('wrong ams');
        }     

      }
    }
    nextQuestionNo++;
    localStorage.setItem('questionNoAt', nextQuestionNo);
}
  

















