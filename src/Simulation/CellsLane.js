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

    cellsNextToNumber(cellNumber, limitTo) {
        var cell = this._allCells[cellNumber];
        return this.cellsNextTo(cell, limitTo);
    }

    cellsPreviousToNumber(cellNumber, limitTo) {
        var cell = this._allCells[cellNumber];
        return this.cellsPreviousTo(cell, limitTo);
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

    cellsCount() {
        return this._allCells.length;
    }

    firstCells(numberOfCells) {
        return this._allCells.slice(0, numberOfCells);
    }

    isExitLane() {
        return this.id().toString().includes('EXIT');
    }

    isEntranceLane() {
        return this.id().toString().includes('ENTRANCE');
    }

    isRoundaboutLane() {
        return !this.isExitLane() && !this.isEntranceLane();
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
}

export default CellsLane;
