import {RoundaboutDrawer, ADHERENT_ROAD_LENGTH} from '../../src/GUI/RoundaboutDrawer.js';
import UnitConverter from '../../src/GUI/UnitConverter.js';
import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';
import {CellsMap} from '../../src/Simulation/CellsMap.js';

describe("When I start Application", function() {

    var roundaboutDrawer;
    var unitConverter;
    var canvasElement;

    beforeEach(()=>{
        canvasElement = document.createElement("div");
        unitConverter  = new UnitConverter(
            ADHERENT_ROAD_LENGTH,
            800
        );
        roundaboutDrawer = new RoundaboutDrawer(
            roundaboutBukowe,
            new CellsMap(roundaboutBukowe, unitConverter),
            unitConverter,
            canvasElement
        );
    });

    it('I should see roundabout', ()=>{
        roundaboutDrawer.draw();
        expect(canvasElement.innerHTML).toContain("svg");
    });
});
