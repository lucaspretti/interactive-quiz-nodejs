var socket = io();

socket.on('connect', function () {
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('gameNamesData', function (data) {

    console.log(data);

    // ObjectId("507c7f79bcf86cd7994f6c0e").toString()

    var playersCardDeck = document.getElementById('game-list');
    // playersCardDeck.innerHTML = "";

    while(playersCardDeck.firstChild){
        playersCardDeck.removeChild(playersCardDeck.firstChild);
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // const element = data[key];
            // console.log(element);
            // const questionsNumber =  data[key].questions.length;

            // console.log(questionsNumber);
            
            var playersCardDeck = document.getElementById('game-list');

            var gameListItem = `
                <div class="col-12 col-lg-4 mb-4 ">
                    <div class="card text-center h-100">
                        <div class="card-body pt-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <small>${data[key].questions.length} Questions</small>
                                <a href="#" 
                                    type="button" data-toggle="modal" data-target="#deleteQuizModal"
                                    class="close"  
                                    data-quiz-id="${data[key]._id}"
                                    data-quiz-title="${data[key].name}"
                                    aria-label="Delete">
                                    <span aria-hidden="true">&times;</span>
                                </a>        
                            </div>
                            <h5 class="card-title mt-2">${data[key].name}</h5>
                            <p class="card-text">${data[key].description}</p>
                            <a href="#" onclick="startGame('${data[key]._id}')" class="btn btn-primary">Start Quiz</a>
                            <a href="quiz-editor/?_id=${data[key]._id}" class="btn btn-secondary"><i class="fas fa-edit"></i></i></a>
                        </div>
                    </div>  
                </div>
                `

            playersCardDeck.insertAdjacentHTML('afterbegin', gameListItem); 
            // console.log(i);

        }
    }

});

function startGame(data) {
    window.location.href = "/host/" + "?id=" + data;
}



function deleteQuizFromDB(quiz) {
    // console.log('QUIZ ID :' + quiz);
    socket.emit('deleteQuiz', quiz);
}



$('#deleteQuizModal').on('show.bs.modal', function (event) {
    console.log('deleteQuizModal openend');
    
    var button = $(event.relatedTarget) // Button that triggered the modal
    var quizId = button.data('quiz-id') // Extract info from data-* attributes
    var quizTitle = button.data('quiz-title') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    // modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('#quizTitle').text(quizTitle);
    modal.find('#deleteQuizFinalBtn').attr('onClick', 'deleteQuizFromDB(' + quizId + ')');
    // modal.find('.modal-body input').val(recipient)
  })



