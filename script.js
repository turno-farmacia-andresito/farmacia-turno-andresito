const urlCSV = "PEGÁ_ACÁ_TU_LINK_CSV";

async function cargarTurno() {
    try {
        const response = await fetch(urlCSV);
        const data = await response.text();

        const filas = data.split("\n").slice(1);
        const hoy = new Date();
        hoy.setHours(hoy.getHours() - 8);

        const fechaHoy = hoy.toISOString().split("T")[0];

        const filaHoy = filas.find(fila => fila.startsWith(fechaHoy));

        if (!filaHoy) {
            document.getElementById("farmacia").innerText = "No hay turno cargado";
            return;
        }

        const columnas = filaHoy.split(",");

        const nombre = columnas[1];
        const maps = columnas[2];
        const wpp = columnas[3];

        document.getElementById("farmacia").innerText = nombre;

        document.getElementById("btn-maps").href = maps;
        document.getElementById("btn-wpp").href = wpp;

        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("fecha").innerText =
            hoy.toLocaleDateString("es-AR", opciones);

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

cargarTurno();
