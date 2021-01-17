// TABLERO 1
var p1TabUp = [];
// TABLERO 2
var p1TabDown = [];
// TABLERO 3
var p2TabUp = [];
// TABLERO 4
var p2TabDown = [];

var quienEmpieza = 0;

// COLORES
var aguaInicio = "rgba(0, 165, 80, 0)";
var aguaDisparo = "#0070b8";
var tocado = "#D50F25";
var barco = "#666666";
var hundido = "#00008B";
var resaltar = "#FFAB34";

// VARIABLES DEL JUEGO BOOLEANAS
var colocarBarcos = true;
var estoyColocando = false;
var primeroColocado = false;
var empezarBatalla = false;
var isFirstTime = true;

// VARIABLES BARCOS
var numBarcos = 0;
var barcosTotal;
var nomJ1;
var nomJ2;
var barcosJ1 = [];
var barcosJ2 = [];

var portaaviones = 4;
var acorazado = 3;
var destructor = 2;
var lancha = 1;

var numP = 1;
var numA = 2;
var numD = 3;
var numL = 4;

// TURNO = 0 JUGADOR 1 |||| TURNO = 1 JUGADOR 2
var turno = 0;
var lastId;

var restaVer, restaHor;
var rVerR = false;
var rHorR = false;
var sumaVer, sumaHor;
var sVerR = false;
var sHorR = false;

var table;
var cId = 0; // ID que tendrán las celdas de los tableros.
var nCeldas; // Para indicar el tamaño que tienen los tableros.

function iniciar() {
    // Rellena los tableros con campos vacios es decir con valores = 0.
    p1TabUp = tableroUpVacio();
    p1TabDown = tableroDownVacio();
    p2TabUp = tableroUpVacio();
    p2TabDown = tableroDownVacio();
    // Rellena el total de barcos que puede tener cada jugador.
    barcosJugadores(barcosJ1);
    barcosJugadores(barcosJ2);
    // Indica que nCeldas es igual al tamaño de los tableros
    nCeldas = p1TabDown.length;
    barcosTotal = numP + numA + numD + numL;

    // Pinta los 4 tableros.
    table = document.getElementById('p1-table-up');
    pintarTablero(table, p1TabUp);
    table = document.getElementById('p1-table-down');
    pintarTablero(table, p1TabDown);
    table = document.getElementById('p2-table-down');
    pintarTablero(table, p2TabDown);
    table = document.getElementById('p2-table-up');
    pintarTablero(table, p2TabUp);

    if (isFirstTime) {
        turno = Math.round((Math.random() * (100 - 1) + 1) % 2);
        nomJ1 = prompt("Introduce un nombre", "Jugador 1");
        nomJ2 = prompt("Introduce un nombre", "Jugador 2");
    }
    isFirstTime = false;

    mostrar();

}

// Funcion que se ejecutara cuando clickas sobre cualquier celda.
function eventCasilla(id) {
    var filaCasillaActual = getFila(id);
    var elemento = document.getElementById(id);

    // Comprueba que el momento sea el de colocar los barcos y si estan en los tablero inferiores para colocarlos.
    // La variable boolean estoyColocando indica si el usuario esta en proceso de seleccionar la direccion del barco que
    // en ese caso debe ir a otro apartado del else if.
    iniciarPintar(id, filaCasillaActual, elemento);

    if (numBarcos == barcosTotal && !primeroColocado) {
        primeroColocado = true;
        numBarcos = 0;
        if (turno == 0) turno++;
        else turno--;
    } else if (numBarcos == barcosTotal && primeroColocado) {
        empezarBatalla = true;
        colocarBarcos = false;
    }

    startBattle(id, elemento);
    mostrar();
}

