class CellsLane {
    constructor(cells) {
       this._cellsIdsToCells = {};
       this._cellsIds = [];
       cells.forEach(cell => {
           this._cellsIdsToCells[cell.id()] = cell;
           this._cellsIds.push(cell.id());
       });

       this._cellsIdsReversed = this._cellsIds.slice().reverse();
    }

    cellsNextTo(cell, limitTo) {
        return this._cellsNextTo(cell, limitTo, this._cellsIds);
    }

    cellsPreviousTo(cell, limitTo) {
        return this._cellsNextTo(cell, limitTo, this._cellsIdsReversed);
    }

    _cellsNextTo(cell, limitTo, arrayFrom) {
        var nextCellId = arrayFrom.indexOf(cell.id()) + 1;
        var nextCellsIds = arrayFrom.slice(nextCellId, nextCellId+limitTo);
        var missingCells = limitTo - nextCellsIds.length;
        nextCellsIds = nextCellsIds.concat(arrayFrom.slice(0, missingCells));
        var nextCells = [];
        nextCellsIds.forEach(nextCellId => {
            nextCells.push(this._cellsIdsToCells[nextCellId]);
        });
        return nextCells;
    }
}

export default CellsLane;
