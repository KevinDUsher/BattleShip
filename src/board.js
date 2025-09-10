const { BattleShip } = require("./battleship");

class Gameboard{
    constructor(rows, columns){
        this._rows = rows;
        this._columns = columns;
        this._boats = [];
        this._boatPositions = [];
        this._hits = [];
        this._misses = [];
    }

    placeBoat(pos1, pos2){
        if(pos1[0] < 0 || pos1[1] < 0 || pos1[0] > (this._rows - 1) || pos1[1] > (this._columns - 1)
        || pos2[0] < 0 || pos2[1] < 0 || pos2[0] > (this._rows - 1) || pos2[1] > (this._columns - 1)){
            return null;
        }
        let length;
        let pushPositions = [];
        let start;
        if(pos1[0] == pos2[0]){
            length = Math.abs(pos1[1] - pos2[1]) + 1;
            if(pos1[1] <= pos2[1]){
                start = pos1[1];
            }else{
                start = pos2[1];
            }
            for(let i = 0; i < length; i++){
                pushPositions.push([pos1[0], start+i]);
            }
        }else{
            length = Math.abs(pos1[0] - pos2[0]) + 1;
            if(pos1[0] <= pos2[0]){
                start = pos1[0];
            }else{
                start = pos2[0];
            }
            for(let i = 0; i < length; i++){
                pushPositions.push([start+i, pos1[1]]);
            }
        }
        this._boats.push(new BattleShip(length));
        this._boatPositions.push(pushPositions);
        return pushPositions;
    }

    receiveAttack(attack){
        let boat = null;
        let hit = false;
        for(let x = 0; x < this._boatPositions.length; x++){
            for(let y = 0; y < this._boatPositions[x].length; y++){
                let position = this._boatPositions[x][y];
                if(position[0] == attack[0] && position[1] == attack[1]){
                    hit = true;
                    this._boats[x].hit();
                    this._hits.push(attack);
                    return hit;
                }
            }
        }
        this._misses.push(attack);
        return hit;
    }

    getMisses(){
        return this._misses;
    }

    getHits(){
        return this._hits;
    }

    allShipsSunk(){
        let allSunk = true;
        for(let i = 0; i < this._boats.length; i++){
            if(!this._boats[i].isSunk()){
                allSunk = false;
            }
        }
        return allSunk;
    }

    get boats(){
        return this._boats;
    }
}

module.exports = { Gameboard };