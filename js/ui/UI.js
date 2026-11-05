export class UI {
    constructor(gestor) {
        this.gestor = gestor;
        this.lista = document.getElementById("listaTareas");
    }

    render(tareas) {
        this.lista.innerHTML = "";

        tareas.forEach(t => {
            const div = document.createElement("div");
            div.classList.add("tarea");
            if (t.estado === "Completada") {
                div.classList.add("completada");
            }

            div.innerHTML = `
                <h3>${t.titulo}</h3>
                <p>${t.descripcion}</p>
                <p>Prioridad: ${t.prioridad}</p>
                <p>Estado: ${t.estado}</p>
                <button data-id="${t.id}" class="toggle">Cambiar Estado</button>
                <button data-id="${t.id}" class="editar">Editar</button>
                <button data-id="${t.id}" class="eliminar">Eliminar</button>
            `;

            this.lista.appendChild(div);
        });
    }

    mostrarMensaje(texto) {
    this.lista.innerHTML = `<p>${texto}</p>`;
    }
}