import Vehicle from './Vehicle.js';
import VehicleFactory from './VehicleFactory.js';
import {ExitRoadEnd} from './CellsMap.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Direction from './Specification/Direction.js';

class CellularAutomata {

    constructor(cellsMap, cellsNeighbours) {
        var randomNumberGenerator = new RandomNumberGenerator();

        this._vehicles = [
            VehicleFactory.newCar(),
            VehicleFactory.newCar(),
            VehicleFactory.newCar(),
            VehicleFactory.newCar(),
            VehicleFactory.newVan(),
            VehicleFactory.newTruck()
        ];
        this._vehicles.forEach(vehicle => {
           vehicle.setDestinationExit(Direction.newNorth());
           vehicle.setDestinationExitLaneId(randomNumberGenerator.intFromTo(0, 1));
        });
        this._vehicles[0].setDestinationExitLaneId(1);
        this._vehicles[1].setDestinationExitLaneId(1);

        this._cellsMap = cellsMap;
        this._cellsMap.addVehicle(this._vehicles[0], 0, randomNumberGenerator.intFromTo(0, 69));
        this._cellsMap.addVehicle(this._vehicles[1], 0, randomNumberGenerator.intFromTo(0, 69));
        this._cellsMap.addVehicle(this._vehicles[2], 1, randomNumberGenerator.intFromTo(0, 69));
        this._cellsMap.addVehicle(this._vehicles[3], 1, randomNumberGenerator.intFromTo(0, 69));
        this._cellsMap.addVehicle(this._vehicles[4], 1, randomNumberGenerator.intFromTo(0, 69));
        this._cellsMap.addVehicle(this._vehicles[5], 1, randomNumberGenerator.intFromTo(0, 69));
        this._cellsNeighbours = cellsNeighbours;
    }

    nextIteration() {
        this._vehicles.forEach(vehicle => {
            try {
                vehicle.moveToNextIteration(this._cellsMap, this._cellsNeighbours);
            } catch (e) {
                if (e instanceof ExitRoadEnd) {
                    vehicle.remove();
                    this._vehicles.splice(this._vehicles.indexOf(vehicle), 1);
                } else {
                    throw e;
                }
            }
        });
        this._cellsMap.notifyAll();
    }
}

export default CellularAutomata;
