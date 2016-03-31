import Vehicle from './Vehicle.js';
import VehicleFactory from './VehicleFactory.js';
import {ExitRoadEnd} from './CellsMap.js';
import Direction from './Specification/Direction.js';
import { range } from '../JsWhyYouNoImplement.js';
import Path from './Path.js';

class VehicleQueue {
    constructor() {
        this._vehicles = [];
    }

    addVehicle(vehicle) {
        this._vehicles.push(vehicle);
    }

    nextVehicle() {
        return this._vehicles.pop();
    }
}

class CellularAutomata {

    constructor(cellsMap, cellsNeighbours, drivingRules, ingoingLanesCount) {
        this._cellsMap = cellsMap;
        this._cellsNeighbours = cellsNeighbours;
        this._drivingRules = drivingRules;
        this._vehicles = [];
        
        var vehicles = [
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newCar(this._drivingRules),
            VehicleFactory.newVan(this._drivingRules),
            VehicleFactory.newVan(this._drivingRules),
            VehicleFactory.newVan(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
            VehicleFactory.newTruck(this._drivingRules),
        ];
        //vehicles[0].setPath(new Path(
        //    Direction.newNorth(),
        //    1,
        //    1,
        //    Direction.newWest(),
        //    1
        //));
        //vehicles[1].setPath(new Path(
        //    Direction.newNorth(),
        //    0,
        //    0,
        //    Direction.newWest(),
        //    1
        //));
        vehicles.forEach(vehicle => {
            vehicle.setPath(drivingRules.randomPath());
        });


        this._vehiclesQueues = new Map();
        Direction.allDirections().forEach(entranceRoadDirection => {
            range(0, ingoingLanesCount).forEach(entranceLaneId => {
                this._vehiclesQueues.set(
                    `${entranceRoadDirection.id()}_ENTRANCE_${entranceLaneId}`,
                    new VehicleQueue()
                );
            });
        });

        vehicles.forEach(vehicle => {
            var queue = this._vehiclesQueues.get(`${vehicle.entranceRoadId()}_ENTRANCE_${vehicle.entranceLaneId()}`);
            queue.addVehicle(vehicle);
        });
        this._addVehiclesFromQueue();
    }

    nextIteration() {
        this._moveVehicles();
        this._addVehiclesFromQueue();
        this._cellsMap.notifyAll();
    }

    _moveVehicles() {
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
    }

    _addVehiclesFromQueue() {
        this._vehiclesQueues.forEach((queue, queueLane) => {
            var vehicle = queue.nextVehicle();
            if (vehicle) {
                if (this._cellsMap.nothingOnEntrance(queueLane, vehicle.lengthCells())) {
                    this._vehicles.push(vehicle);
                    this._cellsMap.addVehicle(vehicle, queueLane, vehicle.lengthCells() - 1);
                } else {
                    queue.addVehicle(vehicle);
                }
            }
        });
    }
}

export default CellularAutomata;
