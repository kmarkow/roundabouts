class RoundaboutDrawer {

    constructor(roundaboutSpecification, unitConverter) {
        this.roundaboutSpecification = roundaboutSpecification;
        this.unitConverter = unitConverter;
    }

    /**
     * @param canvas
     */
    drawOn(canvas) {
        var two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvas);

        var centerPoint =  {
            x: two.width / 2,
            y: two.height / 2
        };
        console.log(centerPoint);
        var roundaboutRadiusPx =  this.unitConverter.metersAsPixels(
            this.roundaboutSpecification.roundaboutRadius()
        );
        var islandRadiusPx = this.unitConverter.metersAsPixels(
          this.roundaboutSpecification.islandRadius()
        );

        var background = two.makeCircle(
            centerPoint.x,
            centerPoint.y,
            roundaboutRadiusPx
        );
        background.fill = "#000000";

        var island = two.makeCircle(
            centerPoint.x,
            centerPoint.y,
            islandRadiusPx
        )
        island.fill = "#00FF00";
   }
}

export default RoundaboutDrawer;
