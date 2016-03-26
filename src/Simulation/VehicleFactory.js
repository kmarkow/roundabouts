import Vehicle from './Vehicle.js';
import {Driver, DrivingSchool} from './DrivingRules.js';
import Direction from './Specification/Direction.js';

class VehicleFactory {

    static newCar(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(2, 5, 2, driver);
    }

    static newMotorcycle(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(1, 5, 2, driver);
    }

    static newVan(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(3, 5, 2, driver);
    }

    static newMiniBus(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(4, 3, 2, driver);
    }

    static newBus(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(5, 2, 1, driver);
    }

    static newTruck(driver) {
        if (!driver) {
            driver = DrivingSchool.newRegularDriver();
        }
        return new Vehicle(5, 2, 1, driver);
    }
}

export default VehicleFactory;
