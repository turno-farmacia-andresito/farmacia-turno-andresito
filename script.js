const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTasNN3fvqils4m-YRo2ZEgkOPUT0PfwKd_Zq0JlYU_uoK7GeimiW6DBNc3mInQc83FysdoCT71k_Nl/pub?output=csv";

async function cargarTurno() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.text();

        const filas = data.split("\n").slice(1);

        const ahora = new Date();
        ahora.setHours(ahora.getHours() - 8); // Ajuste para cambio a las 08:00 AM

        const hoy = ahora.toISOString().split("T")[0];

        let farmaciaHoy = null;

        filas.forEach(fila => {
            const columnas = fila.split(",");
            const fecha = columnas[0];
            const farmacia = columnas[1];
            const maps = columnas[2];
            const whatsapp = columnas[3];

            if (fecha === hoy) {
                farmaciaHoy = { farmacia, maps, whatsapp };
            }
        });

        const fechaElemento = document.getElementById("fecha");
        const farmaciaElemento = document.getElementById("farmacia");

        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaElemento.innerText = ahora.toLocaleDateString('es-AR', opcionesFecha);

        if (farmaciaHoy) {
            farmaciaElemento.innerText = farmaciaHoy.farmacia;
            document.getElementById("maps").href = farmaciaHoy.maps;
            document.getElementById("btn-wpp").href = farmaciaHoy.whatsapp;
        } else {
            farmaciaElemento.innerText = "No hay turno cargado";
        }

    } catch (error) {
        console.error("Error cargando datos:", error);
        document.getElementById("farmacia").innerText = "Error cargando datos";
    }
}

cargarTurno();
