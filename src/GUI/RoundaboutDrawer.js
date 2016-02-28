const DRAW_CELLS_GRID = true;
const NUMBER_OF_QUEUEING_CARS_TO_DRAW = 3;
const METERS_PER_CELL = 7.5;
const ADHERENT_ROAD_LENGTH = NUMBER_OF_QUEUEING_CARS_TO_DRAW * METERS_PER_CELL;

class RoundaboutDrawer {

    constructor(roundaboutSpecification, unitConverter, two) {
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._two = two;
        this._centerPoint =  {
            x: this._two.width / 2,
            y: this._two.height / 2
        };
        this._letRoadMeltIntoRoundabout = 7;
    }

    draw() {
        this._drawAdherentRoads();
        this._drawRoundaboutRoads();
        this._drawRoundaboutBrokenLanes();
        this._drawIsland();
    }

    _drawRoundaboutRoads() {
        var roundaboutRadiusPx =  this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.roundaboutRadius()
        );
        var background = this._two.makeCircle(
            this._centerPoint.x,
            this._centerPoint.y,
            roundaboutRadiusPx
        );
        background.fill = "#000000";
    }

    _drawRoundaboutBrokenLanes() {
        for (var i = 1; i < this._roundaboutSpecification.lanesCount(); i++) {
            var laneRadius = this._roundaboutSpecification.roundaboutRadius() - this._roundaboutSpecification.laneWidth()*i; // TODO: Change it
            var laneRadiusPx = this._unitConverter.metersAsPixels(laneRadius);
            var brokenLinesCount = laneRadius * 4; // It could be anything else but 4 looks cool

            for (var j = 0; j < brokenLinesCount; j++) {
                var pct = j / brokenLinesCount;
                var theta = pct * Math.PI * 2;
                var x = laneRadiusPx * Math.cos(theta);
                var y = laneRadiusPx * Math.sin(theta);

                var singleLine = this._two.makeRectangle(
                    this._centerPoint.x + x,
                    this._centerPoint.y + y,
                    5,
                    1
                );
                singleLine.noStroke();
                singleLine.fill = "#FFFFFF";
                singleLine.rotation = Math.atan2(-y, -x) + Math.PI / 2;
            }
        }
    }

    _drawIsland() {
        var islandRadiusPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.islandRadius()
        );
        var island = this._two.makeCircle(
            this._centerPoint.x,
            this._centerPoint.y,
            islandRadiusPx
        );
        island.fill = "#00FF00";
    }

    _drawAdherentRoads() {
        var roadLengthPx = this._unitConverter.metersAsPixels(
            ADHERENT_ROAD_LENGTH
        );
        var roundaboutRadiusPx =  this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.roundaboutRadius()
        );
        var pixelsFromCenterToRoadCenter = roundaboutRadiusPx + roadLengthPx/2;

        var southRoad = this._drawRoad();
        southRoad.translation.set(
            this._centerPoint.x,
            this._centerPoint.y + pixelsFromCenterToRoadCenter
        );
        var westRoad = this._drawRoad();
        westRoad.translation.set(
            this._centerPoint.x - pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );
        westRoad.rotation += 1*Math.PI / 2;
        var northRoad = this._drawRoad();
        northRoad.translation.set(
            this._centerPoint.x,
            this._centerPoint.y - pixelsFromCenterToRoadCenter
        );
        northRoad.rotation += 2*Math.PI / 2;
        var eastRoad = this._drawRoad();
        eastRoad.translation.set(
            this._centerPoint.x + pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );
        eastRoad.rotation += 3*Math.PI / 2;
    }

    _drawRoad() {
        var roadLengthPx = this._unitConverter.metersAsPixels(
                ADHERENT_ROAD_LENGTH
        ) + this._letRoadMeltIntoRoundabout;
        var roadWidthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadWidth()
        );

        // Create road element
        var road = this._two.makeRectangle(
            0,
            0,
            roadWidthPx,
            roadLengthPx
        );
        road.fill = "#0F0F0F";

        var middleLine = this._drawContinuousLine(roadLengthPx);
        var leftLines = this._drawStraightBrokenLine(-roadWidthPx / 4, roadLengthPx);
        var rightLines = this._drawStraightBrokenLine(roadWidthPx / 4, roadLengthPx);
        var cellsGrid = this._drawAdherentRoadsGrid(roadWidthPx, roadLengthPx);

        var groupedElements = [road, middleLine].concat(
            leftLines,
            rightLines,
            cellsGrid
        );

        var wholeRoad = this._two.makeGroup(groupedElements);
        return wholeRoad;
    }

    _drawAdherentRoadsGrid(roadWidthPx, roadLengthPx) {
        if (!DRAW_CELLS_GRID) {
            return [];
        }
        var adherentRoadsCount = this._roundaboutSpecification.adherentRoadsCount();
        var cells = [];
        var cellLengthPx = this._unitConverter.cellsAsPixels(1);
        var cellWidthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadWidth() / adherentRoadsCount
        );

        for (var i=0; i < adherentRoadsCount; i++) {
            for (var j = 0; j < NUMBER_OF_QUEUEING_CARS_TO_DRAW; j++) {
                var cell = this._two.makeRectangle(
                    - roadWidthPx / adherentRoadsCount + (i / adherentRoadsCount)* roadWidthPx - cellWidthPx / 2,
                    roadLengthPx / 2 - cellLengthPx / 2 - j * cellLengthPx,
                    cellWidthPx,
                    cellLengthPx
                );
                cell.stroke = "#FF0000";
                cell.fill = "transparent";
                cells.push(cell);
            }
        }
        return cells;
    }

    _drawStraightBrokenLine(xPos, lineLength) {
        var groupedElements = [];
        var linesToDraw = 16;
        var lineStartingY = - lineLength / 2;

        for (var i = 0; i < linesToDraw; i++) {
            var thisStarts = lineStartingY + (i / linesToDraw) * lineLength;
            var thisEnds = thisStarts + (1 / linesToDraw) * lineLength;

            // Draw dotted line or continuous line on the beginning of the road
            if (i % 2 == 0 || i < 4) {
                var brokenLine = this._two.makeLine(
                    xPos,
                    thisStarts,
                    xPos,
                    thisEnds
                );
                brokenLine.stroke = "#FFFFFF";
                groupedElements.push(brokenLine);
            }
        }
        return groupedElements;
    }

    _drawContinuousLine(roadLengthPx) {
        var line = this._two.makeLine(
            0,
            0 - roadLengthPx / 2,
            0,
            0 + roadLengthPx / 2
        );
        line.stroke = "#FFFFFF";
        return line;
    }
}

export {RoundaboutDrawer, ADHERENT_ROAD_LENGTH};
