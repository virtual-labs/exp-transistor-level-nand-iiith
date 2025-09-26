### NAND Gate

The NAND gate has one output and two or more inputs. The output is low only when all inputs are high; otherwise, it is high. A NAND gate can be viewed as an AND gate followed by an inverter.

**Schematic:**
<img src="images/nand_schematic.jpg">

**Truth Table:**

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 0       | 0       | 1      |
| 0       | 1       | 1      |
| 1       | 0       | 1      |
| 1       | 1       | 0      |

---

### NOR Gate

The NOR gate has one output and two or more inputs. The output is high only when all inputs are low; otherwise, it is low. A NOR gate can be viewed as an OR gate followed by an inverter.

**Schematic:**
<img src="images/nor_schematic.jpg">

**Truth Table:**

| Input A | Input B | Output |
| ------- | ------- | ------ |
| 0       | 0       | 1      |
| 0       | 1       | 0      |
| 1       | 0       | 0      |
| 1       | 1       | 0      |

---

### Series and Parallel Connections in CMOS

**Series connection of NMOS devices:**
<img src="images/table1.png" width="150px">

**Series connection of PMOS devices:**
<img src="images/table2.png" width="150px">

If switches are connected in parallel, the composite switch is closed when either or both switches are closed. The parallel connection is shown below. The table indicates the states of the switch obtained by parallel connection depending on the inputs A and B.

**Parallel connection of NMOS devices:**
<img src="images/gen_parallel.jpg" width="150px">
<img src="images/table3.png" width="150px">

**Parallel connection of PMOS devices:**
<img src="images/table4.png" width="150px">

---

By using combinations of the above constructions, CMOS combinational gates can be obtained. In the following section, Karnaugh maps for NAND and NOR have been used to determine the required combination.

### K-Map for NAND

<img src="images/theory_nand.jpg">

For NAND gate, PMOS devices are connected in parallel between Vdd and output node, whereas NMOS devices are in series between output node and ground.

### K-Map for NOR

<img src="images/theory_nor.jpg">

For NOR gate, PMOS devices are connected in series between Vdd and output node, whereas NMOS devices are in parallel between output node and ground.
