class CellsDrawer {
    constructor(roundaboutSpecification, cellsMap, unitConverter, two) {
        this._cellsMap = cellsMap;
        this._unitConverter = unitConverter;
        this._roundaboutSpecification = roundaboutSpecification;
        this._two = two;
        this._centerPoint =  {
            x: this._two.width / 2,
            y: this._two.height / 2
        };
        this._cellsMap.registerObserver(this);
        this._drawnCells = [];
        this._cellLengthPx = this._unitConverter.cellsAsPixels(1);
    }

    /**
     * Handle change in cellsMap and refresh view.
     * Implements observer Pattern.
     */
    notify() {
        this.draw();
    }

    draw() {
        this._clearDrawnElements();
        this._drawRoundaboutGrid();
    }

    _clearDrawnElements() {
        this._two.remove(this._drawnCells);
    }

    _drawRoundaboutGrid() {
        var cellWidthPx =  this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneWidth());

        this._roundaboutSpecification.lanesNumbers().forEach(laneNumber => {
            var laneRadiusPx = this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneRadius(laneNumber));
            var cellsCount = this._unitConverter.metersAsCells(this._roundaboutSpecification.lengthOfLane(laneNumber));
            this._cellsMap.cellsOnLane(laneNumber).forEach((cell, cellIndex) => {
                var pct = cellsCount - cellIndex / cellsCount;
                var theta = pct * Math.PI * 2;
                var x = laneRadiusPx * Math.cos(theta);
                var y = laneRadiusPx * Math.sin(theta);
                var singleCell = this._two.makeRectangle(
                    this._centerPoint.x + x,
                    this._centerPoint.y + y,
                    this._cellLengthPx,
                    cellWidthPx
                );
                singleCell.rotation = Math.atan2(-y, -x) + Math.PI / 2;
                this._cellFillColor(cell, singleCell);
                this._drawStrokeIfDebug(singleCell);
                this._drawnCells.push(singleCell);
            });

        });
    }

    _cellFillColor(cell, cellElement) {
        if (cell.isTaken()) {
            cellElement.fill = "#FF0000";
        } else {
            cellElement.fill = "transparent";
        }
    }

    _drawStrokeIfDebug(cellElement) {
        if (document.getElementById("debug_on").checked) {
            cellElement.stroke = "#FF0000";
        } else {
            cellElement.noStroke();
        }
    }
}

export default CellsDrawer;
