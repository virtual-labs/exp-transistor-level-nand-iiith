'use strict';
import { listPmos, listNmos,listInput, listOutput, listGround ,listVdd, refreshObservations } from './main.js';
import { jsplumbInstance,addInstanceFinalInput,addInstanceFinalOutput } from './components.js';
import { addInstanceGround, addInstanceVdd, addInstancePmos, addInstanceNmos } from './components.js';
import { checkAndUpdate } from './circuit.js';
import { modifyOutput, circuitValid,showTruthTable} from './nand.js';

let count = { PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
let maxCount = { PMOS: 2, NMOS: 2, VDD: 1, Ground: 1, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };

window.compPmos=compPmos;
window.compNmos=compNmos;
window.compVdd=compVdd;
window.compGround=compGround;
window.nandValid=nandValid;

export function resetCounts() {
    count = { PMOS: 0, NMOS: 0, VDD: 0, Ground: 0, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
    maxCount = { PMOS: 2, NMOS: 2, VDD: 1, Ground: 1, Inverter: 0, Mux: 0, Latch: 0, Transistor: 0, Clock: 0, Clockbar: 0 };
}
export function nandValid() {
    refreshObservations();
    checkAndUpdate();
    modifyOutput();
    circuitValid();
    showTruthTable();
}
function printExcessComponents() {
    const result = document.getElementById("error-container");
    result.innerHTML = "Required no. of components of this type are already present in the workspace";
    result.className = "text-danger";
}
function compPmos() {
    maxCount.PMOS -= 1;
    if (maxCount.PMOS < 0) {
        printExcessComponents();
        return;
    }

    //  keep tracking count
    const id = "pmos" + count.PMOS;
    count.PMOS += 1;
    const container = document.getElementById("diagram");

    // render in workspace
    const svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84" >
            <g class="demo-transistor">
                <path d="M 31 61 L 31 21"/>
                <path d="M 41 61 L 41 21"/>
                <path d="M 41 31 L 61 31 L 61 1"/>
                <path d="M 61 81 L 61 51 L 41 51"/>
                <path d="M 1 41 L 17.67 41"/>
                <ellipse cx="23.02" cy="40.11" rx="5.357142857142858" ry="5.357142857142858"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.midTerminal = 1;
    svgElement.outTerminal = 1;
    svgElement.voltage = 0;
    svgElement.outVoltage = 0;
    // d.number = count1;
    // Added javasript objects and their properties
    const divPushed = {};
    divPushed.id = id;
    divPushed.voltage = 0;
    divPushed.midTerminal = 1;
    divPushed.outTerminal = 1;
    divPushed.outVoltage = 0;

    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });

    listPmos.push(divPushed);
    addInstancePmos(id);
}

function compNmos() {
    maxCount.NMOS -= 1;
    if (maxCount.NMOS < 0) {
        printExcessComponents();
        return;
    }

    const id = "nmos" + count.NMOS;

    const svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84">
            <g class="demo-transistor">
                <path d="M 31 61 L 31 21"/>
                <path d="M 41 61 L 41 21"/>
                <path d="M 41 31 L 61 31 L 61 1"/>
                <path d="M 61 81 L 61 51 L 41 51"/>
                <path d="M 1 41 L 31 41"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 0;
    svgElement.midTerminal = 1;
    svgElement.outTerminal = 1;
    svgElement.outVoltage = 0;
    count.NMOS += 1;
    const container = document.getElementById("diagram");

    const divPushed = {};
    divPushed.id = id;
    divPushed.voltage = 0;
    divPushed.midTerminal = 1;
    divPushed.outTerminal = 1;
    divPushed.outVoltage = 0;

    container.insertAdjacentElement("afterbegin", svgElement);

    jsplumbInstance.draggable(id, { "containment": true });
    listNmos.push(divPushed);

    addInstanceNmos(id);
}

function compVdd() {
    maxCount.VDD -= 1;
    if (maxCount.VDD < 0) {
        printExcessComponents();
        return;
    }

    const id = "vdd" + count.VDD;

    const svgElement = document.createElement('div');
    svgElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -6 44 34" >
            <g class="demo-transistor">
                <path d="M 21 31 L 21 1 L 1 1 L 41 1"/>
            </g>
        </svg>`;
    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 1;
    count.VDD += 1;

    const divPushed = {};
    divPushed.id = id;
    divPushed.voltage = 1;
    const container = document.getElementById("diagram");

    container.insertAdjacentElement("afterbegin", svgElement);
    jsplumbInstance.draggable(id, { "containment": true });
    listVdd.push(divPushed);

    addInstanceVdd(id);
}

function compGround() {

    maxCount.Ground -= 1;
    if (maxCount.Ground < 0) {
        printExcessComponents();
        return;
    }

    const id = "ground" + count.Ground;
    const container = document.getElementById("diagram");

    const svgElement = document.createElement('div');
    svgElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 8 64 44" >
        <g class="demo-transistor">
            <path d="M 31 1 L 31 21 L 1 21 L 61 21"/>
            <path d="M 11 31 L 51 31"/>
            <path d="M 21 41 L 41 41"/>
        </g>
    </svg>`;    svgElement.id = id;
    svgElement.className = 'component';
    svgElement.voltage = 0;
    count.Ground += 1;

    const divPushed = {};
    divPushed.id = id;
    divPushed.voltage = 0;

    container.insertAdjacentElement("afterbegin", svgElement);

    jsplumbInstance.draggable(id, { "containment": true });
    listGround.push(divPushed);

    addInstanceGround(id);
}