function startBattle(id, elemento) {
    var getId;
    var barcoId;

    if (empezarBatalla && (getTablero(id) == 1 || getTablero(id) == 3)) {
        transformar1en0(p1TabDown);
        transformar1en0(p2TabDown);

        // Si quienEmpieza == 0 empezara jugando el jugador 1 y si es 1 empezara el jugador 2.
        if (turno == 0 && getTablero(id) == 1) {
            if (p2TabDown[getFila(id)][id % nCeldas] == 2) {
                elemento.style.backgroundColor = tocado;
                p2TabDown[getFila(id)][id % nCeldas] = 1;
                getId = parseInt(id) + 200;
                barcoId = document.getElementById(getId);
                barcoId.style.background = tocado;
                //alert(barcosJ2[barcoId.innerHTML][0]);
                barcosJ2[barcoId.innerHTML][0] = barcosJ2[barcoId.innerHTML][0]--;
            } else if (p2TabDown[getFila(id)][id % nCeldas] == 0) {
                elemento.style.backgroundColor = aguaDisparo;
                p2TabDown[getFila(id)][id % nCeldas] = 0;
                getId = parseInt(id) + 200;
                document.getElementById(getId).style.background = aguaDisparo;
                turno++;
            }
        } else if (turno == 1 && getTablero(id) == 3) {
            if (p1TabDown[getFila(id)][id % nCeldas] == 2) {
                elemento.style.backgroundColor = tocado;
                p1TabDown[getFila(id)][id % nCeldas] = 1;
                getId = parseInt(id) - 200;
                barcoId = document.getElementById(getId);
                barcoId.style.background = tocado;
                //alert(barcosJ1[barcoId.innerHTML]);
                barcosJ1[barcoId.innerHTML] = barcosJ1[barcoId.innerHTML]--;
            } else if (p1TabDown[getFila(id)][id % nCeldas] == 0) {
                elemento.style.backgroundColor = aguaDisparo;
                p1TabDown[getFila(id)][id % nCeldas] = 0;
                getId = parseInt(id) - 200;
                document.getElementById(getId).style.background = aguaDisparo;
                turno--;
            }
        }
    }
}

function iniciarPintar(id, filaCasillaActual, elemento) {
    if (colocarBarcos && (getTablero(id) == 2 || getTablero(id) == 4) && !estoyColocando) {
        // Pinta los barcos. Portaviones 5 cuadrados, Acorazado 4 cuadrados, Destructor 3 cuadrados, Lancha 2 cuadrados.
        if (getTablero(id) == 2) {
            if (!comprobarValidezCeldasAlClicar(id, p1TabDown)) return;
            pintarCeldasResaltadas(id, elemento, filaCasillaActual, getBarco(), p1TabDown);
        } else if (getTablero(id) == 4) {
            if (!comprobarValidezCeldasAlClicar(id, p2TabDown)) return;
            pintarCeldasResaltadas(id, elemento, filaCasillaActual, getBarco(), p2TabDown);
        }
    } else if (colocarBarcos && (getTablero(id) == 2 || getTablero(id) == 4) && estoyColocando) {
        if (getTablero(id) == 2) {
            pintarBarco(id, p1TabDown);
        } else if (getTablero(id) == 4) {
            pintarBarco(id, p2TabDown);
        }
    }
}

function getBarco() {
    if (numBarcos < numP && numBarcos >= 0) {
        return portaaviones;
    } else if (numBarcos < numP + numA && numBarcos >= numP) {
        return acorazado;
    } else if (numBarcos < numP + numA + numD && numBarcos >= numP + numA) {
        return destructor;
    } else if (numBarcos < numP + numA + numD + numL && numBarcos >= numP + numA + numD) {
        return lancha;
    }
}

// Devuelve la fila en la que se encuentra el id dentro de su tablero.
function getFila(id) {
    if (id < 10 || id >= 100 && id < 110 || id >= 200 && id < 210 || id >= 300 && id < 310) return 0;
    else if (id >= 10 && id < 20 || id >= 110 && id < 120 || id >= 210 && id < 220 || id >= 310 && id < 320) return 1;
    else if (id >= 20 && id < 30 || id >= 120 && id < 130 || id >= 220 && id < 230 || id >= 320 && id < 330) return 2;
    else if (id >= 30 && id < 40 || id >= 130 && id < 140 || id >= 230 && id < 240 || id >= 330 && id < 340) return 3;
    else if (id >= 40 && id < 50 || id >= 140 && id < 150 || id >= 240 && id < 250 || id >= 340 && id < 350) return 4;
    else if (id >= 50 && id < 60 || id >= 150 && id < 160 || id >= 250 && id < 260 || id >= 350 && id < 360) return 5;
    else if (id >= 60 && id < 70 || id >= 160 && id < 170 || id >= 260 && id < 270 || id >= 360 && id < 370) return 6;
    else if (id >= 70 && id < 80 || id >= 170 && id < 180 || id >= 270 && id < 280 || id >= 370 && id < 380) return 7;
    else if (id >= 80 && id < 90 || id >= 180 && id < 190 || id >= 280 && id < 290 || id >= 380 && id < 390) return 8;
    else return 9;
}

// Devuelve al tablero al que pertenece el ID pasado por parametro.
function getTablero(id) {
    if (id < 100) return 1;
    else if (id < 200) return 2;
    else if (id < 300) return 4;
    else return 3;
}