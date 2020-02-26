var socket = io();

var params = jQuery.deparam(window.location.search);

console.log(params);


socket.on('connect', function () {

    socket.emit('requestQuizQuestions', params);//Get database names to display to user
});

socket.on('gameQuestionData', function (data) {

    var questionsTemplate = '<form class="w-100" ><div class="form-group">';

    var questionList = document.getElementById('questions-list');
    // playersCardDeck.innerHTML = "";

    // Clean table after 
    while(questionList.firstChild){
        questionList.removeChild(questionList.firstChild);
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // const element = data[key];
            const questions = data[key].questions;

            let quizName = document.getElementById('name').value = data[key].name;
            let quizDescription= document.getElementById('description').value = data[key].description;

            // console.log(data[key].name);
            // console.log(data[key].description);
            // const questionsNumber =  data[key].questions.length;
            // console.log(questionsNumber);

            // var questionNumber = 1;

            for (let [index, val] of questions.entries()) {
                // your code goes here   
                // console.log(index); 
                
                var questionNumber = index+1;
                // console.log(questionNumber); 

                        // console.log(val);

                var questionObject = val;
                
                questionsTemplate += `
                        <label for="question-${questionNumber}" class="text-center d-block questionCounter" >Question ${questionNumber}</label>
                        <input type="text" class="form-control" id="question-${questionNumber}" aria-describedby="emailHelp" value="${questionObject.question}" >
                        <small id="emailHelp" class="form-text text-muted">Edit the question</small>
                    `
                    // console.log(questionsTemplate);

                    const answers = questionObject.answers; 

                    

                    for (let [index, val] of answers.entries()) {
                        // your code goes here    
                        // console.log(index);
                        var answerNumber = index +1;
                        var answer = val;
                        // console.log(val);
                        questionsTemplate += `
                            <label for="question-${index}" class=" text-center d-block" >Answer ${answerNumber}</label>
                            <input type="text" class="form-control" id="question-${questionNumber}-answer-${answerNumber}" aria-describedby="emailHelp" value="${answer}" >
                            <small id="emailHelp" class="form-text text-muted">Edit the question</small>
                        `
                    }

                    questionsTemplate += `
                    
                    <label for="question-${questionNumber}-correct" class="text-center d-block" >Question ${questionNumber} Correct</label>
                    <input type="number" class="form-control" id="question-${questionNumber}-correct" aria-describedby="emailHelp" value="${questionObject.correct}" >
                    <small id="emailHelp" class="form-text text-muted">Edit the question</small>`

            }

        }
    }

    questionsTemplate += '</div></form>';

    questionList.insertAdjacentHTML('afterbegin', questionsTemplate); 

});


// var questionNum = 1; //Starts at two because question 1 is already present

function updateQuestionsinDatabase(){

    var questionNum = document.querySelectorAll('.questionCounter').length;


    var questions = [];

    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    for(var i = 1; i <= questionNum; i++){
        var question = document.getElementById('question-' + i).value;
        var answer1 = document.getElementById('question-' + i + '-answer-1').value;
        var answer2 = document.getElementById('question-' + i + '-answer-2').value;
        var answer3 = document.getElementById('question-' + i + '-answer-3').value;
        var answer4 = document.getElementById('question-' + i + '-answer-4').value;
        var correct = document.getElementById('question-' + i + '-correct' ).value;
        var answers = [answer1, answer2, answer3, answer4];
        questions.push({"question": question, "answers": answers, "correct": correct})
    }
    
    var quiz = {id: params.id, "name": name, "description" : description,  "questions": questions};
    
    socket.emit('deleteQuiz', params.id);
    socket.emit('editQuiz', quiz);
}


function addQuestion(){
    questionNum += 1;
    
    var questionsDiv = document.getElementById('allQuestions');
    
    var newQuestionDiv = document.createElement("div");
    
    var questionLabel = document.createElement('label');
    var questionField = document.createElement('input');
    
    var answer1Label = document.createElement('label');
    var answer1Field = document.createElement('input');
    
    var answer2Label = document.createElement('label');
    var answer2Field = document.createElement('input');
    
    var answer3Label = document.createElement('label');
    var answer3Field = document.createElement('input');
    
    var answer4Label = document.createElement('label');
    var answer4Field = document.createElement('input');
    
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    
    questionLabel.innerHTML = "Question " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    
    answer1Label.innerHTML = "Answer 1: ";
    answer2Label.innerHTML = " Answer 2: ";
    answer3Label.innerHTML = "Answer 3: ";
    answer4Label.innerHTML = " Answer 4: ";
    correctLabel.innerHTML = "Correct Answer (1-4): ";
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');
    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    newQuestionDiv.appendChild(answer2Label);
    newQuestionDiv.appendChild(answer2Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer3Label);
    newQuestionDiv.appendChild(answer3Field);
    newQuestionDiv.appendChild(answer4Label);
    newQuestionDiv.appendChild(answer4Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);
    
    questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
    newQuestionDiv.style.backgroundColor = randomColor();
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../";
    }
}

socket.on('startGameFromCreator', function(data){
    window.location.href = "../../host/?id=" + data;
});

function randomColor(){
    
    var colors = ['#40B297', '#E64E2C', '#A3ACD6', '#D494C0'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function setBGColor(){
    var randColor = randomColor();
    document.getElementById('question-field').style.backgroundColor = randColor;
}

