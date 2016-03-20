
class Vehicle {

    constructor(lengthCells, maxSpeed, maxSpeedWhenTurning) {
        this._lengthCells = lengthCells;
        this._currentSpeed = 1;
        this._maxSpeed = maxSpeed;
        this._id = Math.round(Math.random()*16777215);
        this._currentCells = [];
        this._maxSpeedWhenTurning = maxSpeedWhenTurning;
    }

    maxSpeedWhenTurning() {
        return this._maxSpeedWhenTurning;
    }

    setDestinationExit(destinationExit) {
        this._destinationExit = destinationExit;
    }

    destinationExit() {
        return this._destinationExit;
    }

    currentSpeed() {
        return this._currentSpeed;
    }

    moveToNextIteration(cellsMap, cellsNeighbours) {
        if(cellsNeighbours.canTakeExit(this)) {
            cellsMap.takeExit(this);
            return;
        }

        if (cellsMap.nothingInFrontOf(this, this._currentSpeed+1)) {
            if (!this._isMovingWithMaxSpeed() && !this._isApproachingExit(cellsNeighbours)) {
                this._accelerate();
            }
        } else {
            var breakUpTo = this._distanceFromPrecedingVehicle(cellsMap);
            this._break(breakUpTo);
        }

        if (this._isApproachingExit(cellsNeighbours)) {
            if (this.currentSpeed() > this.maxSpeedWhenTurning()) {
                this._breakBy(1);
            }
        }
        cellsMap.moveVehicleBy(this, this._currentSpeed);
    }

    remove() {
        this._currentCells.forEach(cell => {
            cell.setVehicle(null);
        });
        this._currentCells = [];
    }

    moveToCells(cells) {
        if (cells.length != this.lengthCells()) {
            throw new Error("Vehicle received invalid directions!");
        }
        this._currentCells.forEach(cell => {
            cell.setVehicle(null);
        });
        cells.forEach(cell => {
           cell.setVehicle(this);
        });
        this._currentCells = cells;
    }

    currentCells() {
        return this._currentCells;
    }

    frontCell() {
        return this.currentCells()[0];
    }

    lengthCells() {
        return this._lengthCells;
    }

    id() {
        return this._id;
    }

    _isMovingWithMaxSpeed() {
        return this._currentSpeed == this._maxSpeed;
    }

    _accelerate() {
        if (this._currentSpeed < this._maxSpeed) {
            this._currentSpeed++;
        }
    }

    _break(to) {
        this._currentSpeed = to;
    }

    _breakBy(by) {
        if (this._currentSpeed - by > 0) {
            this._currentSpeed -= by;
        }
    }

    _distanceFromPrecedingVehicle(cellsMap) {
        var distanceNotEmpty = this._currentSpeed;
        while (!cellsMap.nothingInFrontOf(this, distanceNotEmpty)) {
            distanceNotEmpty--;
        }
        return distanceNotEmpty;
    }

    _isApproachingExit(cellsNeighbours) {
        return cellsNeighbours.isApproachingExit(this) && !this.frontCell().parentLane().isExitLane();

    }
}

export default Vehicle;
