function compPmos() {

    maxCount.PMOS -= 1
    if (maxCount.PMOS < 0) {
        document.getElementById('error-container').style.display = 'flex'
        return
    }

    //  keep tracking count
    const id = "pmos" + count.PMOS;
    count.PMOS += 1;
    const container = document.getElementById("diagram");

    // render in workspace
    const d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84" ><g><path d="M 31 61 L 31 21" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 41 61 L 41 21" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 41 31 L 61 31 L 61 1" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 61 81 L 61 51 L 41 51" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 1 41 L 17.67 41" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><ellipse cx="23.02" cy="40.11" rx="5.357142857142858" ry="5.357142857142858" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" pointer-events="all"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.midterminal = 1;
    d.outterminal = 1;
    d.voltage = 0;
    d.outvoltage = 0;
    // d.number = count1;
    // Added javasript objects and their properties
    const d1 = new Object();
    d1.id = id;
    d1.voltage = 0;
    d1.midterminal = 1;
    d1.outterminal = 1;
    d1.outvoltage = 0;

    container.insertAdjacentElement("afterbegin", d);
    jsplumbInstance.draggable(id, { "containment": true });


    listPmos.push(d1);
    addInstancePmos(id);

}

function compNmos() {
    maxCount.NMOS -= 1
    if (maxCount.NMOS < 0) {
        document.getElementById('error-container').style.display = 'flex'
        return
    }

    const id = "nmos" + count.NMOS;


    const d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -0.5 84 84"><g><path d="M 31 61 L 31 21" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 41 61 L 41 21" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 41 31 L 61 31 L 61 1" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 61 81 L 61 51 L 41 51" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 1 41 L 31 41" fill="none" stroke="rgb(0, 0, 0)" stroke-width="3" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = 0;
    d.midterminal = 1;
    d.outterminal = 1;
    d.outvoltage = 0;
    count.NMOS += 1;
    const container = document.getElementById("diagram");


    const d1 = new Object();
    d1.id = id;
    d1.voltage = 0;
    d1.midterminal = 1;
    d1.outterminal = 1;
    d1.outvoltage = 0;

    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listNmos.push(d1);

    addInstanceNmos(id);


}

function compVdd() {
    maxCount.VDD -= 1
    if (maxCount.VDD < 0) {
        document.getElementById('error-container').style.display = 'flex'
        return
    }

    const id = "vdd" + count.VDD;

    const d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 -6 44 34" ><g><path d="M 21 31 L 21 1 L 1 1 L 41 1" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = 1;
    count.VDD += 1;

    const d1 = new Object();
    d1.id = id;
    d1.voltage = 1;

    const container = document.getElementById("diagram");


    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listVdd.push(d1);

    addInstanceVdd(id);


}

function compGround() {

    maxCount.Ground -= 1
    if (maxCount.Ground < 0) {
        document.getElementById('error-container').style.display = 'flex'
        return
    }

    const id = "ground" + count.Ground;

    const container = document.getElementById("diagram");

    const d = document.createElement('div');
    d.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-0.5 8 64 44" ><g><path d="M 31 1 L 31 21 L 1 21 L 61 21" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2.5" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 11 31 L 51 31" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2.5" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 21 41 L 41 41" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2.5" stroke-miterlimit="10" pointer-events="stroke"/></g></svg>'
    d.id = id;
    d.className = 'component';
    d.voltage = 0;
    count.Ground += 1;

    const d1 = new Object();
    d1.id = id;
    d1.voltage = 0;



    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listGround.push(d1);

    addInstanceGround(id);



}

