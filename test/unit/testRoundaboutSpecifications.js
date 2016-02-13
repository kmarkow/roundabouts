import {roundaboutBukowe} from '../../src/RoundaboutSpecifications.js';

describe("Test roundabout specifications", function() {

    it('Roundabout Bukowe has appropiate properties', ()=>{
        expect(roundaboutBukowe.roundaboutDiameter()).toEqual(74);
        expect(roundaboutBukowe.lanesCount()).toEqual(2);
    });
});
