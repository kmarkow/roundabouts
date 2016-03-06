import { CellsMap } from '../../src/Simulation/CellsMap.js';
import Cell from '../../src/Simulation/Cell.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';
import Vehicle from '../../src/Simulation/Vehicle.js'

describe("Test roundabout cells map", function() {

    var unitConverter;
    var cellsMap;

    beforeEach(()=>{
        unitConverter  = new UnitConverter(
            0,
            800
        );
        cellsMap = new CellsMap(roundaboutBukowe, unitConverter)
    });

    it('Accurately says if there is nothing in front of a vehicle', () => {
        var car1 = Vehicle.newCar();
        var car2 = Vehicle.newCar();

        var distanceBetweenCar1And2 = 1;
        cellsMap.addVehicle(car1, 0, distanceBetweenCar1And2 + car1.lengthCells());
        cellsMap.addVehicle(car2, 0, 0);

        expect(cellsMap.nothingInFrontOf(car1, 2)).toBe(true);
        expect(cellsMap.nothingInFrontOf(car2, distanceBetweenCar1And2 + 1)).toBe(false);
        expect(cellsMap.nothingInFrontOf(car2, distanceBetweenCar1And2)).toBe(true);
    })
});
