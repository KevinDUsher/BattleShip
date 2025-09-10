const { Player } = require("./player");

let players = [];
let orientation = 1;
let boatLengths = [5, 4, 3, 3, 2];
let currentBoat = 0;
let rows = 10;
let columns = 10;
let playerBoats = [[],[]];
let occupiedPoints = []
let currentPlayer = 0;
players.push(new Player("player"));
players.push(new Player("player"));
let mainContainer = document.createElement("div");
mainContainer.id = "MainContainer";
document.getElementsByTagName("body")[0].appendChild(mainContainer);
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {  
    event.preventDefault();
    if(orientation == 0){ orientation = 1}else {orientation = 0}       
  }
});

function setUpPlayers(){
    players[currentPlayer].setBoats(playerBoats[currentPlayer]);
}

function displayWinMessage(){
    mainContainer.innerHTML = "";
    let winMessage = document.createElement("div");
    winMessage.innerHTML = "Player "+ (currentPlayer+1) + " Wins!!!";
    winMessage.style.width = "6rem";
    winMessage.style.height = "3rem";
    winMessage.style.fontSize = "2rem";
    mainContainer.appendChild(winMessage);

}

function displayBoard(rows, columns){
    for(let x = 0; x < rows; x++){
        let row = document.createElement("div");
        row.classList = "row";
        mainContainer.appendChild(row);
        for(let y = 0; y < columns; y++){
            let button = document.createElement("button");
            button.classList = "gridButton";
            button.dataset.x = x;
            button.dataset.y = y;
            button.addEventListener("mouseover", (e) => {
                let buttonX = Number(e.target.dataset.x);
                let buttonY = Number(e.target.dataset.y);
                if(orientation == 0){
                    const outOfBounds = (buttonY + boatLengths[currentBoat] - 1) >= columns;
                    const color = outOfBounds ? "red" : "green";
                    for(let i = 0; i < boatLengths[currentBoat]; i++){
                        if((buttonY+i) < columns){
                            let otherButton = findButton(buttonX, buttonY+i);
                            console.log(otherButton);
                            otherButton.style.backgroundColor = color;
                        }
                    }
                }else{
                    const outOfBounds = (buttonX + boatLengths[currentBoat] - 1) >= rows;
                    const color = outOfBounds ? "red" : "green";
                    for(let i = 0; i < boatLengths[currentBoat]; i++){
                        if((buttonX+i) < rows){
                            let otherButton = findButton(buttonX+i, buttonY);
                            otherButton.style.backgroundColor = color;
                        }
                    }
                }
            });
            button.addEventListener("mouseout", (e) => {
                document.querySelectorAll(".gridButton").forEach(b => {
                    if(!b.classList.contains("clicked")){
                        b.style.backgroundColor = "";
                    }
                });
            });
            button.addEventListener("click", (e) => {
                let buttonX = Number(e.target.dataset.x);
                let buttonY = Number(e.target.dataset.y);
                if(orientation == 0){
                    const outOfBounds = (buttonY + boatLengths[currentBoat] - 1) >= columns;
                    const color = outOfBounds ? "red" : "green";
                    if(!outOfBounds && checkBetween([buttonX, buttonY], boatLengths[currentBoat], orientation)){
                        for(let i = 0; i < boatLengths[currentBoat]; i++){
                            let otherButton = findButton(buttonX, buttonY+i);
                            otherButton.style.backgroundColor = color;
                            otherButton.classList.add("clicked");
                            occupiedPoints.push([buttonX, buttonY+i]);
                        }
                        playerBoats[currentPlayer].push([[buttonX, buttonY],[buttonX,buttonY + boatLengths[currentBoat] - 1]] );
                        currentBoat++;
                        if(currentBoat >= boatLengths.length){
                            currentBoat = 0;
                            setUpPlayers();
                            currentPlayer++;
                            mainContainer.innerHTML = "";
                            occupiedPoints = [];
                            if(currentPlayer > 1){
                                currentPlayer = 0;
                                startGame();
                            }else{
                                displayBoard(rows,columns);
                            }
                        }
                    }
                }else{
                    const outOfBounds = (buttonX + boatLengths[currentBoat] - 1) >= rows;
                    const color = outOfBounds ? "red" : "green";
                    if(!outOfBounds && checkBetween([buttonX, buttonY], boatLengths[currentBoat], orientation)){
                        for(let i = 0; i < boatLengths[currentBoat]; i++){
                            let otherButton = findButton(buttonX+i, buttonY);
                            otherButton.style.backgroundColor = color;
                            otherButton.classList.add("clicked");
                            occupiedPoints.push([buttonX+i, buttonY]);
                        }
                        playerBoats[currentPlayer].push([[buttonX, buttonY],[buttonX + boatLengths[currentBoat] - 1,buttonY]] );
                        currentBoat++;
                        if(currentBoat >= boatLengths.length){
                            currentBoat = 0;
                            setUpPlayers();
                            currentPlayer++;
                            mainContainer.innerHTML = "";
                            occupiedPoints = [];
                            if(currentPlayer > 1){
                                currentPlayer = 0;
                                startGame();
                            }else{
                                displayBoard(rows,columns);
                            }
                        }
                    }
                }
                console.log(playerBoats);
            });
            button.style.width = "3rem";
            button.style.height = "3rem";
            row.appendChild(button);
        }
    }
    let label = document.createElement("div");
    label.classList = "boardLabel";
    label.innerHTML = "Player " + (currentPlayer + 1) +" place your boats. Use spacebar to change orientation";
    label.style.width = "100%vw";
    label.style.height = "3rem";
    label.style.fontSize = "2rem";
    mainContainer.appendChild(label);
}

