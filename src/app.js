import {RoundaboutDrawer, ADHERENT_ROAD_LENGTH} from './GUI/RoundaboutDrawer.js';
import UnitConverter from './GUI/UnitConverter.js';
import {roundaboutBukowe, roundaboutThreeLanes} from './RoundaboutSpecifications.js';
import {CellsMap} from './Simulation/CellsMap.js';

let unitConverter = new UnitConverter(
    roundaboutBukowe.roundaboutDiameter() + ADHERENT_ROAD_LENGTH * 2,
    Math.min(window.innerWidth, window.innerHeight)
);

let roundaboutBukoweCellsMap = new CellsMap(
    roundaboutBukowe,
    unitConverter
);

let roundaboutThreeLanesCellsMap = new CellsMap(
    roundaboutThreeLanes,
    unitConverter
);

let roundaboutDrawer = new RoundaboutDrawer(
    roundaboutBukowe,
    roundaboutBukoweCellsMap,
    unitConverter,
    document.body
);
roundaboutDrawer.draw();
