import CellsNeighbours from '../../src/Simulation/CellsNeighbours.js';
import Cell from '../../src/Simulation/Cell.js';
import CellsLane from '../../src/Simulation/CellsLane.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js'
import {range} from '../../src/JsWhyYouNoImplement.js';

describe("Cells Neighbours", function() {

    it('accurately says when approaching exit on 2 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": "N", "frontCellId": 10},
            {"destinationRoadId": "W", "frontCellId": 30},
            {"destinationRoadId": "S", "frontCellId": 50},
            {"destinationRoadId": "E", "frontCellId": 70},
        ];
        var cellsNeighbours = new CellsNeighbours(80);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            car.setDestinationExit(carParamerers.destinationRoadId);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(true);
        });
    });

    it('accurately says when approaching exit on 3 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": "N", "frontCellId": 10},
            {"destinationRoadId": "W", "frontCellId": 32},
            {"destinationRoadId": "S", "frontCellId": 54},
            {"destinationRoadId": "E", "frontCellId": 76},
        ];
        var cellsNeighbours = new CellsNeighbours(90);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            car.setDestinationExit(carParamerers.destinationRoadId);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(true);
        });
    });

    it('accurately says when not approaching exit', () => {
        var carsParameters = [
            {"destinationRoadId": "N", "frontCellId": 4},
            {"destinationRoadId": "W", "frontCellId": 22},
            {"destinationRoadId": "S", "frontCellId": 24},
            {"destinationRoadId": "E", "frontCellId": 26},
        ];
        var cellsNeighbours = new CellsNeighbours(90);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            car.setDestinationExit(carParamerers.destinationRoadId);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(false);
        });
    });

    it('accurately says when can take exit', () => {
        var outerCellsLane = CellsLane.newLane(1, 80);
        var cellsNeighbours = new CellsNeighbours(80);
        var car1 = VehicleFactory.newCar();
        car1.setDestinationExit('N');
        var vehicleCells = Array.from(range(16, car1.lengthCells()), cellNumber => {
            var cell = new Cell(cellNumber);
            cell.assignToLane(outerCellsLane);
            return cell;
        });
        vehicleCells.reverse();
        spyOn(car1, "currentCells").and.returnValue(vehicleCells);
        spyOn(car1, "frontCell").and.returnValue(vehicleCells[0]);

        expect(cellsNeighbours.canTakeExit(car1)).toBe(true);
    });
});
