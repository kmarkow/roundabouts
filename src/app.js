import HelloWorld from './HelloWorld.js';
import RoundaboutDrawer from './GUI/RoundaboutDrawer.js';

var hello = new HelloWorld();
hello.sayHi();

let roundaboutDrawer = new RoundaboutDrawer();
roundaboutDrawer.drawOn(document.body);
