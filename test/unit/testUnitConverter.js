import UnitConverter from '../../src/GUI/UnitConverter.js';

describe("Test conversion between meters and pixels", function() {

    let roundaboutMeters = 119;
    let roundaboutPixels = 800;
    var unitConverter ;

    beforeEach(()=>{
        unitConverter  = new UnitConverter(
            roundaboutMeters,
            roundaboutPixels
        );
    });

    it('Counts pixels to meters ratio', () => {
        expect(unitConverter.pixelsPerMeter()).toEqual(6);
    });

    it('Converts meters to pixels', () => {
        expect(unitConverter.metersAsPixels(10)).toEqual(60);
    });
});
