class Cell {
    constructor(cellId) {
        this._parentLane = null;
        this._cellId = cellId;
        this._vehicle = false;
    }

    setVehicle(vehicle) {
        if (vehicle && !this.isEmpty()) {
            throw new Error("Vehicle " + vehicle.toString() + " crashed onto " + this._vehicle.toString());
        }
        this._vehicle = vehicle;
    }

    vehicle() {
        return this._vehicle;
    }

    isEmpty() {
        return !this._vehicle;
    }

    id() {
        if (this.parentLane()) {
            return this.parentLane().id().toString() + this._cellId.toString();
        }
        throw new Error("Cannot generate id until a lane is not assigned");
    }

    assignToLane(lane) {
        if (this._parentLane) {
            throw new Error("Cannot reassign cell to another lane");
        }
        this._parentLane = lane;
    }

    parentLane() {
        if (!this._parentLane) {
            throw new Error("Cell unassigned to lane");
        }
        return this._parentLane;
    }

    equals(anotherCell) {
        return this.id() == anotherCell.id();
    }

    number() {
        return this._cellId;
    }
}

export default Cell;
