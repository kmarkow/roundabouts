import CellsNeighbours from '../../src/Simulation/CellsNeighbours.js';
import Cell from '../../src/Simulation/Cell.js';
import CellsLane from '../../src/Simulation/CellsLane.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js'
import {range} from '../../src/JsWhyYouNoImplement.js';
import Direction from '../../src/Simulation/Specification/Direction.js';

describe("Cells Neighbours", function() {

    it('accurately says when approaching exit on 2 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 10},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 30},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 50},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 70},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80]);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(1);
            car.setDestinationExit(carParamerers.destinationRoadId);
            car.setDestinationExitLaneId(0);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(true);
        });
    });

    it('accurately says when approaching exit on 3 lane roundabout', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 10},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 32},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 54},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 76},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80, 90]);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(2);
            car.setDestinationExit(carParamerers.destinationRoadId);
            car.setDestinationExitLaneId(0);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(true);
        });
    });

    it('accurately says when not approaching exit', () => {
        var carsParameters = [
            {"destinationRoadId": Direction.newNorth(), "frontCellId": 4},
            {"destinationRoadId": Direction.newWest(), "frontCellId": 22},
            {"destinationRoadId": Direction.newSouth(), "frontCellId": 24},
            {"destinationRoadId": Direction.newEast(), "frontCellId": 26},
        ];
        var cellsNeighbours = new CellsNeighbours([70, 80, 90]);
        carsParameters.forEach(carParamerers => {
            var car = VehicleFactory.newCar();
            spyOn(car, "currentSpeed").and.returnValue(5);
            spyOn(car, "frontCell").and.returnValue(new Cell(carParamerers.frontCellId));
            spyOn(car, "currentLaneId").and.returnValue(2);
            car.setDestinationExit(carParamerers.destinationRoadId);
            car.setDestinationExitLaneId(0);
            expect(cellsNeighbours.isApproachingExit(car)).toBe(false);
        });
    });

    it('accurately says when can take exit', () => {
        var outerCellsLane = CellsLane.newLane(1, 80);
        var cellsNeighbours = new CellsNeighbours([70, 80]);
        var car1 = VehicleFactory.newCar();
        car1.setDestinationExit(Direction.newNorth());
        car1.setDestinationExitLaneId(0);
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
