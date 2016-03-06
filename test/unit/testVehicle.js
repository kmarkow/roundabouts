import Vehicle from '../../src/Simulation/Vehicle.js';

describe("Test vehicle", function() {

    it('Can construct vehicles', ()=>{
        var car = Vehicle.newCar();
        var newMotorcycle = Vehicle.newMotorcycle();
        var newVan = Vehicle.newVan();
        var newMiniBus = Vehicle.newMiniBus();
        var newBus = Vehicle.newBus();
        var newTruck = Vehicle.newTruck();

        expect(car).not.toBe(null);
        expect(newMotorcycle).not.toBe(null);
        expect(newVan).not.toBe(null);
        expect(newMiniBus).not.toBe(null);
        expect(newBus).not.toBe(null);
        expect(newTruck).not.toBe(null);
    });
});
