
class Vehicle {

    constructor(lengthCells, maxSpeed) {
        this._lengthCells = lengthCells;
        this._currentSpeed = 1;
        this._maxSpeed = maxSpeed;
        this._id = Math.round(Math.random()*1000000);
    }

    moveToNextIteration(cellsMap) {
        if (cellsMap.nothingInFrontOf(this, this._currentSpeed)) {
            if (!this._isMovingWithMaxSpeed()) {
                this._accelerate()
            }
        } else {
            var breakUpTo = this._distanceFromPrecedingVehicle(cellsMap);
            this._break(breakUpTo);
        }

        cellsMap.moveVehicleBy(this, this._currentSpeed);
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

    _distanceFromPrecedingVehicle(cellsMap) {
        var distanceNotEmpty = this._currentSpeed;
        while (!cellsMap.nothingInFrontOf(this, distanceNotEmpty)) {
            distanceNotEmpty--;
        }
        return distanceNotEmpty;
    }

    static newCar() {
        return new Vehicle(2, 5);
    }

    static newMotorcycle() {
        return new Vehicle(1, 5);
    }

    static newVan() {
        return new Vehicle(3, 5);
    }

    static newMiniBus() {
        return new Vehicle(4, 3);
    }

    static newBus() {
        return new Vehicle(5, 2);
    }

    static newTruck() {
        return new Vehicle(5, 2);
    }
}

export default Vehicle;
