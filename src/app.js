import RoundaboutDrawer from './GUI/RoundaboutDrawer.js';
import UnitConverter from './GUI/UnitConverter.js';
import {roundaboutBukowe} from './RoundaboutSpecifications.js';

let unitConverter = new UnitConverter(
    roundaboutBukowe.roundaboutHeightWithRoads(),
    Math.min(window.innerWidth, window.innerHeight)
);
let roundaboutDrawer = new RoundaboutDrawer(
    roundaboutBukowe,
    unitConverter,
    document.body
);
roundaboutDrawer.draw();
