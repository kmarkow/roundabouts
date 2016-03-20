import CellsLane from '../../src/Simulation/CellsLane.js';
import Cell from '../../src/Simulation/Cell.js';

describe("Cells Lane", function() {

    it('properly gets previous and next cells on the roundabout lane', ()=>{
        var cell1 = new Cell(0);
        var cell2 = new Cell(1);
        var cell3 = new Cell(2);
        var cell4 = new Cell(3);

        var cellsLane = new CellsLane("dummyId", [cell1, cell2, cell3, cell4], true);

        expect(cellsLane.cellsNextTo(cell1, 2)).toEqual([cell2, cell3]);
        expect(cellsLane.cellsNextTo(cell3, 2)).toEqual([cell4, cell1]);
        expect(cellsLane.cellsNextTo(cell4, 2)).toEqual([cell1, cell2]);
        expect(cellsLane.cellsPreviousTo(cell3, 2)).toEqual([cell2, cell1]);
        expect(cellsLane.cellsPreviousTo(cell1, 2)).toEqual([cell4, cell3]);
    });

    it('properly gets previous and next cells on the normal lane', ()=>{
        var cell1 = new Cell(0);
        var cell2 = new Cell(1);
        var cell3 = new Cell(2);
        var cell4 = new Cell(3);

        var cellsLane = new CellsLane("dummyId", [cell1, cell2, cell3, cell4], false);

        expect(cellsLane.cellsNextTo(cell1, 2)).toEqual([cell2, cell3]);
        expect(cellsLane.cellsPreviousTo(cell3, 2)).toEqual([cell2, cell1]);
    });

    it('returs less cells when normal road ends', () => {
        var cell1 = new Cell(0);
        var cell2 = new Cell(1);
        var cell3 = new Cell(2);
        var cell4 = new Cell(3);

        var cellsLane = new CellsLane("dummyId", [cell1, cell2, cell3, cell4], false);

        //TODO: Przemyslec zmiane tego moze powinna przyjmowac parametr z ewentualna droga do uzupelnienia?
        expect(cellsLane.cellsNextTo(cell3, 2)).toEqual([cell4]);
        expect(cellsLane.cellsNextTo(cell4, 2)).toEqual([]);
        expect(cellsLane.cellsPreviousTo(cell1, 2)).toEqual([]);
        expect(cellsLane.cellsPreviousTo(cell2, 2)).toEqual([cell1]);
    });

    it('can be created with factory method', () => {
        var cellsLane = CellsLane.newLane('dummyId', 10);
        expect(cellsLane.allCells().length).toEqual(10);
    });
});
