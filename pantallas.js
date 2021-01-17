function mostrar() {
    var tabla1u = document.getElementById("p1-table-up");
    var tabla1d = document.getElementById("p1-table-down");
    var tabla2u = document.getElementById("p2-table-up");
    var tabla2d = document.getElementById("p2-table-down");

    if (turno == 0 && colocarBarcos) {
        tabla1d.className = "visible";
        tabla2d.className = "oculto";
    } else if (turno == 1 && colocarBarcos) {
        tabla1d.className = "oculto";
        tabla2d.className = "visible";
    }

    if (turno == 0 && empezarBatalla) {
        tabla1d.className = "oculto";
        tabla2d.className = "oculto";
        tabla2u.className = "oculto";
        tabla1u.className = "visible";
    } else if (turno == 1 && empezarBatalla) {
        tabla1d.className = "oculto";
        tabla1u.className = "oculto";
        tabla2d.className = "oculto";
        tabla2u.className = "visible";
    }

    if (turno == 0) document.getElementById('nombre').innerHTML = nomJ1;
    else document.getElementById('nombre').innerHTML = nomJ2;
}
