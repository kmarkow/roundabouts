class CellsDrawer {
    constructor(roundaboutSpecification, cellsMap, unitConverter, two, translator) {
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
        this._translator = translator;
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
        this._drawAdherentRoadsGrid();
    }

    _clearDrawnElements() {
        this._two.remove(this._drawnCells);
    }

    _drawRoundaboutGrid() {
        var cellWidthPx =  this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneWidth());

        this._roundaboutSpecification.innerRoadLanes().forEach(lane => {
            var laneRadiusPx = this._unitConverter.metersAsPixels(this._roundaboutSpecification.laneRadius(lane.id()));
            var cellsCount = this._unitConverter.metersAsCells(lane.length());
            this._cellsMap.cellsOnLane(lane.id()).forEach((cell, cellIndex) => {
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
                this._drawStrokeIfDebug(singleCell);
                this._cellFillColor(cell, singleCell);
                this._drawnCells.push(singleCell);
            });

        });
    }

    _cellFillColor(cell, cellElement) {
        if (!cell.isEmpty()) {
            cellElement.fill = `#${cell.vehicle().id().toString(16)}`;
            cellElement.stroke = "#FF0000";
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
    _drawAdherentRoadsGrid() {
        this._roundaboutSpecification.adherentRoads().forEach(road => {
            this._translator.translateTo(
                this._drawAdherentRoadGrid(road),
                road.id()
            );
        });
    }

    _drawAdherentRoadGrid(road) {
        var roadWidthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadWidth()
        );
        var roadLengthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadLength()
        );

        var adherentLanesCount = this._roundaboutSpecification.adherentLanesCount();
        var cellsToGroup = [];
        var cellLengthPx = this._unitConverter.cellsAsPixels(1);
        var cellWidthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadWidth() / adherentLanesCount
        );

       road.allLanes().forEach((lane, i) => {
           var cells = this._cellsMap.cellsOnLane(lane.id());
           if (lane.isExit()) {
               cells = cells.slice(0).reverse();
           }

           cells.forEach((cell, j) => {
               var singleCell = this._two.makeRectangle(
                   - roadWidthPx / adherentLanesCount + (i / adherentLanesCount) * roadWidthPx - cellWidthPx / 2,
                   roadLengthPx / 2 - cellLengthPx / 2 - j * cellLengthPx,
                   cellWidthPx,
                   cellLengthPx
               );
               this._drawStrokeIfDebug(singleCell);
               this._cellFillColor(cell, singleCell);
               cellsToGroup.push(singleCell);
           });
       });

        var groupedCells = this._two.makeGroup(cellsToGroup);
        this._drawnCells.push(groupedCells);
        return groupedCells;
    }
}

export default CellsDrawer;
