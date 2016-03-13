import {range} from '../JsWhyYouNoImplement.js';
import Cell from './Cell.js';

class CellsLane {
    static newLane(laneId, lengthCells, isRounded=true) {
        var cells = [];
        range(0, lengthCells).forEach(cellNumber => {
            cells.push(new Cell(cellNumber));
        });
        return new CellsLane(laneId, cells, isRounded);
    }

    constructor(id, cells, isRounded) {
       cells.forEach(cell => {
          cell.assignToLane(this);
       });
       this._id = id;
       this._allCells = cells;
       this._allCellsReversed = this._allCells.slice().reverse();
       this._isRounded = isRounded;
    }

    id() {
        return this._id;
    }

    cellsNextTo(cell, limitTo) {
        return this._cellsNextTo(cell, limitTo, this._allCells);
    }

    cellsPreviousTo(cell, limitTo) {
        return this._cellsNextTo(cell, limitTo, this._allCellsReversed);
    }

    cellsPreviousToInclusive(cell, limitTo) {
        return [cell].concat(this._cellsNextTo(cell, limitTo-1, this._allCellsReversed));
    }

    allCells() {
        return this._allCells;
    }

    _cellsNextTo(cell, limitTo, arrayFrom) {
        var cellIndex = arrayFrom.findIndex(element => {
            return element.equals(cell);
        });
        if (cellIndex == -1) {
            throw new Error("Cell not found ", cell.id());
        }
        var nextCellIndex = cellIndex + 1;
        var nextCells = arrayFrom.slice(nextCellIndex, nextCellIndex + limitTo);
        var missingCells = limitTo - nextCells.length;

        if (this._isRounded && missingCells) {
            nextCells = nextCells.concat(arrayFrom.slice(0, missingCells));
        }
        return nextCells;
    }

    isExitLane() {
        return !this._isRounded; //TODO: Take care of entrances also
    }
}

export default CellsLane;
