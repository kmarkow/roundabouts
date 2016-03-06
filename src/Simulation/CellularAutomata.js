import Vehicle from './Vehicle.js';

class CellularAutomata {

    constructor(cellsMap) {
        var car1 = Vehicle.newCar();
        var car2 = Vehicle.newCar();
        var car3 = Vehicle.newCar();
        var car4 = Vehicle.newCar();
        var van = Vehicle.newVan();
        var truck = Vehicle.newTruck();
        this._vehicles = [
            car1,
            car2,
            car3,
            car4,
            truck,
            van
        ];
        this._cellsMap = cellsMap;
        this._cellsMap.addVehicle(car1, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(car2, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(car3, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(car4, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(truck, 1, Math.floor((Math.random() * 69) + 1));
        this._cellsMap.addVehicle(van, 1, Math.floor((Math.random() * 69) + 1));
    }

    nextIteration() {
        this._vehicles.forEach(vehicle => {
           vehicle.moveToNextIteration(this._cellsMap);
        });
        this._cellsMap.notifyAll();
    }
}

export default CellularAutomata;
