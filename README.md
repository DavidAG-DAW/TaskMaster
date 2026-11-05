# TaskMaster – Gestor de Tareas

## Descripción del Proyecto

**TaskMaster** es una aplicación web desarrollada en JavaScript que permite gestionar tareas de manera organizada, persistente y eficiente.

La aplicación permite:

- Crear tareas
- Editar tareas
- Eliminar tareas
- Cambiar estado (Pendiente / Completada)
- Buscar tareas por texto
- Filtrar por estado
- Activar modo oscuro
- Exportar tareas en formato JSON

---

## Arquitectura del Proyecto

El proyecto está desarrollado utilizando **JavaScript modular (ES Modules)**, aplicando separación de responsabilidades.


---

## Explicación de Cada Parte

### 1. Tarea.js (Modelo)

Representa la estructura de una tarea.

Contiene:
- id
- titulo
- descripcion
- prioridad
- estado
- fechaCreacion

Responsabilidad:
Definir qué es una tarea y cómo se comporta (cambio de estado, actualización de datos).

---

### 2. GestorTareas.js (Lógica de negocio)

Es el núcleo del sistema.

Responsabilidades:
- Crear tareas
- Editarlas
- Eliminarlas
- Filtrar
- Buscar
- Guardar y cargar desde localStorage

Estructuras utilizadas:
- Array → almacenamiento principal
- Map → acceso rápido por ID (optimización)
- Set → almacenamiento único de prioridades

---

### 3. UI.js (Interfaz)

Encargado de:
- Renderizar tareas en el DOM
- Mostrar mensajes al usuario

Separa la lógica visual de la lógica de negocio.

---

### 4. Storage.js (Persistencia)

Gestiona el almacenamiento en el navegador usando: localStorage

Funciones:
- Guardar datos
- Cargar datos
- Borrar datos
- Exportar JSON descargable

---

### 5. main.js (Punto de entrada)

Se ejecuta cuando el DOM está cargado.

Responsabilidades:
- Inicializar el gestor
- Inicializar la interfaz
- Registrar eventos (crear, buscar, filtrar, eliminar)
- Gestionar modo oscuro

---

## Persistencia de Datos

Las tareas se almacenan en `localStorage`, lo que permite:

- Mantener los datos aunque el usuario cierre el navegador
- No depender de base de datos externa
- Funcionamiento 100% del lado del cliente

---

## Modo Oscuro

El modo oscuro:

- Se activa mediante un botón
- Se guarda en `localStorage`
- Se mantiene incluso al recargar la página

---

## Exportación de Datos

El sistema permite exportar las tareas en un archivo: tareas.json

Utilidad:
- Copias de seguridad
- Migración de datos
- Análisis externo

---

## Uso de extensión Live Server

### ¿Por qué se necesita?

El proyecto utiliza:

```html
<script type="module" src="js/main.js"></script>
