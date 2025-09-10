class BattleShip{
    constructor(length){
        this._length = length;
        this._hits = 0;
        this._sunken = false;
    }

    hit(){
        if(!this.isSunk()){
            this._hits++;
            if(this._hits == this._length){
                this._sunken = true;
            }
        }
        return this._hits;
    }

    isSunk(){
        return this._sunken;
    }

    get hits(){
        return this._hits;
    }

    get length(){
        return this._length;
    }
}

module.exports = { BattleShip };