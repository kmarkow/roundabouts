class Cell {
    constructor(parentLane, cellId) {
        this._parentLane = parentLane;
        this._cellId = cellId;

    }

    parentLane() {
        return this._parentLane;
    }

    equals(anotherCell) {
        return this._parentLane == anotherCell._parentLane &&
               this._cellId == anotherCell._cellId;
    }
}

export default Cell;
