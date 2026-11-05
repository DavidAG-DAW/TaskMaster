import { GestorTareas } from "./managers/GestorTareas.js";
import { UI } from "./ui/UI.js";

window.addEventListener("DOMContentLoaded", () => {  //Se asegura de que el DOM esté completamente cargado antes de ejecutar nuestro código
    //Evita errores por intentar acceder a elementos que todavía no existen

    const gestor = new GestorTareas(); //Creamos el gestor de tareas
    const ui = new UI(gestor);  //Creamos la intefaz de usuario

    ui.render(gestor.tareas); //Mostramos las tareas iniciales al cargar la página

    //Guardamos referencias a los elementos del DOM que vamos a usar
    const form = document.getElementById("formTarea");  //Formulario para crear las tablas
    const buscador = document.getElementById("buscador"); //Buscador de tareas
    const btnBuscar = document.getElementById("btnBuscar"); //Botón búsqueda
    const filtroEstado = document.getElementById("filtroEstado"); //Filtro de estado
    const modoOscuroBtn = document.getElementById("modoOscuroBtn"); //Botón de modo oscuro
    const btnExportar = document.getElementById("btnExportar"); //Botón exportar JSON


    btnExportar.addEventListener("click", () => {
    descargarJSON("tareas.json", gestor.tareas);
    });


    function descargarJSON(nombreArchivo, datos) {
        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = nombreArchivo;
        a.click();
        URL.revokeObjectURL(url);
    }



    // ---------- CREAR TAREA ----------
    form.addEventListener("submit", (e) => { //Evita que el formulario recarge la página
        e.preventDefault();

        //Recoge los valores de los campos
        const titulo = document.getElementById("titulo").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const prioridad = document.getElementById("prioridad").value;

        if (titulo.length < 3) { //Si el título tiene menos de 3 letras salta una alerta
            alert("El título debe tener al menos 3 caracteres");
            return;
        }

        gestor.agregarTarea(titulo, descripcion, prioridad); //LLama al gestor para crear la tarea
        ui.render(gestor.tareas); //Vuelve a renderizar la lista completa
        form.reset(); //Resetea el formulario
    });

    // ---------- BOTÓN BUSCAR ----------
    btnBuscar.addEventListener("click", () => {
        const texto = buscador.value.trim().toLowerCase(); //Recupera el texto que introduzcamos en el buscador

        let resultado = gestor.tareas; //Inicializamos la variable resultado con todas las tareas, si no hay texto ni filtro, se muestra todo de nuevo

        // Si hay texto, filtramos por búsqueda
        if (texto !== "") {
            resultado = resultado.filter(t =>
                t.titulo.toLowerCase().includes(texto) || //Busca coincidencia en el título
                t.descripcion.toLowerCase().includes(texto) //Busca coincidencia en la descripcion
            );
        }

        // Aplicamos filtro de estado
        const estado = filtroEstado.value; //Obtenemos el valor del select de estado (Todas, Pendiente, Completada) se guarda el estado seleccionado por el usuario para aplicarlo como filtro adicional
        if (estado !== "Todas") { //Si el usuario fultró un estado en específico filtramos solo esas tareas
            resultado = resultado.filter(t => t.estado === estado); //Crea una array temporal que mantiene solo las tareas que coinciden con el estado seleccionado
        }

        if (resultado.length === 0) { //Si el array está vacío mostramos que no hay tareas
            ui.mostrarMensaje("No se encontraron tareas");
        } else {
            ui.render(resultado); //Mostramos las tareas
        }
    });

    // ---------- FILTRO ----------
    filtroEstado.addEventListener("change", () => { //Detecta el cambio en el filtro de estado para actualizar la lista automáticamente
        const filtradas = gestor.filtrarPorEstado(filtroEstado.value); //LLamamos al método filtrarPorEstado() de la clase GestorTareas y devuelve solo las tareas que coindicen con es estado elegido
        ui.render(filtradas); //Muestra las tareas ya filtradas por estado
    });

    // ---------- ACCIONES EN LISTA ----------
    document.getElementById("listaTareas").addEventListener("click", (e) => { //Escucha cualquier click dentro de la lista de tareas

        const id = Number(e.target.dataset.id); //Obtenemos el identificador de la tarea sobre la que se hizo clic
        //Convertimos a Number porque dataset devuelve String
        //ELIMINAR
        if (e.target.classList.contains("eliminar")) { //Si el botón tiene la clase eliminar llamamos al metodo eliminar
            gestor.eliminarTarea(id);
        }
        //CAMBIAR ESTADO
        if (e.target.classList.contains("toggle")) { //Si el botón tiene la clase toggle cambiamos el estado de la tarea (Pendiente -> Completada -> Pendiente)
            const tarea = gestor.obtenerTareaPorId(id);
            tarea.toggleEstado();
            gestor.guardarEnLocalStorage(); //Guardamos los cambios en localStorage
        }

        // EDITAR TAREA
        if (e.target.classList.contains("editar")) {
            const tarea = gestor.obtenerTareaPorId(id);
            // Pedimos nuevos valores al usuario 
            const nuevoTitulo = prompt("Nuevo título:", tarea.titulo); //prompt devuelve null si el usuario cancela
            if (nuevoTitulo === null || nuevoTitulo.trim().length < 3) return; // cancelar si vacío o <3
            const nuevaDescripcion = prompt("Nueva descripción:", tarea.descripcion);
            const nuevaPrioridad = prompt("Nueva prioridad (Alta, Media, Baja):", tarea.prioridad);

            // Actualizamos la tarea
            gestor.editarTarea(id, nuevoTitulo.trim(), nuevaDescripcion.trim(), nuevaPrioridad.trim());
        }

        btnBuscar.click(); //Simula un click en el boton buscar para volver a aplicar filtros y actualizar la UI
    });

    // ---------- MODO OSCURO ----------
    modoOscuroBtn.addEventListener("click", () => { //Listener a la esperea del click
        document.body.classList.toggle("dark"); //Agrega la clase dark si no existe y activa los estilos CSS del modo oscuro
        localStorage.setItem("modoOscuro", //Guarda el estado del modo oscuro en el navegador
            document.body.classList.contains("dark")); //Devuelve true o false
    });

    if (localStorage.getItem("modoOscuro") === "true") { //Se ejecuta al cargar la página
        document.body.classList.add("dark");             // Si el usuario había activado el modo oscuro antes se recupera la información de locaStorage y aplicamos la clase dark automáticamente al body
    }

    Storage.exportarJSON("tareas.json", gestor.tareas);

});