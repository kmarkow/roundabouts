import RoundaboutDrawer from '../../src/GUI/RoundaboutDrawer.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("When I start Application", function() {

    var roundaboutDrawer;
    var unitConverter;
    var canvasElement;

    beforeEach(()=>{
        canvasElement = document.createElement("div");
        unitConverter  = new UnitConverter(
            roundaboutBukowe.roundaboutHeightWithRoads(),
            800
        );
        roundaboutDrawer = new RoundaboutDrawer(
            roundaboutBukowe,
            unitConverter,
            canvasElement
        );
    });

    it('I should see roundabout', ()=>{
        roundaboutDrawer.draw();
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
