
class RoundaboutDrawer {

    drawOn(canvas) {
        var two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvas);
        var rect = two.makeRectangle(two.width / 2, two.height / 2, 50 ,50);
        two.bind('update', function() {
            rect.rotation += 0.001;
        });

    }
}

export default RoundaboutDrawer;
