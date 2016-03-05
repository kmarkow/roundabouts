import { CellsMap } from '../../src/Simulation/CellsMap.js';
import Cell from '../../src/Simulation/Cell.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

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

    it('Can go all the way around a roundabout', () => {
        var cellsCount = cellsMap.cellsOnLane(0).length;
        let firstCell = new Cell(0, 0);
        let secondCell = new Cell(0, 1);
        let thirdCell = new Cell(0, 2)
        let lastButOneCell = new Cell(0, cellsCount-2);
        let lastCell = new Cell(0, cellsCount-1);

        expect(cellsMap.nextCellFor(firstCell).equals(secondCell)).toBeTruthy();
        expect(cellsMap.nextCellFor(secondCell).equals(thirdCell)).toBeTruthy();
        // ..
        expect(cellsMap.nextCellFor(lastButOneCell).equals(lastCell)).toBeTruthy();
        expect(cellsMap.nextCellFor(lastCell).equals(firstCell)).toBeTruthy();
    });

    it('Throws exception when not existing cell given', () => {
        let cellOnNonExistingLane = new Cell(99, 99);
        let nonExistingCell = new Cell(0, 99);
        expect(() => { cellsMap.nextCellFor(cellOnNonExistingLane) }).toThrow();
        expect(() => { cellsMap.nextCellFor(nonExistingCell) }).toThrow();
    })
});
