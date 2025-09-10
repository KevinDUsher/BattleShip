const { Gameboard } = require("./board");

class Player{
    constructor(type){
        this._type = type;
        this.rows = 10;
        this.columns = 10;
        this._gameBoard = new Gameboard(this.rows, this.columns);
        this._playerMoves = [];
    }

    get type(){
        return this._type;
    }

    getBoatPositions(boats){
        let random = (max) => {return Math.floor(Math.random() * max);};
        let checkArray = (array, pos1 , pos2) => {
            if(pos1[0] == pos2[0]){
                for(let i = pos1[1]; i <= pos2[1]; i++){
                    if(array[pos1[0]][i] == 'x'){
                        return false;
                    }
                }
            }else{
                for(let i = pos1[0]; i <= pos2[0]; i++){
                    if(array[i][pos1[1]] == 'x'){
                        return false;
                    }
                }
            }
            return true;
        };
        let fillArray = (array, pos1 , pos2) => {
            if(pos1[0] == pos2[0]){
                for(let i = pos1[1]; i <= pos2[1]; i++){
                    array[pos1[0]][i] = 'x';
                }
            }else{
                for(let i = pos1[0]; i <= pos2[0]; i++){
                    array[i][pos1[1]] = 'x';
                }
            }
            return array;
        };
        let tempBoard = Array.from({ length: this.rows }, () => Array(this.columns).fill('o'));
        let boatPos = [];
        for(let i = 0; i < boats.length; i++){
            let orientation = random(2);
            let startRow = random(this.rows);
            let startColumn = random(this.columns);
            let endRow = startRow;
            let endColumn = startColumn;
            if(orientation == 0){
                endColumn += boats[i] -1;
            }
            else{
                endRow += boats[i] - 1;
            }
            let notPlaced = true;
            while(notPlaced){
                if(endRow >= this.rows){
                    notPlaced = false;
                    i--;
                }
                else if(endColumn >= this.columns){
                    notPlaced = false;
                    i--;
                }else{
                    if(checkArray(tempBoard, [startRow,startColumn], [endRow, endColumn])){
                        notPlaced = false;
                        boatPos.push([[startRow,startColumn], [endRow, endColumn]]);
                        tempBoard = fillArray(tempBoard , [startRow,startColumn], [endRow, endColumn]);
                    }
                    else{
                        if(orientation == 0){
                            startColumn++;
                            endColumn++;
                        }
                        else{
                            startRow++;
                            endRow++;
                        }
                    }
                }

            }
        }
        return boatPos;
    }

    computerMove(gameboard){
        let notMoved = true;
        while(notMoved){
            let attackRow = Math.floor(Math.random() * this.rows);
            let attackColumn = Math.floor(Math.random() * this.columns);
            const exists = this._playerMoves.some(
            pair => pair[0] === attackRow && pair[1] === attackColumn
            );
            if(!exists){
                this._playerMoves.push([attackRow, attackColumn]);
                gameBoard.receiveAttack([attackRow, attackColumn]);
                notMoved = false;
            }
        }
    }

    playerMove(attack){
        let notMoved = true;
        let attackRow = attack[0];
        let attackColumn = attack[1];
        let attacked = false
        const exists = this._playerMoves.some(
            pair => pair[0] === attackRow && pair[1] === attackColumn
        );
        if(!exists){
            this._playerMoves.push([attackRow, attackColumn]);
            this._gameBoard.receiveAttack([attackRow, attackColumn]);
            attacked = true;
        }
        return attacked;
    }

    checkWin(gameboard){
        return gameboard.allShipsSunk();
    }

    setBoats(boats){
        if(this.type == "computer"){
            let boatPos = this.getBoatPositions(boats);
            for(let i = 0; i < boatPos.length; i++){
                this._gameBoard.placeBoat(boatPos[i][0], boatPos[i][1]);
            }
        }else{
            for(let i = 0; i < boats.length; i++){
                this._gameBoard.placeBoat(boats[i][0], boats[i][1]);
            }
        }
    }

    get gameboard(){
        return this._gameBoard;
    }
}

module.exports = { Player };