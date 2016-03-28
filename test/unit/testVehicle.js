import Vehicle from '../../src/Simulation/Vehicle.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js';
import {DrivingRules} from '../../src/Simulation/DrivingRules.js';

describe("Vehicles", function() {

    var drivingRules;

    beforeEach(()=>{
        drivingRules = DrivingRules.newRules1(2);
    });

    it('can be created in factory', ()=>{
        var car = VehicleFactory.newCar(drivingRules);
        var newMotorcycle = VehicleFactory.newMotorcycle(drivingRules);
        var newVan = VehicleFactory.newVan(drivingRules);
        var newMiniBus = VehicleFactory.newMiniBus(drivingRules);
        var newBus = VehicleFactory.newBus(drivingRules);
        var newTruck = VehicleFactory.newTruck(drivingRules);

        expect(car).not.toBe(null);
        expect(newMotorcycle).not.toBe(null);
        expect(newVan).not.toBe(null);
        expect(newMiniBus).not.toBe(null);
        expect(newBus).not.toBe(null);
        expect(newTruck).not.toBe(null);
    });
});
