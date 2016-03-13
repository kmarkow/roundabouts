import Vehicle from './Vehicle.js';

class VehicleFactory {
    static newCar() {
        return new Vehicle(2, 5, 2);
    }

    static newMotorcycle() {
        return new Vehicle(1, 5, 2);
    }

    static newVan() {
        return new Vehicle(3, 5, 2);
    }

    static newMiniBus() {
        return new Vehicle(4, 3, 2);
    }

    static newBus() {
        return new Vehicle(5, 2, 1);
    }

    static newTruck() {
        return new Vehicle(5, 2, 1);
    }
}

export default VehicleFactory;
