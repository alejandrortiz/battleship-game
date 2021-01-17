function comprobarValidezCeldasAlClicar(id, tablero) {
    return tablero[getFila(id)][id % nCeldas] == 0;
}

// Resalta las celdas hacia donde puedes introducir un barco.
function pintarCeldasResaltadas(id, elemento, filaCasillaActual, tamBarco, tablero) {
    sumaHor = tamBarco + parseInt(id);
    if (getTablero(sumaHor) != getTablero(id)) sumaHor = 0;
    sumaVer = nCeldas * tamBarco + parseInt(id);
    if (getTablero(sumaVer) != getTablero(id)) sumaVer = 0;
    restaHor = parseInt(id) - tamBarco;
    if (getTablero(restaHor) != getTablero(id)) restaHor = 0;
    restaVer = parseInt(id) - nCeldas * tamBarco;
    if (getTablero(restaVer) != getTablero(id)) restaVer = 0;

    if (tablero[getFila(id)][id % nCeldas] == 0) {
        // Direccion hacia la DERECHA
        if (filaCasillaActual == getFila(sumaHor) && tablero[getFila(sumaHor)][sumaHor % nCeldas] == 0 && comprobarValidezCeldasCrearBarco(id, 2, tablero)) {
            document.getElementById(sumaHor).style.backgroundColor = resaltar;
            estoyColocando = true;
            sHorR = true;
            lastId = id;
            elemento.style.backgroundColor = barco;
        } else if (tablero[getFila(sumaHor)][sumaHor % nCeldas] == 2) sHorR = false;
        // Direccion hacia la IZQUIERDA
        if (filaCasillaActual == getFila(restaHor) && tablero[getFila(restaHor)][restaHor % nCeldas] == 0 && comprobarValidezCeldasCrearBarco(id, 4, tablero) && restaHor != 0) {
            document.getElementById(restaHor).style.backgroundColor = resaltar;
            estoyColocando = true;
            rHorR = true;
            lastId = id;
            elemento.style.backgroundColor = barco;
        } else if (tablero[getFila(restaHor)][restaHor % nCeldas] == 2) rHorR = false;
        // Direccion hacia ABAJO
        if ((getTablero(sumaVer) == 2 || getTablero(sumaVer) == 4) && tablero[getFila(sumaVer)][sumaVer % nCeldas] == 0 && comprobarValidezCeldasCrearBarco(id, 3, tablero)) {
            document.getElementById(sumaVer).style.backgroundColor = resaltar;
            estoyColocando = true;
            sVerR = true;
            lastId = id;
            elemento.style.backgroundColor = barco;
        } else if (tablero[getFila(sumaVer)][sumaVer % nCeldas] == 2) sVerR = false;
        // Direccion hacia ARRIBA
        if ((getTablero(restaVer) == 2 || getTablero(restaVer) == 4) && tablero[getFila(restaVer)][restaVer % nCeldas] == 0 && comprobarValidezCeldasCrearBarco(id, 1, tablero)) {
            document.getElementById(restaVer).style.backgroundColor = resaltar;
            estoyColocando = true;
            rVerR = true;
            lastId = id;
            elemento.style.backgroundColor = barco;
        } else if (tablero[getFila(restaVer)][restaVer % nCeldas] == 2) rVerR = false;

    }
}

// Comprueba si las celdas dentro del intervalo seleccionado al crear un barco no estan ocupadas ya por otro barco.
function comprobarValidezCeldasCrearBarco(id, direccion, tablero) {
    switch (direccion) {
        case 1:// Direccion hacia ARRIBA.
            for (var y = id; y >= restaVer; y -= nCeldas)
                if (tablero[getFila(y)][y % nCeldas] != 0) return false;
            break;
        case 2:// Direccion hacia DERECHA.
            for (var i = id; i <= sumaHor; i++)
                if (tablero[getFila(i)][i % nCeldas] != 0) return false;
            break;
        case 3: // Direccion hacia ABAJO.
            for (var k = sumaVer; k >= id; k -= nCeldas)
                if (tablero[getFila(k)][k % nCeldas] != 0) return false;
            break;
        case 4: // Direccion hacia IZQUIERDA.
            for (var x = restaHor; x < id; x++)
                if (tablero[getFila(x)][x % nCeldas] != 0) return false;
            break;
    }

    return true;
}

