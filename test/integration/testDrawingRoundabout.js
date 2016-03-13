import {RoundaboutDrawer} from '../../src/GUI/RoundaboutDrawer.js';
import Translator from '../../src/GUI/Translator.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';

describe("When I start Application", function() {

    var roundaboutDrawer;
    var unitConverter;
    var canvasElement;
    var translator;

    beforeEach(()=>{
        canvasElement = document.createElement("div");
        let twojs = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(canvasElement);

        unitConverter  = new UnitConverter(
            roundaboutBukowe.adherentRoadLength(),
            800
        );
        translator = new Translator(
            roundaboutBukowe,
            unitConverter,
            twojs
        );
        roundaboutDrawer = new RoundaboutDrawer(
            roundaboutBukowe,
            unitConverter,
            twojs,
            translator
        );
    });

    it('I should see roundabout', ()=>{
        roundaboutDrawer.draw();
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
