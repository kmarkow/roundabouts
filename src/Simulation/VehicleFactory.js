import Vehicle from './Vehicle.js';
import Direction from './Specification/Direction.js';

class VehicleFactory {

    static newCar(drivingRules) {
        return new Vehicle(2, 5, 2, drivingRules);
    }

    static newMotorcycle(drivingRules) {
        return new Vehicle(1, 5, 2, drivingRules);
    }

    static newVan(drivingRules) {
        return new Vehicle(3, 5, 2, drivingRules);
    }

    static newMiniBus(drivingRules) {
        return new Vehicle(4, 3, 2, drivingRules);
    }

    static newBus(drivingRules) {
        return new Vehicle(5, 2, 1, drivingRules);
    }

    static newTruck(drivingRules) {
        return new Vehicle(5, 2, 1, drivingRules);
    }
}

export default VehicleFactory;
