import CellsLane from '../../src/Simulation/CellsLane.js';
import Cell from '../../src/Simulation/Cell.js';

describe("Test cells lane", function() {

    it('properly gets previous and next cells on the lane', ()=>{
        var cell1 = new Cell(0, 0);
        var cell2 = new Cell(0, 1);
        var cell3 = new Cell(0, 2);
        var cell4 = new Cell(0, 3);

        var cellsLane = new CellsLane([cell1, cell2, cell3, cell4]);

        expect(cellsLane.cellsNextTo(cell1, 2)).toEqual([cell2, cell3]);
        expect(cellsLane.cellsNextTo(cell3, 2)).toEqual([cell4, cell1]);
        expect(cellsLane.cellsNextTo(cell4, 2)).toEqual([cell1, cell2]);
        expect(cellsLane.cellsPreviousTo(cell3, 2)).toEqual([cell2, cell1]);
        expect(cellsLane.cellsPreviousTo(cell1, 2)).toEqual([cell4, cell3]);
    });
});