export function compInput0() {
    const id = "input0";
    const svgElement = document.createElement('div');
    svgElement.innerHTML = 'Input 1<br>1';
    svgElement.id = id;
    svgElement.className = 'io-component';
    svgElement.style.top = "1.25rem";
    svgElement.style.left = "0.625rem";
    svgElement.classList.add("high");
    svgElement.addEventListener("dblclick", () => {
        const divInput0 = document.getElementById("input0");
        if (divInput0.classList.contains("high")) {
            divInput0.classList.remove("high");
            divInput0.classList.add("low");
            divInput0.innerHTML = 'Input 1<br>0';
            listInput[0].input = 0;
        } else {
            divInput0.classList.remove("low");
            divInput0.classList.add("high");
            divInput0.innerHTML = 'Input 1<br>1';
            listInput[0].input = 1;
        }
    });
    svgElement.addEventListener("long-press", () => {
        const divInput0 = document.getElementById("input0");
        if (divInput0.classList.contains("high")) {
            divInput0.classList.remove("high");
            divInput0.classList.add("low");
            divInput0.innerHTML = 'Input 1<br>0';
            listInput[0].input = 0;
        } else {
            divInput0.classList.remove("low");
            divInput0.classList.add("high");
            divInput0.innerHTML = 'Input 1<br>1';
            listInput[0].input = 1;
        }
    });
    svgElement.input = 0;
    svgElement.voltage = 5;
    const container = document.getElementById("diagram");

    const divPushed = {};
    divPushed.id = id;
    divPushed.input = 1;
    divPushed.voltage = 5;

    container.insertAdjacentElement("afterbegin", svgElement);

    jsplumbInstance.draggable(id, { "containment": true });
    listInput.push(divPushed);

    addInstanceFinalInput(id);

}

export function compInput1() {
    const id = "input1";
    const svgElement = document.createElement('div');
    svgElement.innerHTML = 'Input 2<br>1';
    svgElement.id = id;
    svgElement.className = 'io-component';
    svgElement.style.top = "9rem";
    svgElement.style.left = "0.625rem";
    svgElement.classList.add("high");
    svgElement.addEventListener("dblclick", () => {
        const divInput1 = document.getElementById("input1");
        if (divInput1.classList.contains("high")) {
            divInput1.classList.remove("high");
            divInput1.classList.add("low");
            divInput1.innerHTML = 'Input 2<br>0';
            listInput[1].input = 0;
        } else {
            divInput1.classList.remove("low");
            divInput1.classList.add("high");
            divInput1.innerHTML = 'Input 2<br>1';
            listInput[1].input = 1;
        }
    });
    svgElement.addEventListener("long-press", () => {
        const divInput1 = document.getElementById("input1");
        if (divInput1.classList.contains("high")) {
            divInput1.classList.remove("high");
            divInput1.classList.add("low");
            divInput1.innerHTML = 'Input 2<br>0';
            listInput[1].input = 0;
        } else {
            divInput1.classList.remove("low");
            divInput1.classList.add("high");
            divInput1.innerHTML = 'Input 2<br>1';
            listInput[1].input = 1;
        }
    });
    svgElement.input = 0;
    svgElement.voltage = 5;
    const container = document.getElementById("diagram");

    const divPushed = {};
    divPushed.id = id;
    divPushed.input = 1;
    divPushed.voltage = 5;

    container.insertAdjacentElement("afterbegin", svgElement);

    jsplumbInstance.draggable(id, { "containment": true });
    listInput.push(divPushed);

    addInstanceFinalInput(id);
}

export function compOutput() {
    const id = "output0";
    const svgElement = document.createElement('div');
    svgElement.innerHTML = 'Output<br>-';
    svgElement.id = id;
    svgElement.className = 'io-component';
    svgElement.style.top = "1.25rem";
    svgElement.style.right = "0.625rem";
    svgElement.outputsign = 1;
    svgElement.voltage = 0;

    const divPushed = {};
    divPushed.id = id;
    divPushed.voltage = 0;
    divPushed.outputsign = 1;
    const container = document.getElementById("diagram");

    container.insertAdjacentElement("afterbegin", svgElement);

    jsplumbInstance.draggable(id, { "containment": true });
    listOutput.push(divPushed);

    addInstanceFinalOutput(id);
}