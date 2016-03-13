import {roundaboutBukowe} from '../../src/Simulation/Specification/RoundaboutSpecifications.js';

describe("Roundabout specifications", function() {

    it('Bukowe has appropiate properties', () => {
        expect(roundaboutBukowe.roundaboutDiameter()).toEqual(74);
        expect(roundaboutBukowe.roundaboutRadius()).toEqual(37);
        expect(roundaboutBukowe.lanesCount()).toEqual(2);
        expect(roundaboutBukowe.islandRadius()).toEqual(28);
        expect(roundaboutBukowe.adherentRoadWidth()).toEqual(14);
        expect(roundaboutBukowe.adherentLanesCount()).toEqual(4);
        expect(roundaboutBukowe.lanesNumbers()).toEqual([0, 1]);
        expect(roundaboutBukowe.laneRadius(0)).toEqual(28 + 4.5/2);
        expect(roundaboutBukowe.laneRadius(1)).toEqual(32.5 + 4.5/2);
    });

    it('counts length of lanes', () => {
        expect(roundaboutBukowe.lengthOfLane(0)).toBeCloseTo(175.93);
        expect(roundaboutBukowe.lengthOfLane(1)).toBeCloseTo(204.20);
        expect(() => { roundaboutBukowe.lengthOfLane(2) }).toThrow();
    });
});
