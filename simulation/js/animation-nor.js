import { setCoordinates, fillInputDots, objectDisappear, objectAppear, fillColor, setColor, unsetColor } from "./animation-utility.js";
'use strict';

window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed = setSpeed;
window.setInputA = setInputA;
window.setInputB = setInputB;
// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");

// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;

// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY = "";
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");


const objects = [
    document.getElementById("inputA"),
    document.getElementById("inputB"),
    document.getElementById("output")
];
const textInput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const textOutput = [document.createElementNS(svgns, "text")];
const inputDots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
const outputDots = [
    document.createElementNS(svgns, "circle"), 
    document.createElementNS(svgns, "circle")
];

let decide = false;
let circuitStarted = false;

function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}

//initialise input text
function textIOInit() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function outputCoordinates() {
    setCoordinates(896, 455, textOutput[0]);
    svg.append(textOutput[0]);
}

function inputDotsDisappear() {
    for (const inputDot of inputDots) {
        objectDisappear(inputDot);
    }
}
function inputDotsAppear() {
    for (const inputDot of inputDots) {
        objectAppear(inputDot);
    }
}
function outputDotsDisappear() {
    for (const outputDot of outputDots) {
        objectDisappear(outputDot);
    }
}
// function to disappear the output text
function outputDisappear() {
    for (const text of textOutput) {
        objectDisappear(text);
    }
}
// function to appear the input text
function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotsDisappear();
    outputDotsDisappear();
    objectDisappear(textInput[0]);
    objectDisappear(textInput[1]);
    outputDisappear();
    for (const object of objects) {
        fillColor(object, "#008000");
    }
}

function setInputDots() {
    setter("1", inputDots[4]);
    setter("0", inputDots[5]);
    setter("0", inputDots[6]);
}

function setInputA() {
    if (timeline.progress() === 0) {
        if (textInput[0].textContent !== "0") {
            changeTo0(26, 200, 0, 0);
        }
        else{
            changeTo1(26, 200, 0, 0);
        }
        setter(textInput[0].textContent, inputDots[0]);
        setter(textInput[0].textContent, inputDots[1]);
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Simulation has finished. Press Reset to start again";
    }
    else {
        observ.innerHTML = "Simulation has started wait for it to end";
    }

}
function setInputB() {
    if (timeline.progress() === 0) {
        if (textInput[1].textContent !== "0") {
            changeTo0(195, 378, 1, 1);
        }
        else{
            changeTo1(195, 378, 1, 1);
        }
        setter(textInput[1].textContent, inputDots[2]);
        setter(textInput[1].textContent, inputDots[3]);
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Simulation has finished. Press Reset to start again";
    }
    else {
        observ.innerHTML = "Simulation has started wait for it to end";
    }
}


function changeTo1(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#03b1fc");
    objectAppear(textInput[textObject]);
    clearObservation();
}

function changeTo0(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);

    fillColor(objects[object], "#eeeb22");
    objectAppear(textInput[textObject]);
    clearObservation();
}

function reboot() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}
function display() {
    observ.innerHTML = "Simulation has finished. Press Reset to start again";
}
function setter(value, component) {
    //toggles the text content a of input/output component b
    if (value === "1") {
        unsetColor(component);
    }
    else{
        setColor(component);
    }
}

