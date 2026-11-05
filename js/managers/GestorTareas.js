import { Tarea } from "../models/Tarea.js";
import { Storage } from "./Storage.js";

export class GestorTareas {
    constructor() {
        this.tareas = []; //Array Tareas
        this.mapaTareas = new Map(); // Para acceso rápido por Id de forma eficiente
        this.categorias = new Set(); // Para prioridades
        this.cargarDesdeLocalStorage(); //Carga desde localStorage
    }

    agregarTarea(titulo, descripcion, prioridad) {
        const id = Date.now(); //Genera ID
        const tarea = new Tarea(id, titulo, descripcion, prioridad);

        this.tareas.push(tarea);            // Guarda la instancia completa de la tarea
        this.mapaTareas.set(id, tarea);     // Guarda el ID y la tarea para acceso rápido
        this.categorias.add(prioridad);     // Guarda la prioridad de la tarea

        this.guardarEnLocalStorage(); //Actualiza localStorage
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id); //Con filter creamos un nuevo array con estos elementos sin modificar el ya existente, de esta manera el método recorre todas las tareas y si el ID de una de ellas es distinto no lo borra, si es el introducido, lo borra y el array this.tareas reemplaza el anterior.
        this.mapaTareas.delete(id); //Borra el id de la tarea para poder asignarlo a otra tarea
        this.guardarEnLocalStorage(); //Actualiza el localStorage
    }

    obtenerTareaPorId(id) {
        return this.mapaTareas.get(id); //Get sencillo por ID
    }

    editarTarea(id, titulo, descripcion, prioridad) {
        const tarea = this.obtenerTareaPorId(id); //Obtenemos la tarea mediante el id
        if (tarea) { //Si tarea existe ejecuta el bloque
            tarea.actualizarDatos(titulo, descripcion, prioridad); //Llamo al método actualizar datos
            this.guardarEnLocalStorage(); //Actualizamos el localStorage
        }
    }

    filtrarPorEstado(estado) { //Recibe el estado por el cual queremos filtrar
        if (estado === "Todas") return this.tareas; //Si el usuario selecciona Todas no aplicamos ningún filtro y devolvemos el array completo
        return this.tareas.filter(t => t.estado === estado); //Para cada tarea comprueba si su estado coincide con el estado recibido / Si concide se queda y si no se descarta
    }

    buscar(texto) {
        if (!texto) return this.tareas; //Si el texto está vacío o si es null o undefined, se devuelve el array tal cual sin aplicar filtros innecesarios

        texto = texto.toLowerCase(); //Convierte el texto a minúsculas para que la búsqueda sea case-insentitive

        return this.tareas.filter(t =>
            t.titulo.toLowerCase().includes(texto.toLowerCase()) ||     //  Si el texto aparece en el título O en la descripciópn se incluye en el resultado
            t.descripcion.toLowerCase().includes(texto.toLowerCase())   //  Devuelve un nuevo array filtrado sin modificar el original permientiendo mostrar resultados dinámicos
        );
    }

    guardarEnLocalStorage() {
        Storage.guardar("tareas", this.tareas); //Utilizamos el método .guardar de la clase Storage
    }                                           //"Tareas es la clave y "this.tareas" es el array convertido en texto"

    //Si recargamos la página la memoria se reinicia y this.tareas vuelve a estar vacío por lo que se necesita este método para recuperar los datos
    cargarDesdeLocalStorage() {                 //Reconstruye las tareas guardadas previamente y las vuevle a convertir en instancias reales de la clase Tarea para restarurar el estado del programa al abrir la aplicación y evitar que las tareas se pierdan al recargar la página
        const datos = Storage.cargar("tareas"); //Usamos el método .cargar de la clase Storage
        datos.forEach(d => {                    //Recorro cada objeto plano recuperado para reconstruir instancias reales de la clase Tarea
            const tarea = new Tarea(d.id, d.titulo, d.descripcion, d.prioridad); //Creo una nueva instancia REAL
            tarea.estado = d.estado;            //Restauro el estado guardado por ejemplo "Pendiente" que sobreescribe al estado por defecto que inicializa el constructor
            this.tareas.push(tarea);            //Añado la tarea al array principal
            this.mapaTareas.set(tarea.id, tarea); //También guardo en un map para optimizar busquedas por id con acceso constante
        });     //JSON.parse devuelve objetos sin los métodos definidos en la clase, si no los recontruyo con new Tarea() perdería
                //funcionalidades como toggleEstado()
    }   
}