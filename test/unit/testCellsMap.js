import { CellsMap } from '../../src/Simulation/CellsMap.js';
import Cell from '../../src/Simulation/Cell.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';
import VehicleFactory from '../../src/Simulation/VehicleFactory.js';
import CellsNeighbours from '../../src/Simulation/CellsNeighbours.js';
import { range } from '../../src/JsWhyYouNoImplement.js';
import Direction from '../../src/Simulation/Specification/Direction.js';
import {DrivingRules} from '../../src/Simulation/DrivingRules.js';
import Path from '../../src/Simulation/Path.js';

describe("Test roundabout cells map", function() {

    var unitConverter;
    var cellsMap;
    var cellsNeighbours;
    var drivingRules;

    beforeEach(()=>{
        unitConverter  = new UnitConverter(
            0,
            800
        );
        cellsMap = new CellsMap(roundaboutBukowe, unitConverter);
        cellsNeighbours = new CellsNeighbours([70, 80], 2, 14);
        drivingRules = DrivingRules.newRules1(2);
    });

    it('Accurately says if there is nothing in front of a vehicle', () => {

        var car1 = VehicleFactory.newCar(drivingRules);
        var car2 = VehicleFactory.newCar(drivingRules);

        var distanceBetweenCar1And2 = 1;
        cellsMap.addVehicle(car1, 0, distanceBetweenCar1And2 + car1.lengthCells());
        cellsMap.addVehicle(car2, 0, 0);

        expect(cellsMap.nothingInFrontOf(car1, 2)).toBe(true);
        expect(cellsMap.nothingInFrontOf(car2, distanceBetweenCar1And2 + 1)).toBe(false);
        expect(cellsMap.nothingInFrontOf(car2, distanceBetweenCar1And2)).toBe(true);
    });

    it('lets a truck enter and leave roundabout', () => {
        var iterations = [
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 6},
                {laneId: 'N_ENTRANCE_1', cellNumber: 5},
                {laneId: 'N_ENTRANCE_1', cellNumber: 4},
                {laneId: 'N_ENTRANCE_1', cellNumber: 3},
                {laneId: 'N_ENTRANCE_1', cellNumber: 2},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 8},
                {laneId: 'N_ENTRANCE_1', cellNumber: 7},
                {laneId: 'N_ENTRANCE_1', cellNumber: 6},
                {laneId: 'N_ENTRANCE_1', cellNumber: 5},
                {laneId: 'N_ENTRANCE_1', cellNumber: 4},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 10},
                {laneId: 'N_ENTRANCE_1', cellNumber: 9},
                {laneId: 'N_ENTRANCE_1', cellNumber: 8},
                {laneId: 'N_ENTRANCE_1', cellNumber: 7},
                {laneId: 'N_ENTRANCE_1', cellNumber: 6},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 12},
                {laneId: 'N_ENTRANCE_1', cellNumber: 11},
                {laneId: 'N_ENTRANCE_1', cellNumber: 10},
                {laneId: 'N_ENTRANCE_1', cellNumber: 9},
                {laneId: 'N_ENTRANCE_1', cellNumber: 8},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 13},
                {laneId: 'N_ENTRANCE_1', cellNumber: 12},
                {laneId: 'N_ENTRANCE_1', cellNumber: 11},
                {laneId: 'N_ENTRANCE_1', cellNumber: 10},
                {laneId: 'N_ENTRANCE_1', cellNumber: 9},
            ],
            [
                {laneId: 0, cellNumber: 20},
                {laneId: 'N_ENTRANCE_1', cellNumber: 13},
                {laneId: 'N_ENTRANCE_1', cellNumber: 12},
                {laneId: 'N_ENTRANCE_1', cellNumber: 11},
                {laneId: 'N_ENTRANCE_1', cellNumber: 10},
            ],
            [
                {laneId: 0, cellNumber: 22},
                {laneId: 0, cellNumber: 21},
                {laneId: 0, cellNumber: 20},
                {laneId: 'N_ENTRANCE_1', cellNumber: 13},
                {laneId: 'N_ENTRANCE_1', cellNumber: 12},
            ],
            [
                {laneId: 0, cellNumber: 24},
                {laneId: 0, cellNumber: 23},
                {laneId: 0, cellNumber: 22},
                {laneId: 0, cellNumber: 21},
                {laneId: 0, cellNumber: 20},
            ],
            [
                {laneId: 0, cellNumber: 26},
                {laneId: 0, cellNumber: 25},
                {laneId: 0, cellNumber: 24},
                {laneId: 0, cellNumber: 23},
                {laneId: 0, cellNumber: 22},
            ],
            [
                {laneId: 0, cellNumber: 28},
                {laneId: 0, cellNumber: 27},
                {laneId: 0, cellNumber: 26},
                {laneId: 0, cellNumber: 25},
                {laneId: 0, cellNumber: 24},
            ],
            [
                {laneId: 0, cellNumber: 30},
                {laneId: 0, cellNumber: 29},
                {laneId: 0, cellNumber: 28},
                {laneId: 0, cellNumber: 27},
                {laneId: 0, cellNumber: 26},
            ],
            [
                {laneId: 0, cellNumber: 32},
                {laneId: 0, cellNumber: 31},
                {laneId: 0, cellNumber: 30},
                {laneId: 0, cellNumber: 29},
                {laneId: 0, cellNumber: 28},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 1},
                {laneId: 'W_EXIT_0', cellNumber: 0},
                {laneId: 0, cellNumber: 32},
                {laneId: 0, cellNumber: 31},
                {laneId: 0, cellNumber: 30},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 3},
                {laneId: 'W_EXIT_0', cellNumber: 2},
                {laneId: 'W_EXIT_0', cellNumber: 1},
                {laneId: 'W_EXIT_0', cellNumber: 0},
                {laneId: 0, cellNumber: 32},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 5},
                {laneId: 'W_EXIT_0', cellNumber: 4},
                {laneId: 'W_EXIT_0', cellNumber: 3},
                {laneId: 'W_EXIT_0', cellNumber: 2},
                {laneId: 'W_EXIT_0', cellNumber: 1},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 7},
                {laneId: 'W_EXIT_0', cellNumber: 6},
                {laneId: 'W_EXIT_0', cellNumber: 5},
                {laneId: 'W_EXIT_0', cellNumber: 4},
                {laneId: 'W_EXIT_0', cellNumber: 3},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 9},
                {laneId: 'W_EXIT_0', cellNumber: 8},
                {laneId: 'W_EXIT_0', cellNumber: 7},
                {laneId: 'W_EXIT_0', cellNumber: 6},
                {laneId: 'W_EXIT_0', cellNumber: 5},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 11},
                {laneId: 'W_EXIT_0', cellNumber: 10},
                {laneId: 'W_EXIT_0', cellNumber: 9},
                {laneId: 'W_EXIT_0', cellNumber: 8},
                {laneId: 'W_EXIT_0', cellNumber: 7},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 13},
                {laneId: 'W_EXIT_0', cellNumber: 12},
                {laneId: 'W_EXIT_0', cellNumber: 11},
                {laneId: 'W_EXIT_0', cellNumber: 10},
                {laneId: 'W_EXIT_0', cellNumber: 9},
            ]
        ];

        var truck = VehicleFactory.newTruck(drivingRules);
        var path = new Path(Direction.newNorth(), 1, 0, Direction.newWest(), 0);
        truck.setPath(path);
        cellsMap.addVehicle(truck,  'N_ENTRANCE_1', truck.lengthCells()-1);

        iterations.forEach(cellSpecification => {
            truck.moveToNextIteration(cellsMap, cellsNeighbours);
            var expectedCells = expectedCellsFrom(cellSpecification);
            expectCellsToEqual(truck.currentCells(), expectedCells);
        });

        expect(() => { truck.moveToNextIteration(cellsMap, cellsNeighbours); }).toThrow();
    });

    it('lets a car enter and leave roundabout', () => {
        var iterations = [
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 3},
                {laneId: 'N_ENTRANCE_1', cellNumber: 2},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 6},
                {laneId: 'N_ENTRANCE_1', cellNumber: 5},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 9},
                {laneId: 'N_ENTRANCE_1', cellNumber: 8},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 11},
                {laneId: 'N_ENTRANCE_1', cellNumber: 10},
            ],
            [
                {laneId: 'N_ENTRANCE_1', cellNumber: 13},
                {laneId: 'N_ENTRANCE_1', cellNumber: 12},
            ],
            [
                {laneId: 0, cellNumber: 21},
                {laneId: 0, cellNumber: 20},
            ],
            [
                {laneId: 0, cellNumber: 24},
                {laneId: 0, cellNumber: 23},
            ],
            [
                {laneId: 0, cellNumber: 27},
                {laneId: 0, cellNumber: 26},
            ],
            [
                {laneId: 0, cellNumber: 29},
                {laneId: 0, cellNumber: 28},
            ],
            [
                {laneId: 0, cellNumber: 31},
                {laneId: 0, cellNumber: 30},
            ],
            [
                {laneId: 0, cellNumber: 33},
                {laneId: 0, cellNumber: 32},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 1},
                {laneId: 'W_EXIT_0', cellNumber: 0},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 4},
                {laneId: 'W_EXIT_0', cellNumber: 3},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 8},
                {laneId: 'W_EXIT_0', cellNumber: 7},
            ],
            [
                {laneId: 'W_EXIT_0', cellNumber: 13},
                {laneId: 'W_EXIT_0', cellNumber: 12},
            ]
        ];

        var car = VehicleFactory.newCar(drivingRules);
        var path = new Path(Direction.newNorth(), 1, 0, Direction.newWest(), 0);
        car.setPath(path);
        cellsMap.addVehicle(car, 'N_ENTRANCE_1', car.lengthCells() - 1);

        iterations.forEach(cellSpecification => {
            car.moveToNextIteration(cellsMap, cellsNeighbours);
            var expectedCells = expectedCellsFrom(cellSpecification);
            expectCellsToEqual(car.currentCells(), expectedCells);
        });

        expect(() => { car.moveToNextIteration(cellsMap, cellsNeighbours); }).toThrow();
    });

    it("vehicles will not crash if one going slow and another is approaching quickly", () => {
        var car = VehicleFactory.newCar(drivingRules);
        var path = new Path(null, null, null, Direction.newNorth(), 0);
        car.setPath(path);
        cellsMap.addVehicle(car, 1, 40);

        var truck = VehicleFactory.newTruck(drivingRules);
        truck.setPath(path);
        cellsMap.addVehicle(truck, 1, 69);

        function nextIteration() {
            car.moveToNextIteration(cellsMap, cellsNeighbours);
            truck.moveToNextIteration(cellsMap, cellsNeighbours);
        }

        range(0, 22).forEach(i => {
            expect(() => {nextIteration();}).not.toThrow();
        });
    });

    it('will slow down when approaching exit', () => {
        var expectedSpeeds = [
          2, 3, 4, 4, 3, 2, 2
        ];
        var car = VehicleFactory.newCar(drivingRules);
        var path = new Path(null, null, null, Direction.newNorth(), 0);
        car.setPath(path);
        cellsMap.addVehicle(car, 1, 79);

        expectedSpeeds.forEach(expectedSpeed => {
            car.moveToNextIteration(cellsMap, cellsNeighbours);
            expect(car.currentSpeed()).toEqual(expectedSpeed);
        });
    });

    it('returns cells count on lanes', () => {
        expect(cellsMap.cellsCountsOnInnerRoadLanes()).toEqual([70, 81]);
    });

    it('checks if a car is in right mirror before leaving roundabout', () => {
        var path = new Path(null, null, null, Direction.newNorth(), 1);

        var car = VehicleFactory.newCar(drivingRules);
        car.setPath(path);
        cellsMap.addVehicle(car, 1, 16);

        var car2 = VehicleFactory.newCar(drivingRules);
        car2.setPath(path);
        cellsMap.addVehicle(car2, 0, 14);

        var cars = [car, car2];
        function nextIteration(cars) {
            cars.forEach(car => {
                car.moveToNextIteration(cellsMap, cellsNeighbours);
            });
        }
        nextIteration(cars);
        expect(car.frontCell().id()).toEqual('118');
        expect(car2.frontCell().id()).toEqual('016');

        nextIteration(cars);
        expect(car.frontCell().id()).toEqual('N_EXIT_11');
        expect(car2.frontCell().id()).toEqual('016');

        nextIteration(cars);
        expect(car.frontCell().id()).toEqual('N_EXIT_14');
        expect(car2.frontCell().id()).toEqual('N_EXIT_11');
    });

    it('find vehicle on the right on roundabout', () => {
        var path = new Path(null, null, null, Direction.newNorth(), 1);
        var car = VehicleFactory.newCar(drivingRules);
        car.setPath(path);
        cellsMap.addVehicle(car, 1, 16);

        var car2 = VehicleFactory.newCar(drivingRules);
        car2.setPath(path);
        cellsMap.addVehicle(car2, 0, 14);

        expect(cellsMap.vehicleOnTheRight(car2)).toBe(car);
    });

    it('find vehicle on the left on roundabout', () => {
        var path = new Path(null, null, null, Direction.newNorth(), 1);
        var car = VehicleFactory.newCar(drivingRules);
        car.setPath(path);
        cellsMap.addVehicle(car, 1, 16);

        var car2 = VehicleFactory.newCar(drivingRules);
        car2.setPath(path);
        cellsMap.addVehicle(car2, 0, 14);

        expect(cellsMap.vehicleOnTheLeftOnRoundabout(car)).toBe(car2);
    });

    it('find vehicle on the right on entrance', () => {
        var carOnRightLane = VehicleFactory.newCar(drivingRules);
        carOnRightLane.setPath(new Path(
            Direction.newNorth(),
            0,
            0,
            Direction.newNorth(),
            1
        ));
        cellsMap.addVehicle(carOnRightLane, 'N_ENTRANCE_0', 13);

        var carOnLeftLane = VehicleFactory.newCar(drivingRules);
        carOnLeftLane.setPath(new Path(
            Direction.newNorth(),
            1,
            0,
            Direction.newNorth(),
            1
        ));
        cellsMap.addVehicle(carOnLeftLane, 'N_ENTRANCE_1', 13);

        expect(cellsMap.vehicleOnTheRight(carOnLeftLane)).toBe(carOnRightLane);
        expect(cellsMap.vehicleOnTheRight(carOnRightLane)).toBe(null);
    });

    it('find vehicles on the left', () => {
        var carOnEntrance = VehicleFactory.newCar(drivingRules);
        carOnEntrance.setPath(new Path(
            Direction.newNorth(),
            1,
            0,
            Direction.newNorth(),
            1
        ));
        cellsMap.addVehicle(carOnEntrance, 'N_ENTRANCE_1', 13);

        var carOnOuterLane = VehicleFactory.newCar(drivingRules);
        carOnOuterLane.setPath(new Path(
            null, null, null, Direction.newWest(), 0
        ));
        cellsMap.addVehicle(carOnOuterLane, 1, 19);

        var carOnMiddleLane = VehicleFactory.newCar(drivingRules);
        carOnMiddleLane.setPath(new Path(
            null, null, null, Direction.newWest(), 0
        ));
        cellsMap.addVehicle(carOnMiddleLane, 0, 16);

        var vehiclesOnTheLeft = cellsMap.vehiclesOnTheLeft(carOnEntrance, cellsNeighbours);
        expect(vehiclesOnTheLeft.get(0)).toEqual(carOnMiddleLane);
        expect(vehiclesOnTheLeft.get(1)).toEqual(carOnOuterLane);
        expect(vehiclesOnTheLeft.size).toEqual(2);
    });

    it('return empty map when there are none vehicles on the left', () => {
        var carOnEntrance = VehicleFactory.newCar(drivingRules);
        carOnEntrance.setPath(new Path(
            Direction.newNorth(), 1, 0, Direction.newNorth(), 1
        ));
        cellsMap.addVehicle(carOnEntrance, 'N_ENTRANCE_1', 13);

        var vehiclesOnTheLeft = cellsMap.vehiclesOnTheLeft(carOnEntrance, cellsNeighbours);
        expect(vehiclesOnTheLeft.size).toEqual(0);
    });

    it('counts cell neighbour on the right of', () => {
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(0)).toBe(0);
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(1)).toBe(1);
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(2)).toBe(2);
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(3)).toBe(3);
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(4)).toBe(5);
        expect(cellsMap.cellOnRoundaboutOnTheRightOf(69)).toBe(80);
    });

    it('counts cell neighbour on the left of', () => {
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(0)).toBe(0);
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(1)).toBe(1);
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(2)).toBe(2);
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(3)).toBe(3);
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(5)).toBe(4);
        expect(cellsMap.cellOnRoundaboutOnTheLeftOf(80)).toBe(69);
    });
    
    function expectCellsToEqual(firstCells, secondCells) {
        firstCells.forEach((firstCell, index) => {
            // console.log("Expect", firstCell.id(), secondCells[index].id(), firstCell.equals(secondCells[index]));
            expect(firstCell.equals(secondCells[index])).toBe(true);
        });
        expect(firstCells.length).toEqual(secondCells.length);
    }

    function expectedCellsFrom(array) {
        return Array.from(array, cellSpecification => {
                var cell = new Cell(cellSpecification.cellNumber);
                var cellsLane = {id: () => {}};
                spyOn(cellsLane, "id").and.returnValue(cellSpecification.laneId);
                cell.assignToLane(cellsLane);
                return cell;
            }
        );
    }
});
