var socket = io();

socket.on('connect', function () {
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('gameNamesData', function (data) {

    // console.log(data);

    var playersCardDeck = document.getElementById('game-list');
    // playersCardDeck.innerHTML = "";

    while(playersCardDeck.firstChild){
        playersCardDeck.removeChild(playersCardDeck.firstChild);
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            // console.log(element);
            var playersCardDeck = document.getElementById('game-list');

            var gameListItem = `
                        <div class="col-12 col-lg-4 mb-4 ">
                            <div class="card text-center">
                            <div class="card-header">
                                Featured
                                <a  href="#" 
                                  type="button" data-toggle="modal" data-target="#exampleModal"
                                    class="close" 
                                    aria-label="Delete">
                                    <span aria-hidden="true">&times;</span>
                                </a>
                            </div>
                            <div class="card-body">
                            <div class="d-flex w-100 justify-content-between">
                                <small>3 days ago</small>
                            </div>
                                <h5 class="card-title">${data[key].name}</h5>
                                <p class="card-text">${data[key].description}</p>
                                <a href="#" onclick="startGame('${data[key].id}')" class="btn btn-primary">Start Quiz</a>
                                <a href="#" onclick="deleteQuizFromDB('${data[key].id}')" class="btn btn-danger">Delete Quiz</a>
                            </div>
                            <div class="card-footer text-muted">
                                2 days ago
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
    console.log('QUIZ ID :' + quiz);
    
    socket.emit('deleteQuiz', quiz);
}



$('#deleteQuizModal').on('show.bs.modal', function (event) {
    console.log('deleteQuizModal openend');
    
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })