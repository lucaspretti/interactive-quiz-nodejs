var socket = io();
var params = jQuery.deparam(window.location.search);

//When host connects to server
socket.on('connect', function() {

    document.getElementById('players').value = "";
    
    //Tell server that it is host connection
    socket.emit('host-join', params);
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function(data){
    
    document.getElementById('players').value = "";
    document.getElementById('players').innerHTML = "";
    
    
    for(var i = 0; i < data.length; i++){
        var playersCardDeck = document.getElementById('players'); 


        var playerCard = `<div class="col mb-4">
                            <div class="card h-100">
                            <img src="https://api.adorable.io/avatars/300/${data[i].name}.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${data[i].name}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                            </div>
                        </div>`


        playersCardDeck.insertAdjacentHTML('afterbegin', playerCard );
        console.log(data[i].name);
        
        document.getElementById('players').value += data[i].name + "\n";
    }
    
});

//Tell server to start game if button is clicked
function startGame(){
    socket.emit('startGame');
}
function endGame(){
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function(id){
    console.log('Game Started!');
    window.location.href="/host/game/" + "?id=" + id;
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Redirect user to 'join game' page
});

