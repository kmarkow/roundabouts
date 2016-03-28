import Direction from '../../src/Simulation/Specification/Direction.js';
import {DrivingRules, ExitRule1} from '../../src/Simulation/DrivingRules.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js'

describe("Rule", function() {

    var drivingRules;

    beforeEach(()=>{
        drivingRules = DrivingRules.newRules1(2);
    });

    function givenCarOnOuterLane(directionExit, exitLaneId=1) {
        var car_outer_lane = VehicleFactory.newCar(drivingRules);
        car_outer_lane.setDestinationExit(directionExit);
        car_outer_lane.setDestinationExitLaneId(exitLaneId);
        spyOn(car_outer_lane, "currentLaneId").and.returnValue(1);
        return car_outer_lane;
    }

    function givenCarOnMiddleLane(directionExit, exitLaneId=1) {
        var car_middle_lane = VehicleFactory.newCar(drivingRules);
        car_middle_lane.setDestinationExit(directionExit);
        car_middle_lane.setDestinationExitLaneId(exitLaneId);
        spyOn(car_middle_lane, "currentLaneId").and.returnValue(0);
        return car_middle_lane;
    }

    it('exit rule #1 middle-left yields to outer-left', () => {
        var exitRules = new ExitRule1(2);
        var cars_exit = Direction.newNorth();
        var car_outer_lane = givenCarOnOuterLane(cars_exit);
        var car_middle_lane = givenCarOnMiddleLane(cars_exit);

        expect(exitRules.shouldYieldTo(car_middle_lane, car_outer_lane)).toBe(true);
        expect(exitRules.shouldYieldTo(car_outer_lane, car_middle_lane)).toBe(false);
    });

    it('exit rule #1 middle-left yields to outer-outer', () => {
        var exitRules = new ExitRule1(2);
        var north_exit = Direction.newNorth();
        var west_exit = Direction.newWest();
        var car_outer_lane = givenCarOnOuterLane(west_exit);
        var car_middle_lane = givenCarOnMiddleLane(north_exit);

        expect(exitRules.shouldYieldTo(car_middle_lane, car_outer_lane)).toBe(true);
        expect(exitRules.shouldYieldTo(car_outer_lane, car_middle_lane)).toBe(false);
    });

    it('exit rule #1 middle-left does not yield to outer-right', () => {
        var exitRules = new ExitRule1(2);
        var cars_exit = Direction.newNorth();
        var car_outer_lane = givenCarOnOuterLane(cars_exit, 1);
        var car_middle_lane = givenCarOnMiddleLane(cars_exit, 0);

        expect(exitRules.shouldYieldTo(car_middle_lane, car_outer_lane)).toBe(false);
        expect(exitRules.shouldYieldTo(car_outer_lane, car_middle_lane)).toBe(false);
    });
});