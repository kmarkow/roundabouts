
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
        return Math.min(window.innerWidth, window.innerHeight) / 2;
    }
}

export default RoundaboutDrawer;
