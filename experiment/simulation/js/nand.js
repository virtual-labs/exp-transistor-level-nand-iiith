function nandValid() {
    checkAndUpdate()
    modifyOutput()
    circuitValid()
    showTruthTable()
    document.getElementById('error-container').style = 'display:none;';
    // document.getElementById('error-container').style.display='flex'
    // window.setTimeout("document.getElementById('error-container').style='display:none !important;';", 5000)
}

function checkNand() {
    const x = permutator([0, 1])
    let nandCircuitValid = 0
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x.length; j++) {
            for (let k = 0; k < x.length; k++) {
                if (connectionMap.has("input" + x[i][0] + "$pmos" + x[j][0]) && connectionMap.has("input" + x[i][1] + "$pmos" + x[j][1]) && connectionMap.has("input" + x[i][0] + "$nmos" + x[k][0]) && connectionMap.has("input" + x[i][1] + "$nmos" + x[k][1]) && connectionMap.has("vdd0$pmos" + x[j][0]) && connectionMap.has("vdd0$pmos" + x[j][1]) && connectionMap.has("ground0$nmos" + x[k][1]) && connectionMap.has("pmos" + x[j][0] + "$output0") && connectionMap.has("pmos" + x[j][1] + "$output0") && connectionMap.has("nmos" + x[k][0] + "$output0") && connectionMap.has("nmos" + x[k][1] + "$nmos" + x[k][0]) && (connectionMap.size === 11)) {
                    nandCircuitValid = 1
                }
            }
            if (nandCircuitValid === 1) {
                break
            }
        }
        if (nandCircuitValid === 1) {
            break
        }
    }
    return nandCircuitValid

}

function checkNor() {
    const x = permutator([0, 1])
    let norCircuitValid = 0
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x.length; j++) {
            for (let k = 0; k < x.length; k++) {
                if (connectionMap.has("input" + x[i][0] + "$pmos" + x[j][0]) && connectionMap.has("input" + x[i][1] + "$pmos" + x[j][1]) && connectionMap.has("input" + x[i][0] + "$nmos" + x[k][0]) && connectionMap.has("input" + x[i][1] + "$nmos" + x[k][1]) && connectionMap.has("vdd0$pmos" + x[j][0]) && connectionMap.has("ground0$nmos" + x[k][0]) && connectionMap.has("ground0$nmos" + x[k][1]) && connectionMap.has("pmos" + x[j][1] + "$output0") && connectionMap.has("nmos" + x[k][1] + "$output0") && connectionMap.has("nmos" + x[k][0] + "$output0") && connectionMap.has("pmos" + x[j][0] + "$pmos" + x[j][1]) && (connectionMap.size === 11)) {
                    norCircuitValid = 1
                }
            }
            if (norCircuitValid === 1) {
                break
            }
        }
        if (norCircuitValid === 1) {
            break
        }
    }
    return norCircuitValid
}

function modifyOutput() {
    a = document.getElementById("output0")
    a.innerHTML = 'Output<br>' + getTruthValue()
}

function permutator(inputArr) {
    const results = [];

    function permute(arr, memo) {
        let cur

        memo = memo || [];

        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

function checkPseudoNmos() {
    x = permutator([0, 1])
    console.log("x", x)
    let psNmosCircuitValid = 0
    for (let i = 0; i < x.length; i++) {
        if (connectionMap.has("vdd0$pmos0") && connectionMap.has("ground" + x[i][0] + "$pmos0") && connectionMap.has("pmos0$output0") && connectionMap.has("input0$nmos0") && connectionMap.has("nmos0$output0") && connectionMap.has("ground" + x[i][1] + "$nmos0")) {
            psNmosCircuitValid = 1
            break
        }
    }
    return psNmosCircuitValid
}

function circuitValid() {
    nandCircuitValid = checkNand()
    norCircuitValid = checkNor()
    // check if correct nand gate is made using correct components
    if (selectedTab === currentTab.NAND && nandCircuitValid) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
    }
    else if (selectedTab === currentTab.NOR && norCircuitValid) {
        changeObservation("&#10004; Circuit is correct", 'text-danger', 'text-success')
    }
    else {
        changeObservation("&#10060; Circuit is incorrect", 'text-success', 'text-danger')
    }
}

function changeObservation(htmlText, removedClass, addedClass) {
    document.getElementById("output-box").innerHTML = htmlText
    document.getElementById("output-box").classList.remove(removedClass)
    document.getElementById("output-box").classList.add(addedClass)
}

function showTruthTable() {
    const output = [0, 0, 0, 0];
    a = document.getElementById("table-body")
    k = document.getElementById("input0")
    l = document.getElementById("input1")
    let initialInput0 = 0
    let initialInput1 = 0
    if (k.classList.contains("high")) {
        initialInput0 = 1
    }
    if (l.classList.contains("high")) {
        initialInput1 = 1
    }
    listInput[0].input = 0;
    listInput[1].input = 0;
    checkAndUpdate()
    output[0] = getTruthValue()
    listInput[0].input = 0;
    listInput[1].input = 1;
    checkAndUpdate()
    output[1] = getTruthValue()
    listInput[0].input = 1;
    listInput[1].input = 0;
    checkAndUpdate()
    output[2] = getTruthValue()
    listInput[0].input = 1;
    listInput[1].input = 1;
    checkAndUpdate()
    output[3] = getTruthValue()
    if (selectedTab === 0) {
        a.innerHTML = "<tr><td>0</td><td>0</td><td>1</td><td>" + output[0] + "</td></tr>" + "<tr><td>0</td><td>1</td><td>1</td><td>" + output[1] + "</td></tr>" + "<tr><td>1</td><td>0</td><td>1</td><td>" + output[2] + "</td></tr>" + "<tr><td>1</td><td>1</td><td>0</td><td>" + output[3] + "</td></tr>"
    }
    else {
        a.innerHTML = "<tr><td>0</td><td>0</td><td>1</td><td>" + output[0] + "</td></tr>" + "<tr><td>0</td><td>1</td><td>0</td><td>" + output[1] + "</td></tr>" + "<tr><td>1</td><td>0</td><td>0</td><td>" + output[2] + "</td></tr>" + "<tr><td>1</td><td>1</td><td>0</td><td>" + output[3] + "</td></tr>"
    }
    listInput[0].input = initialInput0;
    listInput[1].input = initialInput1;
    checkAndUpdate()
}
