import RandomNumberGenerator from './RandomNumberGenerator.js';

class Vehicle {

    constructor(lengthCells, maxSpeed, maxSpeedWhenTurning, driver) {
        this._lengthCells = lengthCells;
        this._currentSpeed = 1;
        this._maxSpeed = maxSpeed;
        this._id = Math.round(Math.random()*16777215);
        this._currentCells = [];
        this._maxSpeedWhenTurning = maxSpeedWhenTurning;
        this._driver = driver;
    }

    maxSpeedWhenTurning() {
        return this._maxSpeedWhenTurning;
    }

    setDestinationExit(destinationExit) {
        this._destinationExit = destinationExit;
    }

    destinationExit() {
        return this._destinationExit.id();
    }

    currentSpeed() {
        return this._currentSpeed;
    }

    currentLaneId() {
        return this.frontCell().parentLane().id();
    }

    setDestinationExitLaneId(destinationExitLaneId) {
        this._destinationExitLaneId = destinationExitLaneId;
    }

    destinationExitLaneId() {
        return this._destinationExitLaneId;
    }

    moveToNextIteration(cellsMap, cellsNeighbours) {
        //Taking exit
        if(cellsNeighbours.approachedExit(this)) {
            if (!cellsMap.exitLaneEmpty(this, this._currentSpeed)) {
                this._stop();
                return;
            }
            var vehicleOnTheRight = cellsMap.vehicleOnTheRight(this);
            // TODO: && this._drivingRules.shouldYieldTo(this, vehicleOnTheRight)) { Check if vehicle on right is taking left lane or going straight
            if (vehicleOnTheRight ) {
                this._stop();
            } else {
                if (this._hasStopped()) {
                    this._accelerate(this.maxSpeedWhenTurning());
                }
            cellsMap.takeExit(this);
            }
            return;
        }

        //Going around roundabout
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

    _accelerate(by=1) {
        if (this._currentSpeed+by < this._maxSpeed) {
            this._currentSpeed+=by;
        } else {
            this._currentSpeed = this._maxSpeed;
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

    _stop() {
        this._break(0);
    }

    _hasStopped() {
        return this._currentSpeed == 0;
    }

    _distanceFromPrecedingVehicle(cellsMap) {
        var distanceNotEmpty = this._currentSpeed;
        while (!cellsMap.nothingInFrontOf(this, distanceNotEmpty)) {
            distanceNotEmpty--;
        }
        return distanceNotEmpty;
    }

    _isApproachingExit(cellsNeighbours) {
        return cellsNeighbours.isApproachingExit(this) &&
            !this.frontCell().parentLane().isExitLane();
    }
}

export default Vehicle;
