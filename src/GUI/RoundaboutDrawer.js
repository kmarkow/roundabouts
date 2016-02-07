
class RoundaboutDrawer {


    /**
     * #TODO Make it draw a roundabout and clean up the code
     * @param canvas
     */
    drawOn(canvas) {
        var two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvas);


        var centerPoint = this._countCenterPoint();
        var roundaboutRadius = this._countRoundaboutRadius();

        console.log(centerPoint);
        var background = two.makeCircle(
            centerPoint.x,
            centerPoint.y,
            roundaboutRadius
        );
        background.fill = "#000000";

        var lane = two.makeCircle(
            centerPoint.x,
            centerPoint.y,
            roundaboutRadius*0.85
        );
        lane.fill = "#000000";
        lane.stroke = "#FFFFFF";
        lane.linewidth = 5;

        var corona_amount = 30;
        var radius = window.innerHeight / 4;
        var gutter = window.innerHeight / 20;
        for (var i = 0; i < corona_amount; i++) {
            var pct = (i + 1) / corona_amount;
            var theta = pct * Math.PI * 2;
            var x = (radius + gutter) * Math.cos(theta);
            var y = (radius + gutter) * Math.sin(theta);
            //var corona = two.makePath(- gutter / 2, 0, gutter / 2, 0, 0, gutter);

            var corona = two.makeRectangle(
                centerPoint.x + x,
                centerPoint.y + y,
                15,
                5
            );
            corona.noStroke();
            corona.fill = "#FF0000";
            //corona.translation.set(x, y);
            corona.rotation = Math.atan2(-y, -x) + Math.PI / 2;
        }


        var island = two.makeCircle(
            centerPoint.x,
            centerPoint.y,
            roundaboutRadius*0.7
        )
        island.fill = "#00FF00";
    }

    /**
     * Count center point of browser assuming Zero-Zero point is in lower-left corner
     * //TODO: Inject window via constructor or possible to change to two.height.width?
     * @returns {{x: number, y: number}}
     */
    _countCenterPoint() {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 //
        }
    }

    /**
     * This should be 70% of the screen
     */
    _countRoundaboutRadius() {
        return Math.min(window.innerWidth, window.innerHeight)*0.4;
    }
}

export default RoundaboutDrawer;
