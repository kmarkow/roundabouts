class RoundaboutDrawer {

    constructor(roundaboutSpecification, unitConverter, canvas) {
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvas);
        this._centerPoint =  {
            x: this._two.width / 2,
            y: this._two.height / 2
        };
        this._letRoadMeltIntoRoundabout = 10;
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
        )
        island.fill = "#00FF00";
    }

    _drawAdherentRoads() {
        var roadLengthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadLength()
        );
        var roundaboutRadiusPx =  this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.roundaboutRadius()
        );
        var pixelsFromCenterToRoadCenter = roundaboutRadiusPx + roadLengthPx/2;


        var southRoad = this._drawRoad(false);
        southRoad.translation.set(
            this._centerPoint.x,
            this._centerPoint.y + pixelsFromCenterToRoadCenter
        );

        var northRoad = this._drawRoad(false);
        northRoad.translation.set(
            this._centerPoint.x,
            this._centerPoint.y - pixelsFromCenterToRoadCenter
        );

        var westRoad = this._drawRoad(true);
        westRoad.translation.set(
            this._centerPoint.x - pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );

        var eastRoad = this._drawRoad(true);
        eastRoad.translation.set(
            this._centerPoint.x + pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );
    }

    _drawRoad(isHorizontal) {
        var roadLengthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadLength()
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

        // Create line splitting element
        var mainLine = this._two.makeLine(
            0,
            0 - roadLengthPx / 2,
            0,
            0 + roadLengthPx / 2
        );
        mainLine.stroke = "#FFFFFF";

        // TODO: Draw this broken line
        //var linesToDraw = 6;
        //var lineStartingY = - roadLengthPx / 2;
        //var lineEndingY = + roadLengthPx / 2
        //var lineLength = roadLengthPx;
        //
        //for (var i = 0; i < linesToDraw; i++) {
        //    var thisStarts = lineStartingY + (i / linesToDraw) * lineLength;
        //    var thisEnds = lineEndingY + (i + 1/ linesToDraw) * lineLength;
        //    var brokenLine = this._two.makeLine(
        //        roadWidthPx / 4,
        //        lineStartingY + thisStarts,
        //        roadWidthPx / 4,
        //        lineEndingY + thisEnds
        //    );
        //    brokenLine.stroke = "#FFFFFF";
        //}


        var brokenLine2 = this._two.makeLine(
            -roadWidthPx / 4,
            0 - roadLengthPx / 2,
            -roadWidthPx / 4,
            0 + roadLengthPx / 2
        );
        brokenLine2.stroke = "#FFFFFF";

        var wholeRoad = this._two.makeGroup([road, mainLine, brokenLine2]);

        if (isHorizontal) {
            wholeRoad.rotation += Math.PI / 2; // 90 degrees as radians
        }

        return wholeRoad;
    }
}

export default RoundaboutDrawer;
