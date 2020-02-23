var socket = io();

socket.on('connect', function () {
    socket.emit('requestDbNames');//Get database names to display to user
});

socket.on('gameNamesData', function (data) {

    // console.log(data);

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


    // for (var i = 0; i < Object.keys(data).length; i++) {

    //     // var div = document.getElementById('game-list');

    //     // var button = document.createElement('button');

    //     // button.innerHTML = data[i].name;
    //     // button.setAttribute('onClick', "startGame('" + data[i].id + "')");
    //     // button.setAttribute('id', 'gameButton');

    //     // div.appendChild(button);
    //     // div.appendChild(document.createElement('br'));
    //     // div.appendChild(document.createElement('br'));

    //     var playersCardDeck = document.getElementById('game-list');   
        
    //     var gameListItem = `
    //     <div class="col mb-4">
    //     <div class="card text-center">
    //     <div class="card-header">
    //     Featured
    //     </div>
    //     <div class="card-body">
    //     <div class="d-flex w-100 justify-content-between">
    //     <small>3 days ago</small>
    //     </div>
    //     <h5 class="card-title">${data[i].name}</h5>
    //     <p class="card-text">${data[i].description}</p>
    //     <a href="#" onclick="startGame('${data[i].id}')" class="btn btn-primary">Start Game</a>
    //     </div>
    //     <div class="card-footer text-muted">
    //     2 days ago
    //     </div>
    //     </div>  
    //     </div>
    //     `

    //     playersCardDeck.insertAdjacentHTML('afterbegin', gameListItem); 

    //     // console.log(i);
    
    // }

});

function startGame(data) {
    window.location.href = "/host/" + "?id=" + data;
}



function deleteQuizFromDB(quiz) {
    console.log('QUIZ ID :' + quiz);
    
    socket.emit('deleteQuiz', quiz);
}