function setSpeed(speed) {
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    circuitStarted = false;
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;

}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else{
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.time() !== 0 && timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been paused.";
        decide = false;
        status.innerHTML = "Start";
        speed.selectedIndex = 0;
    }
    else{
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    if (circuitStarted) {
        timeline.play();
        timeline.timeScale(parseInt(speed.value));
        observ.innerHTML = "Simulation has started";
        decide = true;
        status.innerHTML = "Pause";
    }
    else {
        if (textInput[0].textContent !== "2" && textInput[1].textContent !== "2") {
            circuitStarted = true;
            timeline.play();
            timeline.timeScale(parseInt(speed.value));
            observ.innerHTML = "Simulation has started.";
            decide = true;
            status.innerHTML = "Pause";
        }
        else if(textInput[0].textContent === "2") {
            observ.innerHTML = "Please set the value of input A to either 0 or 1";
        }
        else if(textInput[1].textContent === "2") {
            observ.innerHTML = "Please set the value of input B to either 0 or 1";
        }
    }
}
function initOutputDots() {
    //sets the coordinates of the input dots
    for (const outputDot of outputDots) {
        fillInputDots(outputDot, 200, 200, 15, "#FF0000");
        svg.append(outputDot);
    }
}
function initInputDots() {
    //sets the coordinates of the input dots
    for (const inputDot of inputDots) {
        fillInputDots(inputDot, 200, 200, 15, "#FF0000");
        svg.append(inputDot);
    }
}

function simulator1() {
    timeline.to(inputDots[0], {
        motionPath: {
            path: "#path1",
            align: "#path1",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[1], {
        motionPath: {
            path: "#path2",
            align: "#path2",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[2], {
        motionPath: {
            path: "#path3",
            align: "#path3",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[3], {
        motionPath: {
            path: "#path4",
            align: "#path4",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[4], {
        motionPath: {
            path: "#path5",
            align: "#path5",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[5], {
        motionPath: {
            path: "#path7",
            align: "#path7",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);
    timeline.to(inputDots[6], {
        motionPath: {
            path: "#path8",
            align: "#path8",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },

        duration: 6,
        delay: 0,
        repeat: 0,
        repeatDelay: 3,
        yoyo: true,
        ease: "none",
        paused: false,

    }, 0);

}

function simulator2(){
    if(textInput[0].textContent === "0" && textInput[1].textContent==="0") {
        setter("1",outputDots[0]);
        objectAppear(outputDots[0]);
        timeline.to(outputDots[0], {
            motionPath: {
                path: "#path9",
                align: "#path9",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
    
            duration: 6,
            delay: 7,
            repeat: 0,
            repeatDelay: 3,
            yoyo: true,
            ease: "none",
            paused: false,
    
        }, 0);
        textOutput[0].textContent = "1";
    }
    else{
        if(textInput[0].textContent==="1"){
            setter("0",outputDots[0]);
            objectAppear(outputDots[0]);
            timeline.to(outputDots[0], {
                motionPath: {
                    path: "#path10",
                    align: "#path10",
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                },
        
                duration: 6,
                delay: 7,
                repeat: 0,
                repeatDelay: 3,
                yoyo: true,
                ease: "none",
                paused: false,
        
            }, 0);
            textOutput[0].textContent = "0";
        }
        if(textInput[1].textContent==="1"){
            setter("0",outputDots[1]);
            objectAppear(outputDots[1]);
            timeline.to(outputDots[1], {
                motionPath: {
                    path: "#path11",
                    align: "#path11",
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                },
        
                duration: 6,
                delay: 7,
                repeat: 0,
                repeatDelay: 3,
                yoyo: true,
                ease: "none",
                paused: false,
        
            }, 0);
            textOutput[0].textContent = "0";
        }
    }
}

function outputHandler() {
    objectAppear(textOutput[0]);
    setter(textOutput[0].textContent, objects[2]);
}


//execution starts here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
textIOInit();
outputCoordinates();
inputDotsDisappear();
outputDotsDisappear();
initInputDots();
initOutputDots();
outputDisappear();

// calling all the functions that are going to initialise
timeline.add(setInputDots, 0);
timeline.add(inputDotsAppear, 0);
timeline.add(simulator1, 0);
timeline.add(inputDotsDisappear, 8);
timeline.add(simulator2, 7);
timeline.add(outputDotsDisappear, 13);
timeline.add(outputHandler, 13);
timeline.add(display, 15);
timeline.eventCallback("onComplete", display);
timeline.pause();
inputDotsDisappear();