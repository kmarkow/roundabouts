import {RoundaboutDrawer} from './GUI/RoundaboutDrawer.js';
import CellsDrawer from './GUI/CellsDrawer.js';
import Translator from './GUI/Translator.js';
import UnitConverter from './GUI/UnitConverter.js';
import {roundaboutBukowe, roundaboutThreeLanes} from './Simulation/Specification/RoundaboutSpecifications.js';
import {CellsMap} from './Simulation/CellsMap.js';
import CellularAutomata from './Simulation/CellularAutomata.js';
import CellsNeighbours from './Simulation/CellsNeighbours.js';
import {DrivingRules} from './Simulation/DrivingRules.js';

let unitConverter = new UnitConverter(
    roundaboutBukowe.roundaboutDiameter() + roundaboutBukowe.adherentRoadLength() * 2,
    Math.min(window.innerWidth, window.innerHeight)
);

var canvasElement = document.getElementById("canvas");
let twojs = new Two({
    width: canvasElement.clientWidth,
    height: window.innerHeight,
    autostart: true
}).appendTo(canvasElement);

let roundaboutBukoweCellsMap = new CellsMap(
    roundaboutBukowe,
    unitConverter
);

let roundaboutThreeLanesCellsMap = new CellsMap(
    roundaboutThreeLanes,
    unitConverter
);

var translator = new Translator(roundaboutBukowe, unitConverter, twojs);

let roundaboutDrawer = new RoundaboutDrawer(
    roundaboutBukowe,
    unitConverter,
    twojs,
    translator
);

let roundaboutCellsDrawer = new CellsDrawer(
    roundaboutBukowe,
    roundaboutBukoweCellsMap,
    unitConverter,
    twojs,
    translator
);

var cellsNeighbours = new CellsNeighbours(
    roundaboutBukoweCellsMap.cellsCountsOnInnerRoadLanes(),
    roundaboutBukowe.adherentLanesCount() / 2,
    unitConverter.metersAsCells(roundaboutBukowe.adherentRoadLength())
);

let drivingRules = DrivingRules.newRules4(
    roundaboutBukowe.lanesCount(),
    roundaboutBukowe.adherentLanesCount()
);
let cellularAutomata = new CellularAutomata(
    roundaboutBukoweCellsMap,
    cellsNeighbours,
    drivingRules,
    roundaboutBukowe.adherentLanesCount() / 2
);

roundaboutDrawer.draw();
function nextIteration() {
    cellularAutomata.nextIteration();
    if (cellularAutomata.hasFinished()) {
        console.log("Finished simulation, ", cellularAutomata.iterations());
        return;
    }
    setTimeout(()=> {nextIteration();}, 100);
};
nextIteration();

//import {RoundaboutDrawer} from './GUI/RoundaboutDrawer.js';
//import CellsDrawer from './GUI/CellsDrawer.js';
//import Translator from './GUI/Translator.js';
//import UnitConverter from './GUI/UnitConverter.js';
//import {roundaboutBukowe, roundaboutThreeLanes} from './Simulation/Specification/RoundaboutSpecifications.js';
//import {CellsMap} from './Simulation/CellsMap.js';
//import CellularAutomata from './Simulation/CellularAutomata.js';
//import CellsNeighbours from './Simulation/CellsNeighbours.js';
//import {DrivingRules} from './Simulation/DrivingRules.js';
//import {range} from './JsWhyYouNoImplement.js';
//
//let unitConverter = new UnitConverter(
//    roundaboutBukowe.roundaboutDiameter() + roundaboutBukowe.adherentRoadLength() * 2,
//    Math.min(200, 200)
//);
//
//let roundaboutBukoweCellsMap = new CellsMap(
//    roundaboutBukowe,
//    unitConverter
//);
//
//var cellsNeighbours = new CellsNeighbours(
//    roundaboutBukoweCellsMap.cellsCountsOnInnerRoadLanes(),
//    roundaboutBukowe.adherentLanesCount() / 2,
//    unitConverter.metersAsCells(roundaboutBukowe.adherentRoadLength())
//);
//
//
//let drivingRules = [
//    DrivingRules.newRules1(
//        roundaboutBukowe.lanesCount(),
//        roundaboutBukowe.adherentLanesCount()
//    ),
//    DrivingRules.newRules2(
//        roundaboutBukowe.lanesCount(),
//        roundaboutBukowe.adherentLanesCount()
//    ),
//    DrivingRules.newRules3(
//        roundaboutBukowe.lanesCount(),
//        roundaboutBukowe.adherentLanesCount()
//    ),
//    DrivingRules.newRules4(
//        roundaboutBukowe.lanesCount(),
//        roundaboutBukowe.adherentLanesCount()
//    )
//];
//drivingRules.forEach(drivingRule => {
//
//    var results = [];
//    range(0, 20).forEach(() => {
//        let cellularAutomata = new CellularAutomata(
//            roundaboutBukoweCellsMap,
//            cellsNeighbours,
//            drivingRule,
//            roundaboutBukowe.adherentLanesCount() / 2
//        );
//
//        while (!cellularAutomata.hasFinished()) {
//            cellularAutomata.nextIteration();
//        }
//        results.push(cellularAutomata.iterations());
//    });
//
//    console.log("Finished simulation: ",  results.join(","));
//});
