import RoundaboutDrawer from '../../src/GUI/RoundaboutDrawer.js';

describe("When I start Application", function() {

    var roundaboutDrawer;

    beforeEach(()=>{
        roundaboutDrawer = new RoundaboutDrawer();
    });

    it('I should see roundabout', ()=>{
        var canvasElement = document.createElement("div");
        roundaboutDrawer.drawOn(canvasElement);
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
