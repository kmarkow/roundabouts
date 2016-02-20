import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("Test roundabout specifications", function() {

    it('Roundabout Bukowe has appropiate properties', ()=>{
        expect(roundaboutBukowe.roundaboutDiameter()).toEqual(74);
        expect(roundaboutBukowe.roundaboutRadius()).toEqual(37);
        expect(roundaboutBukowe.lanesCount()).toEqual(2);
        expect(roundaboutBukowe.islandRadius()).toEqual(28);
        expect(roundaboutBukowe.adherentRoadWidth()).toEqual(14);
        expect(roundaboutBukowe.adherentRoadsCount()).toEqual(4);
    });

    it('Counts max cells that can fit onto a roundabout lane', () => {
        expect(roundaboutBukowe.lengthOfLane(0)).toBeCloseTo(175.93);
        expect(roundaboutBukowe.lengthOfLane(1)).toBeCloseTo(204.20);
        expect(() => { roundaboutBukowe.lengthOfLane(2) }).toThrow();
    });
});
