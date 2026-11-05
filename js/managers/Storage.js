export class Storage {
    static guardar(key, datos) {
        localStorage.setItem(key, JSON.stringify(datos)); //localStorage es una API del navegador que permite guardar datos de forma persistente sin necesidad de backend
    }                             //En este punto convertimos el array "tareas" que se encuentra en la clase "GestorTareas" y hemos pasado por párametro en texto"
                                  //Esto se hace por que localStorage solo acepta String
                                  //Este método se llama después de agregarTarea() eliminarTarea() cambiarEstado() editarTarea()
    static cargar(key) {
        const datos = JSON.parse(localStorage.getItem(key)); //Lo que obtenemos NO son instancias reales de Tarea
        return datos || [];
    }

    static borrar(key) {
        localStorage.removeItem(key);
    }

    // Método estático para exportar JSON
    static exportarJSON(nombreArchivo, datos) {
        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = nombreArchivo;
        a.click();
        URL.revokeObjectURL(url);

        
    }
}