! function(e, t) {
    "use strict";
    var n = null,
        a = "ontouchstart" in e || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
        i = a ? "touchstart" : "mousedown",
        o = a ? "touchend" : "mouseup",
        m = a ? "touchmove" : "mousemove",
        u = 0,
        r = 0,
        s = 10,
        c = 10;

    function l(i) {
        v(i);
        var m = i.target,
            u = parseInt(m.getAttribute("data-long-press-delay") || "1500", 10);
        n = function(t, n) {
            if (!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame)) return e.setTimeout(t, n);
            var a = (new Date).getTime(),
                i = {},
                o = function() {
                    (new Date).getTime() - a >= n ? t.call() : i.value = requestAnimFrame(o)
                };
            return i.value = requestAnimFrame(o), i
        }(function(e) {
            v();
            var n = a ? e.touches[0].clientX : e.clientX,
                i = a ? e.touches[0].clientY : e.clientY;
            this.dispatchEvent(new CustomEvent("long-press", { bubbles: !0, cancelable: !0, detail: { clientX: n, clientY: i } })) && t.addEventListener(o, function e(n) {
                t.removeEventListener(o, e, !0),
                    function(e) { e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation() }(n)
            }, !0)
        }.bind(m, i), u)
    }

    function v(t) {
        var a;
        (a = n) && (e.cancelAnimationFrame ? e.cancelAnimationFrame(a.value) : e.webkitCancelAnimationFrame ? e.webkitCancelAnimationFrame(a.value) : e.webkitCancelRequestAnimationFrame ? e.webkitCancelRequestAnimationFrame(a.value) : e.mozCancelRequestAnimationFrame ? e.mozCancelRequestAnimationFrame(a.value) : e.oCancelRequestAnimationFrame ? e.oCancelRequestAnimationFrame(a.value) : e.msCancelRequestAnimationFrame ? e.msCancelRequestAnimationFrame(a.value) : clearTimeout(a)), n = null
    }
    "function" != typeof e.CustomEvent && (e.CustomEvent = function(e, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = t.createEvent("CustomEvent"); return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a }, e.CustomEvent.prototype = e.Event.prototype), e.requestAnimFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) { e.setTimeout(t, 1e3 / 60) }, t.addEventListener(o, v, !0), t.addEventListener(m, function(e) {
        var t = Math.abs(u - e.clientX),
            n = Math.abs(r - e.clientY);
        (t >= s || n >= c) && v()
    }, !0), t.addEventListener("wheel", v, !0), t.addEventListener("scroll", v, !0), t.addEventListener(i, function(e) { u = e.clientX, r = e.clientY, l(e) }, !0)
}(window, document);

function compInput0() {
    const id = "input0";
    const d = document.createElement('div');
    d.innerHTML = 'Input 1<br>1'
    d.id = id;
    d.className = 'io-component';
    d.style.top = "1.25rem";
    d.style.left = "0.625rem";
    d.classList.add("high");
    d.addEventListener("dblclick", () => {
        k = document.getElementById("input0")
        if (k.classList.contains("high")) {
            k.classList.remove("high")
            k.classList.add("low")
            k.innerHTML = 'Input 1<br>0'
            listInput[0].input = 0;
        } else {
            k.classList.remove("low")
            k.classList.add("high")
            k.innerHTML = 'Input 1<br>1'
            listInput[0].input = 1;
        }
    })
    d.addEventListener("long-press", () => {
        k = document.getElementById("input0")
        if (k.classList.contains("high")) {
            k.classList.remove("high")
            k.classList.add("low")
            k.innerHTML = 'Input 1<br>0'
            listInput[0].input = 0;
        } else {
            k.classList.remove("low")
            k.classList.add("high")
            k.innerHTML = 'Input 1<br>1'
            listInput[0].input = 1;
        }
    })
    d.input = 0;
    d.voltage = 5;
    const container = document.getElementById("diagram");

    const d1 = new Object();
    d1.id = id;
    d1.input = 1;
    d1.voltage = 5;

    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listInput.push(d1);

    addInstanceFinalInput(id);

}

function compInput1() {
    const id = "input1";
    const d = document.createElement('div');
    d.innerHTML = 'Input 2<br>1'
    d.id = id;
    d.className = 'io-component';
    d.style.top = "9rem";
    d.style.left = "0.625rem";
    d.classList.add("high");
    d.addEventListener("dblclick", () => {
        k = document.getElementById("input1")
        if (k.classList.contains("high")) {
            k.classList.remove("high")
            k.classList.add("low")
            k.innerHTML = 'Input 2<br>0'
            listInput[1].input = 0;
        } else {
            k.classList.remove("low")
            k.classList.add("high")
            k.innerHTML = 'Input 2<br>1'
            listInput[1].input = 1;
        }
    })
    d.addEventListener("long-press", () => {
        k = document.getElementById("input1")
        if (k.classList.contains("high")) {
            k.classList.remove("high")
            k.classList.add("low")
            k.innerHTML = 'Input 2<br>0'
            listInput[1].input = 0;
        } else {
            k.classList.remove("low")
            k.classList.add("high")
            k.innerHTML = 'Input 2<br>1'
            listInput[1].input = 1;
        }
    })
    d.input = 0;
    d.voltage = 5;
    const container = document.getElementById("diagram");

    const d1 = new Object();
    d1.id = id;
    d1.input = 1;
    d1.voltage = 5;

    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listInput.push(d1);

    addInstanceFinalInput(id);

}

function compOutput() {
    const id = "output0";
    const d = document.createElement('div');
    d.innerHTML = 'Output<br>-'
    d.id = id;
    d.className = 'io-component';
    d.style.top = "1.25rem";
    d.style.right = "0.625rem";
    d.outputsign = 1;
    d.voltage = 0;

    const d1 = new Object();
    d1.id = id;
    d1.voltage = 0;
    d1.outputsign = 1;
    const container = document.getElementById("diagram");


    container.insertAdjacentElement("afterbegin", d);

    jsplumbInstance.draggable(id, { "containment": true });
    listOutput.push(d1);

    addInstanceFinalOutput(id);
}
