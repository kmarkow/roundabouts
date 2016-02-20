import {RoundaboutDrawer, ADHERENT_ROAD_LENGTH} from './GUI/RoundaboutDrawer.js';
import UnitConverter from './GUI/UnitConverter.js';
import {roundaboutBukowe, roundaboutThreeLanes} from './RoundaboutSpecifications.js';

let unitConverter = new UnitConverter(
    roundaboutBukowe.roundaboutDiameter() + ADHERENT_ROAD_LENGTH * 2,
    Math.min(window.innerWidth, window.innerHeight)
);
let roundaboutDrawer = new RoundaboutDrawer(
    roundaboutBukowe,
    unitConverter,
    document.body
);
roundaboutDrawer.draw();
