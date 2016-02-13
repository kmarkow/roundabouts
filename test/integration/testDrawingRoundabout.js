import RoundaboutDrawer from '../../src/GUI/RoundaboutDrawer.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("When I start Application", function() {

    var roundaboutDrawer;
    var unitConverter;

    beforeEach(()=>{
        unitConverter  = new UnitConverter(
            roundaboutBukowe.roundaboutHeightWithRoads(),
            800
        );
        roundaboutDrawer = new RoundaboutDrawer(
            roundaboutBukowe,
            unitConverter
        );
    });

    it('I should see roundabout', ()=>{
        var canvasElement = document.createElement("div");
        roundaboutDrawer.drawOn(canvasElement);
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
