# Manual de Usuario – TaskMaster

## 1. Requisitos Previos

Antes de usar TaskMaster, asegúrate de tener:

1. **Visual Studio Code** instalado.  
2. **Navegador web moderno** (Chrome, Edge o Firefox).  
3. **Extensión Live Server** instalada en VS Code.

---

## 2. Instalación de Live Server

1. Abre **Visual Studio Code**.  
2. Ve a la sección de **Extensiones** (icono de cuadrado en la barra lateral o `Ctrl+Shift+X`).  
3. Busca **Live Server**.  
4. Haz clic en **Instalar**.  
5. Reinicia VS Code si es necesario.

> **Importante:** Live Server es obligatorio porque TaskMaster usa **módulos de JavaScript (import/export)** que solo funcionan desde un servidor HTTP. Abrir el archivo HTML directamente no funcionará correctamente.

---

## 3. Abrir el Proyecto con Live Server

1. Abre la carpeta del proyecto en VS Code.  
2. Haz clic derecho en `index.html` → **Open with Live Server**.  
3. Se abrirá automáticamente una nueva pestaña en tu navegador mostrando TaskMaster.

---

## 4. Uso Básico de TaskMaster

### 4.1 Crear una tarea

1. Completa los campos:
   - **Título** (mínimo 3 caracteres)  
   - **Descripción** (opcional)  
   - **Prioridad** (Alta, Media o Baja)  
2. Haz clic en **Guardar**.  
3. La tarea aparecerá en la lista.

---

### 4.2 Editar una tarea

1. Haz clic en **Editar** sobre la tarea.  
2. Modifica los datos.  
3. La tarea se actualizará automáticamente.

---

### 4.3 Cambiar estado

- Haz clic en **Cambiar Estado** para alternar entre **Pendiente** y **Completada**.  

---

### 4.4 Eliminar tarea

- Haz clic en **Eliminar** para borrar la tarea seleccionada.

---

### 4.5 Buscar tareas

1. Escribe texto en el campo **Buscar tarea…**  
2. Haz clic en **Buscar**.  
3. La lista mostrará solo las tareas que coincidan con el texto.

---

### 4.6 Filtrar por estado

- Selecciona un estado en el menú desplegable **Todas / Pendiente / Completada** para filtrar las tareas.

---

### 4.7 Modo oscuro

- Haz clic en el botón **Modo Oscuro** para activar o desactivar el tema oscuro.  
- La configuración se guardará automáticamente para la próxima vez.

---

### 4.8 Exportar tareas

- El sistema genera automáticamente un archivo `tareas.json` con todas las tareas almacenadas.  
- Esto permite hacer copias de seguridad o análisis externo.

---

## 5. Notas importantes

- Live Server **debe estar activo** siempre que uses la aplicación.  
- Si cierras Live Server, recarga el proyecto desde VS Code usando **Open with Live Server**.  
- Todas las tareas se almacenan en tu navegador mediante **localStorage**, por lo que permanecerán aunque cierres la página.

---

## 6. Soporte

Si encuentras problemas:

- Revisa que **Live Server esté instalado** y activo.  
- Verifica que estés usando un **navegador moderno** compatible con ES Modules.  
- Para problemas técnicos, contacta al desarrollador o revisa la documentación del proyecto.