function pintarBarco(id, tablero) {
    // Direccion del barco hacia la DERECHA.
    if (id == sumaHor && sHorR) {
        pintarAguaInicial(id, restaHor, tablero);
        pintarAguaInicial(id, sumaVer, tablero);
        pintarAguaInicial(id, restaVer, tablero);

        for (var i = lastId; i <= id; i++) {
            document.getElementById(i).style.backgroundColor = barco;
            tablero[getFila(i)][i % nCeldas] = 2;
            document.getElementById(i).innerHTML = numBarcos;

            if (getFila(id) != 0)
                tablero[getFila(i) - 1][i % nCeldas] = -1;
            if (getFila(id) != nCeldas - 1)
                tablero[getFila(i) + 1][i % nCeldas] = -1;

            if (i == lastId) {
                if (i % nCeldas != 0)
                    tablero[getFila(id)][i % nCeldas - 1] = -1;
                if (getFila(id) != nCeldas - 1 && i % nCeldas != 0)
                    tablero[getFila(id) + 1][i % nCeldas - 1] = -1;
                if (getFila(id) != 0 && i % nCeldas != 0)
                    tablero[getFila(id) - 1][i % nCeldas - 1] = -1;
            }

            if (i == id) {
                if (i % nCeldas != nCeldas - 1)
                    tablero[getFila(id)][i % nCeldas + 1] = -1;
                if (getFila(id) != nCeldas - 1 && i % nCeldas != nCeldas - 1)
                    tablero[getFila(id) + 1][i % nCeldas + 1] = -1;
                if (getFila(id) != 0 && i % nCeldas != nCeldas - 1)
                    tablero[getFila(id) - 1][i % nCeldas + 1] = -1;
            }
        }

        numBarcos++;
        estoyColocando = false;

        // Direccion del barco hacia la IZQUIERDA.
    } else if (id == restaHor && rHorR) {
        pintarAguaInicial(id, sumaHor, tablero);
        pintarAguaInicial(id, sumaVer, tablero);
        pintarAguaInicial(id, restaVer, tablero);

        for (var x = lastId; x >= id; x--) {
            document.getElementById(x).style.backgroundColor = barco;
            tablero[getFila(x)][x % nCeldas] = 2;
            document.getElementById(x).innerHTML = numBarcos;

            if (getFila(id) != 0)
                tablero[getFila(x) - 1][x % nCeldas] = -1;
            if (getFila(id) != nCeldas - 1)
                tablero[getFila(x) + 1][x % nCeldas] = -1;

            if (x == lastId) {
                if (x % nCeldas != nCeldas - 1)
                    tablero[getFila(id)][x % nCeldas + 1] = -1;
                if (getFila(id) != nCeldas - 1 && x % nCeldas != nCeldas - 1)
                    tablero[getFila(id) + 1][x % nCeldas + 1] = -1;
                if (getFila(id) != 0 && x % nCeldas != nCeldas - 1)
                    tablero[getFila(id) - 1][x % nCeldas + 1] = -1;
            }

            if (x == id) {
                if (x % nCeldas != 0)
                    tablero[getFila(id)][x % nCeldas - 1] = -1;
                if (getFila(id) != nCeldas - 1 && x % nCeldas != 0)
                    tablero[getFila(id) + 1][x % nCeldas - 1] = -1;
                if (getFila(id) != 0 && x % nCeldas != 0)
                    tablero[getFila(id) - 1][x % nCeldas - 1] = -1;
            }
        }

        numBarcos++;
        estoyColocando = false;

        // Direccion del barco hacia ABAJO.
    } else if (id == sumaVer && sVerR) {
        pintarAguaInicial(id, sumaHor, tablero);
        pintarAguaInicial(id, restaHor, tablero);
        pintarAguaInicial(id, restaVer, tablero);

        for (var k = id; k >= lastId; k -= 10) {
            document.getElementById(k).style.backgroundColor = barco;
            tablero[getFila(k)][k % nCeldas] = 2;
            document.getElementById(k).innerHTML = numBarcos;

            if (k % nCeldas != nCeldas - 1)
                tablero[getFila(k)][k % nCeldas + 1] = -1;
            if (k % nCeldas != 0)
                tablero[getFila(k)][k % nCeldas - 1] = -1;

            if (k == id) {
                if (getFila(id) != nCeldas - 1)
                    tablero[getFila(id) + 1][k % nCeldas] = -1;
                if (getFila(id) != nCeldas - 1 && k % nCeldas != nCeldas - 1)
                    tablero[getFila(id) + 1][k % nCeldas + 1] = -1;
                if (getFila(id) != nCeldas - 1 && k % nCeldas != 0)
                    tablero[getFila(id) + 1][k % nCeldas - 1] = -1;
            }

            if (k == lastId) {
                if (getFila(lastId) != 0)
                    tablero[getFila(lastId) - 1][k % nCeldas] = -1;
                if (getFila(lastId) != 0 && k % nCeldas != nCeldas - 1)
                    tablero[getFila(lastId) - 1][k % nCeldas + 1] = -1;
                if (getFila(lastId) != 0 && k % nCeldas != 0)
                    tablero[getFila(lastId) - 1][k % nCeldas - 1] = -1;
            }
        }

        numBarcos++;
        estoyColocando = false;

        // Direccion del barco hacia ARRIBA.
    } else if (id == restaVer && rVerR) {
        pintarAguaInicial(id, sumaHor, tablero);
        pintarAguaInicial(id, restaHor, tablero);
        pintarAguaInicial(id, sumaVer, tablero);

        for (var y = lastId; y >= id; y -= 10) {
            document.getElementById(y).style.backgroundColor = barco;
            tablero[getFila(y)][y % nCeldas] = 2;
            document.getElementById(y).innerHTML = numBarcos;

            if (y % nCeldas != nCeldas - 1)
                tablero[getFila(y)][y % nCeldas + 1] = -1;
            if (y % nCeldas != 0)
                tablero[getFila(y)][y % nCeldas - 1] = -1;

            if (y == id) {
                if (getFila(id) != 0)
                    tablero[getFila(id) - 1][y % nCeldas] = -1;
                if (getFila(id) != 0 && y % nCeldas != nCeldas - 1)
                    tablero[getFila(id) - 1][y % nCeldas + 1] = -1;
                if (getFila(id) != 0 && y % nCeldas != 0)
                    tablero[getFila(id) - 1][y % nCeldas - 1] = -1;
            }

            if (y == lastId) {
                if (getFila(lastId) != nCeldas - 1)
                    tablero[getFila(lastId) + 1][y % nCeldas] = -1;
                if (getFila(lastId) != nCeldas - 1 && y % nCeldas != nCeldas - 1)
                    tablero[getFila(lastId) + 1][y % nCeldas + 1] = -1;
                if (getFila(lastId) != nCeldas - 1 && y % nCeldas != 0)
                    tablero[getFila(lastId) + 1][y % nCeldas - 1] = -1;
            }
        }

        numBarcos++;
        estoyColocando = false;
    }
}

