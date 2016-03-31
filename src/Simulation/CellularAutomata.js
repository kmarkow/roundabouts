import Vehicle from './Vehicle.js';
import VehicleFactory from './VehicleFactory.js';
import {ExitRoadEnd} from './CellsMap.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Direction from './Specification/Direction.js';

class CellularAutomata {

    constructor(cellsMap, cellsNeighbours, drivingRules) {
        this._cellsMap = cellsMap;
        this._cellsNeighbours = cellsNeighbours;
        this._drivingRules = drivingRules;
        var randomNumberGenerator = new RandomNumberGenerator();
        this._vehicles = [
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newVan(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules)
        ];

        this._vehicles.forEach(vehicle => {
            vehicle.setPath(drivingRules.randomPath());
            this._cellsMap.addVehicle(
                vehicle,
                `${vehicle.entranceRoadId()}_ENTRANCE_${vehicle.entranceLaneId()}`,
                randomNumberGenerator.intFromTo(vehicle.lengthCells(), 13-vehicle.lengthCells())
            );
        });
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
