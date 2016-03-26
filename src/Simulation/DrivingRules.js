import Direction from './Specification/Direction.js';

class DrivingRules {

}

class Driver {
    constructor(drivingRules) {

    }
}

class DrivingSchool {
    static newRegularDriver() {
        return new Driver(new DrivingRules());
    }
}

export {Driver, DrivingRules, DrivingSchool};