function findButton(x, y){
    return document.querySelector('.gridButton[data-x="' + x + '"][data-y="' + y + '"]');
}

function checkBetween(arrayPoints, boatLength, ori){
    let accept = true;
    if(orientation == 0){
        for(let i = 0; i < boatLength; i++){
            if(occupiedPoints.some(([x, y]) => x === arrayPoints[0] && y === (arrayPoints[1]+i))){
                accept = false;
            }
         }
    }else{
        for(let i = 0; i < boatLength; i++){
            if(occupiedPoints.some(([x, y]) => x === (arrayPoints[0]+i) && y === arrayPoints[1])){
                accept = false;
            }
         }
    }
    return accept;
}

function opponentBoard(user){
    if(currentPlayer == 0){
        return 1;
    }
    return 0;
}

function updateBoard(){
    for(let x = 0; x < rows; x++){
        let row = document.createElement("div");
        row.classList = "row";
        mainContainer.appendChild(row);
        for(let y = 0; y < columns; y++){
            let button = document.createElement("button");
            button.classList = "gridButton";
            let opponent = players[opponentBoard(currentPlayer)].gameboard;
            let misses = opponent.getMisses();
            let hits = opponent.getHits();
            let inMisses = misses.some(([_x, _y]) => _x === x && _y === y);
            let inHits = hits.some(([_x, _y]) => _x === x && _y === y);
            button.addEventListener("click", (e) => {
                opponent.receiveAttack([x,y]);
                if(opponent.allShipsSunk()){
                    displayWinMessage();
                }else{
                    currentPlayer = opponentBoard(currentPlayer);
                    mainContainer.innerHTML = "";
                    updateBoard();
                }
            });
            if(inMisses){
                button.style.backgroundColor = "blue";
                button.disabled = true; 
            }
            if(inHits){
                button.style.backgroundColor = "red";
                button.disabled = true; 
            }
            button.dataset.x = x;
            button.dataset.y = y;
            button.style.width = "3rem";
            button.style.height = "3rem";
            row.appendChild(button);
        }
    }
    let label = document.createElement("div");
    label.classList = "boardLabel";
    label.innerHTML = "Player " + (currentPlayer + 1);
    label.style.width = "100%vw";
    label.style.height = "3rem";
    label.style.fontSize = "2rem";
    mainContainer.appendChild(label);
}

function startGame(){
    updateBoard();
}

displayBoard(rows,columns);