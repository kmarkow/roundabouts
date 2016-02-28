import {RoundaboutDrawer, ADHERENT_ROAD_LENGTH} from './GUI/RoundaboutDrawer.js';
import CellsDrawer from './GUI/CellsDrawer.js';
import UnitConverter from './GUI/UnitConverter.js';
import {roundaboutBukowe, roundaboutThreeLanes} from './RoundaboutSpecifications.js';
import {CellsMap} from './Simulation/CellsMap.js';

let unitConverter = new UnitConverter(
    roundaboutBukowe.roundaboutDiameter() + ADHERENT_ROAD_LENGTH * 2,
    Math.min(window.innerWidth, window.innerHeight)
);

let twojs = new Two({
    fullscreen: true,
    autostart: true
}).appendTo(document.body);

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
    unitConverter,
    twojs
);

let roundaboutCellsDrawer = new CellsDrawer(
    roundaboutBukowe,
    roundaboutBukoweCellsMap,
    unitConverter,
    twojs
);

roundaboutDrawer.draw();
setInterval(() => {
    roundaboutCellsDrawer.draw();
}, 1500);