function pintarAguaInicial(id, valor, tablero) {
    if (getTablero(valor) == getTablero(id) && tablero[getFila(valor)][valor % nCeldas] == 0)
        document.getElementById(valor).style.backgroundColor = aguaInicio;
}

// Pinta el tablero indicado introduciendo el color de la celda, su ID y un evento de onClick que se le pasa la ID.
function pintarTablero(table, tablero) {
    for (var i = 0; i < tablero.length; i++) {
        var fila = table.insertRow(i);
        for (var x = 0; x < tablero[i].length; x++) {
            var celda = fila.insertCell(-1);
            celda.style.backgroundColor = aguaInicio;
            celda.id = cId;
            celda.addEventListener("click", function () {
                eventCasilla(this.id)
            }, false);
            cId++;
        }
    }
}

function transformar1en0(tablero) {
    for (var i = 0; i < tablero.length; i++) {
        for (var x = 0; x < tablero[i].length; x++) {
            if (tablero[i][x] != -1) continue;
            tablero[i][x] = 0;
        }
    }
}

/*
 *
 * TABLONES INFERIORES
 *
 * Los colores representan:
 *    0 - Agua    - Azul  - #0070B8
 *    1 - Tocado  - Rojo  - #D50F25
 *    2 - Barco   - Negro - #666666
 *
 * Rellena con los campos vacios de los tableros inferiores, que representa el tablero en el que el usuario
 * ve sus propios barcos.
 *
 */
function tableroDownVacio() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

/*
 *
 * TABLONES SUPERIORES
 * Los colores representan:
 *      0 - Agua    - Azul  - #0070B8
 *      1 - Tocado  - Rojo  - #D50F25
 *      2 - Hundido - Negro - #666666
 *
 * Rellena con los campos vacios de los tableros superiores, que representa el tablero en el que el usuario
 * intenta averiguar donde estan los barcos enemigos y muestra el resultado (agua, tocado y hundido).
 *
 */
function tableroUpVacio() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

function barcosJugadores(barcos, tipoBarco, pos) {
    barcos.push([tipoBarco, pos]);
}
