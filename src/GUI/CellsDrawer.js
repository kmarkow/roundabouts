const DRAW_CELLS_GRID = true;

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
    }

    draw() {
        this._cellsMap.nextIteration();
        this._drawRoundaboutGrid();
    }

    _drawRoundaboutGrid() {
        if (!DRAW_CELLS_GRID) {
            return;
        }
        var cellLengthPx = this._unitConverter.cellsAsPixels(1);
        var cellWidthPx =  this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneWidth());

        this._roundaboutSpecification.lanesNumbers().forEach(laneNumber => {
            var laneRadiusPx = this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneRadius(laneNumber));
            var cellsCount = this._unitConverter.metersAsCells(this._roundaboutSpecification.lengthOfLane(laneNumber));

            this._cellsMap.cellsOnLane(laneNumber).forEach((cell, cellIndex) => {
                var pct = cellsCount - cellIndex / cellsCount;
                var theta = pct * Math.PI * 2;
                var x = laneRadiusPx * Math.cos(theta);
                var y = laneRadiusPx * Math.sin(theta);
                var singleLine = this._two.makeRectangle(
                    this._centerPoint.x + x,
                    this._centerPoint.y + y,
                    cellLengthPx,
                    cellWidthPx
                );
                singleLine.stroke = "#FF0000";
                singleLine.fill = this._cellFillColor(cell);
                singleLine.rotation = Math.atan2(-y, -x) + Math.PI / 2;
            });

        });
    }

    _cellFillColor(cell) {
        if (cell.isTaken()) {
            return "#FF0000";
        }
        return "transparent";
    }
}

export default CellsDrawer;
