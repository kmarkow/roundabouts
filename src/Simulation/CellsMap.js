import {range} from '../JsWhyYouNoImplement.js';
import Cell from './Cell.js';
import Observable from './Observable.js';

class CellsMap extends Observable {

    constructor(roundaboutSpecification, unitConverter) {
        super();
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._laneCells = {};
        this._divideLanesToCells();
        this._counter = 0;
    }

    nextCellFor(cellToFind) {
        var cellsOnTheLane = this._laneCells[cellToFind.parentLane()];
        if (!cellsOnTheLane) {
            throw new Error("Lane not found", cellToFind.parentLane());
        }
        for (var current = 0; current < cellsOnTheLane.length; current++) {
            if (cellsOnTheLane[current].equals(cellToFind)) {
                var nextCellIndex = current + 1;
                if (nextCellIndex == cellsOnTheLane.length) {
                    nextCellIndex = 0; // This is a roundabout so from last you go to the first
                }
                return cellsOnTheLane[nextCellIndex];
            }
        }
        throw new Error("Cell not found in Map ", cellToFind);
    }

    _divideLanesToCells() {
        this._roundaboutSpecification.lanesNumbers().forEach(laneNumber => {
            this._laneCells[laneNumber] = [];
            var cellsCount = this._unitConverter.metersAsCells(
                this._roundaboutSpecification.lengthOfLane(laneNumber)
            );
            range(0, cellsCount).forEach(cellNumber => {
                this._laneCells[laneNumber].push(
                    new Cell(laneNumber, cellNumber)
                );
            });
        });
    }

    cellsOnLane(laneNumber) {
        return this._laneCells[laneNumber];
    }

    nextIteration() {
        this._laneCells[0][this._counter].setTaken(false);
        this._counter++;
        this._laneCells[0][this._counter].setTaken(true);
        this.notifyAll();
    }
}

export { CellsMap };
