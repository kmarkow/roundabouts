import Cell from '../../src/Simulation/Cell.js';

describe("Test cells", function() {

    it('Can be compared', ()=>{
        var cell1 = new Cell(0, 0);
        var cell2 = new Cell(0, 0);
        var cell3 = new Cell(1, 0);
        expect(cell1.equals(cell2)).toBeTruthy();
        expect(cell1.equals(cell3)).toBeFalsy();
    });
});
