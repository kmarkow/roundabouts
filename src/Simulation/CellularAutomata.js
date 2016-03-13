import Vehicle from './Vehicle.js';
import VehicleFactory from './VehicleFactory.js';
import {ExitRoadEnd} from './CellsMap.js';

class CellularAutomata {

    constructor(cellsMap, cellsNeighbours) {
        var car1 = VehicleFactory.newCar();
        car1.setDestinationExit('N');
        var car2 = VehicleFactory.newCar();
        car2.setDestinationExit('N');
        var car3 = VehicleFactory.newCar();
        car3.setDestinationExit('N');
        var car4 = VehicleFactory.newCar();
        car4.setDestinationExit('N');
        var van = VehicleFactory.newVan();
        van.setDestinationExit('N');
        var truck = VehicleFactory.newTruck();
        truck.setDestinationExit('N');
        this._vehicles = [
            car1,
            car2,
            car3,
            car4,
            truck,
            van
        ];
        this._cellsMap = cellsMap;
        this._cellsMap.addVehicle(car1, 1, 0);
        this._cellsMap.addVehicle(car2, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(car3, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(car4, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(van, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(truck, 1, Math.floor((Math.random() * 69) + 1));
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
