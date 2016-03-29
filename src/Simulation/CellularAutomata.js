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
            VehicleFactory.newVan(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules)
        ];
        this._vehicles.forEach(vehicle => {
           vehicle.setDestinationExit(Direction.newNorth());
           vehicle.setDestinationExitLaneId(randomNumberGenerator.intFromTo(0, 1));
        });

        var directions = Direction.allDirections();
        this._vehicles.forEach(vehicle => {
            var entranceRoad = directions[Math.floor(Math.random()*directions.length)];
            var entranceLaneId = randomNumberGenerator.intFromTo(0, 1);
            var roundaboutLaneId = randomNumberGenerator.intFromTo(0, 1);
            var exitRoad = directions[Math.floor(Math.random()*directions.length)];
            var exitLaneId = randomNumberGenerator.intFromTo(0, 1);
            vehicle.setEntranceRoad(entranceRoad);
            vehicle.setEntranceLaneId(entranceLaneId);
            vehicle.setRoundaboutLaneId(roundaboutLaneId);
            vehicle.setDestinationExit(exitRoad);
            vehicle.setDestinationExitLaneId(exitLaneId);
            this._cellsMap.addVehicle(
                vehicle,
                `${entranceRoad.id()}_ENTRANCE_${entranceLaneId}`,
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
