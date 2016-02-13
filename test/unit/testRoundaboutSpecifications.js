import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("Test roundabout specifications", function() {

    it('Roundabout Bukowe has appropiate properties', ()=>{
        expect(roundaboutBukowe.roundaboutDiameter()).toEqual(74);
        expect(roundaboutBukowe.roundaboutRadius()).toEqual(37);
        expect(roundaboutBukowe.lanesCount()).toEqual(2);
        expect(roundaboutBukowe.roundaboutHeightWithRoads()).toEqual(45 + 74);
        expect(roundaboutBukowe.islandRadius()).toEqual(28);
        expect(roundaboutBukowe.adherentRoadWidth()).toEqual(14);
        expect(roundaboutBukowe.adherentRoadLength()).toEqual(22.5);
    });
});
