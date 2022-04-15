// This function checks map when called

function checkAndUpdate() {
    // these variables are for pseudo nmos circuit
    nmosNand = 0;
    pmosNand = 0;
    listOutput[0].voltage = 0;
    // if any vdd is connected to any pmos store voltage
    for (i = 0; i < listVdd.length; i++) {
        for (j = 0; j < listPmos.length; j++) {
            const r = listVdd[i].id.concat("$", listPmos[j].id);
            if (connectionMap.has(r)) {
                listPmos[j].voltage = 5;

            }
        }

    }
    // if any ground is connected to any pmos store voltage
    for (i = 0; i < listGround.length; i++) {
        for (j = 0; j < listPmos.length; j++) {
            const r = listGround[i].id.concat("$", listPmos[j].id);
            if (connectionMap.has(r)) {
                listPmos[j].voltage = -5;

            }
        }

    }
    // if amy vdd is connected to nmos store that voltage
    for (i = 0; i < listVdd.length; i++) {
        for (j = 0; j < listNmos.length; j++) {
            const r = listVdd[i].id.concat("$", listNmos[j].id);
            if (connectionMap.has(r)) {
                listNmos[j].voltage = 5;

            }
        }

    }
    for (i = 0; i < listGround.length; i++) {
        for (j = 0; j < listNmos.length; j++) {
            const r = listGround[i].id.concat("$", listNmos[j].id);
            if (connectionMap.has(r)) {
                listNmos[j].voltage = -5;

            }
        }

    }
    for (i = 0; i < listInput.length; i++) {
        for (j = 0; j < listPmos.length; j++) {
            const r = listInput[i].id.concat("$", listPmos[j].id);
            if (connectionMap.has(r)) {
                if (listInput[i].input === 0) {

                    if (listPmos[j].voltage === 5) {
                        listPmos[j].outvoltage = 5;
                    }
                    else {
                        if (listPmos[j].voltage === 0) {
                            listPmos[j].outvoltage = 9;
                        }
                        else {
                            listPmos[j].outvoltage = -5;
                        }

                        //listPmos[j].outvoltage = 5;
                    }
                    console.log("Voltage stored in pmos");

                    listPmos[j].outterminal = 1;
                    console.log(listPmos[j].outterminal)
                }
                else {
                    listPmos[j].outterminal = -1;
                    console.log(listPmos[j].outterminal)
                    console.log("Pmos disabled");
                    listPmos[j].outvoltage = 0;
                }


            }
        }

    }
    for (i = 0; i < listInput.length; i++) {
        for (j = 0; j < listNmos.length; j++) {
            const r = listInput[i].id.concat("$", listNmos[j].id);
            // check if connectionMap have the given nmos input connection
            if (connectionMap.has(r)) {
                listNmos[j].midterminal = 1;
                // if input signal is one
                if (listInput[i].input === 1) {
                    if (listNmos[j].voltage === -5) {
                        listNmos[j].outvoltage = -5;
                    }
                    else {
                        if (listNmos[j].voltage === 0) {
                            listNmos[j].outvoltage = -9;
                        }
                        else {
                            listNmos[j].outvoltage = 5;
                        }

                    }
                    listNmos[j].outterminal = 1;

                    //console.log("Voltage stored in nmos");
                }
                else {
                    listNmos[j].outterminal = 0;
                    listNmos[j].midterminal = 1;
                    // listNmos[j].outvoltage = 0;
                    // console.log("Nmos disabled");
                }

            }
            else {  // no carrying of voltage
                listNmos[j].midterminal = 0;

            }
        }

    }

    for (i = 0; i < listPmos.length; i++) {
        for (j = 0; j < listOutput.length; j++) {
            const r = listPmos[i].id.concat("$", listOutput[j].id);

            if (connectionMap.has(r)) {

                if (listPmos[i].outterminal === 1) {
                    listOutput[j].voltage = listPmos[i].outvoltage;
                    pmosNand++;
                    console.log("Pmos succesfully conducted");
                    console.log(listOutput[j].voltage)
                }
                if (listPmos[i].outterminal === -1) {
                    listOutput[j].voltage = listPmos[i].outvoltage;

                }

            }
        }

    }
    // if any nmos is connected to output then the voltages are propogated based on input signals
    for (i = 0; i < listNmos.length; i++) {
        for (j = 0; j < listOutput.length; j++) {
            const r = listNmos[i].id.concat("$", listOutput[j].id);
            if (connectionMap.has(r)) {
                // if nmos 
                if (listNmos[i].outterminal === 1) {
                    listOutput[j].voltage = listNmos[i].outvoltage;
                    nmosNand++;
                    console.log("Nmos succesfully conducted");
                }



            }
        }

    }




}
// if any input is connected to volatge then based on the input signal we check if nmos conducts or not

// similar case for pmos

/*function check1() {

    
    console.log(listOutput[0].voltage)
    circuitvalid()


}*/

function getTruthValue() {
    out = listOutput[0].voltage
    k = document.getElementById("input0")
    psNmosCircuitValid = checkPseudoNmos()
    nandCircuitValid = checkNand()
    if (listInput[0].input === 0 && psNmosCircuitValid === 1) {
        return "1"
    }
    else if (listInput[0].input === 1 && psNmosCircuitValid === 1) {
        return "0"
    }
    if(listInput[0].input === 0 && listInput[1].input === 1 && nandCircuitValid === 1) {
        return "1"
    }
    else if(listInput[0].input === 1 && listInput[1].input === 0 && nandCircuitValid === 1) {
        return "1"
    }
    if (out === 5 || out === 9) {
        return "1"
    }
    else if (out === -5 || out === -9) {
        return "0"
    }
    else {
        return "-"
    }
}
