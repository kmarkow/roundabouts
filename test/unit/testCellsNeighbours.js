import CellsNeighbours from '../../src/Simulation/CellsNeighbours.js';
import Cell from '../../src/Simulation/Cell.js';
import CellsLane from '../../src/Simulation/CellsLane.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js'
import {range} from '../../src/JsWhyYouNoImplement.js';
import Direction from '../../src/Simulation/Specification/Direction.js';
import {DrivingRules} from '../../src/Simulation/DrivingRules.js';
import Path from '../../src/Simulation/Path.js';

describe("Cells Neighbours", function() {

    var drivingRules;

    beforeEach(()=>{
        drivingRules = DrivingRules.newRules1(2);
    });

    it('accurately says when approaching entrance', () =>{
        var testCases = [
            {"speed": 4, cellId: 4, isApproaching: true},
            {"speed": 3, cellId: 4, isApproaching: false},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);

        testCases.forEach(testCase => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(testCase["speed"]);
            spyOn(car, "frontCell").and.returnValue(new Cell(testCase["cellId"]));
            expect(cellsNeighbours.isApproachingRoundabout(car)).toEqual(testCase["isApproaching"]);
        });
    });

    it('accurately says when approached entrance', () => {
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        var car = VehicleFactory.newCar(drivingRules);
        var cell = new Cell(13);
        cell.assignToLane(new CellsLane("FAKE_ENTRANCE_LANE", [], false));
        spyOn(car, "frontCell").and.returnValue(cell);
        expect(cellsNeighbours.approachedEntrance(car)).toEqual(true);
    });

    it('accurately returns entrance cells', () => {
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        expect(cellsNeighbours.firstCellNumberOnEntrance('N', 1, 1)).toEqual(21);
        expect(cellsNeighbours.firstCellNumberOnEntrance('N', 0, 1)).toEqual(22);
        expect(cellsNeighbours.firstCellNumberOnEntrance('N', 1, 0)).toEqual(17);
        expect(cellsNeighbours.firstCellNumberOnEntrance('N', 0, 0)).toEqual(18);
    });


    it('accurately says when approaching any exit', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 10},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 30},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 50},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 70},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(1);
            var path = new Path(null, null, null, carParamerers.destinationRoadId, 0);
            car.setPath(path);
            expect(cellsNeighbours.isApproachingAnyExit(car)).toBe(true);
        });
    });

    it('accurately says closest exits', () => {
        var testCases = [
            {"closestExit": Direction.newNorth(), "frontCellId": 10},
            {"closestExit": Direction.newWest(), "frontCellId": 30},
            {"closestExit": Direction.newSouth(), "frontCellId": 50},
            {"closestExit": Direction.newEast(), "frontCellId": 70},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        testCases.forEach(testCase => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(testCase.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(1);
            var path = new Path(null, null, null, Direction.newEast(), 0);
            car.setPath(path);
            expect(cellsNeighbours.closestExitId(car)).toBe(testCase.closestExit.id());
        });
    });

    it('accurately says when not approaching any exit', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 2},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 22},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 42},
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 62},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(1);
            var path = new Path(null, null, null, carParamerers.destinationRoadId, 0);
            car.setPath(path);
            expect(cellsNeighbours.isApproachingAnyExit(car)).toBe(false);
        });
    });

    it('accurately says when approaching exit on 2 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 10},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 30},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 50},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 70},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(1);
            var path = new Path(null, null, null, carParamerers.destinationRoadId, 0);
            car.setPath(path);
            expect(cellsNeighbours.isApproachingDestinationExit(car)).toBe(true);
        });
    });

    it('accurately says when approaching exit on 3 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 10},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 32},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 54},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 76},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80, 90], 2, 14);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar(DrivingRules.newRules1(3));
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(2);
            var path = new Path(null, null, null, carParamerers.destinationRoadId, 0);
            car.setPath(path);
            expect(cellsNeighbours.isApproachingDestinationExit(car)).toBe(true);
        });
    });

    it('accurately says when not approaching exit', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 4},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 22},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 24},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 26},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80, 90], 2, 14);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar(drivingRules);
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(2);
            var path = new Path(null, null, null, carParamerers.destinationRoadId, 0);
            car.setPath(path);
            expect(cellsNeighbours.isApproachingDestinationExit(car)).toBe(false);
        });
    });

    it('accurately says when can take exit', () => {
        var outerCellsLane = CellsLane.newLane(1, 80);
        var cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        var car1 = VehicleFactory.newCar(drivingRules);
        var path = new Path(null, null, null, Direction.newNorth(), 0);
        car1.setPath(path);
        var vehicleCells = Array.from(range(16, car1.lengthCells()), cellNumber => {
            var cell = new Cell(cellNumber);
            cell.assignToLane(outerCellsLane);
            return cell;
        });
        vehicleCells.reverse();
        spyOn(car1, "currentCells").and.returnValue(vehicleCells);
        spyOn(car1, "frontCell").and.returnValue(vehicleCells[0]);
        spyOn(car1, "currentLaneId").and.returnValue(1);

        expect(cellsNeighbours.approachedExit(car1)).toBe(true);
    });
});
