import Vehicle from '../../src/Simulation/Vehicle.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js';

describe("Vehicles", function() {

    it('can be created in factory', ()=>{
        var car = VehicleFactory.newCar();
        var newMotorcycle = VehicleFactory.newMotorcycle();
        var newVan = VehicleFactory.newVan();
        var newMiniBus = VehicleFactory.newMiniBus();
        var newBus = VehicleFactory.newBus();
        var newTruck = VehicleFactory.newTruck();

        expect(car).not.toBe(null);
        expect(newMotorcycle).not.toBe(null);
        expect(newVan).not.toBe(null);
        expect(newMiniBus).not.toBe(null);
        expect(newBus).not.toBe(null);
        expect(newTruck).not.toBe(null);
    });

    //TODO: Add test new breaking when approaching to exit
    //Check in model's documentation

    it('will slow down when approaching exit', () => {
        var car = VehicleFactory.newCar();
        car.setDestinationExit('N');
    });
});
