import {RoundaboutDrawer, ADHERENT_ROAD_LENGTH} from '../../src/GUI/RoundaboutDrawer.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("When I start Application", function() {

    var roundaboutDrawer;
    var unitConverter;
    var canvasElement;

    beforeEach(()=>{
        canvasElement = document.createElement("div");
        let twojs = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvasElement);

        unitConverter  = new UnitConverter(
            ADHERENT_ROAD_LENGTH,
            800
        );
        roundaboutDrawer = new RoundaboutDrawer(
            roundaboutBukowe,
            unitConverter,
            twojs
        );
    });

    it('I should see roundabout', ()=>{
        roundaboutDrawer.draw();
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
