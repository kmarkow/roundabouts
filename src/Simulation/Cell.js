class Cell {
    constructor(parentLane, cellId) {
        this._parentLane = parentLane;
        this._cellId = cellId;
        this._taken = false;
    }

    parentLane() {
        return this._parentLane;
    }

    equals(anotherCell) {
        return this._parentLane == anotherCell._parentLane &&
               this._cellId == anotherCell._cellId;
    }

    setTaken(taken) {
        this._taken = taken;
    }

    isTaken() {
        return this._taken;
    }
}

export default Cell;
