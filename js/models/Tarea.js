export class Tarea {
    constructor(id, titulo, descripcion, prioridad) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = "Pendiente";
        this.fechaCreacion = new Date();
    }

    toggleEstado() {
        this.estado = this.estado === "Pendiente" ? "Completada" : "Pendiente";
    }

    actualizarDatos(titulo, descripcion, prioridad) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
    }
}