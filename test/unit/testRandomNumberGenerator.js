import RandomNumberGenerator from '../../src/Simulation/RandomNumberGenerator';
import {range} from '../../src/JsWhyYouNoImplement.js';

describe("Test random number generator", function() {
    it('generates number within range', ()=>{
        var randomNumberGenerator = new RandomNumberGenerator();
        range(0, 5).forEach(() => {
            var number = randomNumberGenerator.intFromTo(0, 1);
            expect(number).not.toBeLessThan(0);
            expect(number).not.toBeGreaterThan(1);
        });
        range(0, 10).forEach(() => {
            var number = randomNumberGenerator.intFromTo(1, 4);
            expect(number).not.toBeLessThan(1);
            expect(number).not.toBeGreaterThan(4);
        });
    });
});
