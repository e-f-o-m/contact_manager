# Contact Manager

Este es un proyecto de gestión de contactos, desarrollado con **Express**, **MySQL**, y **Angular 18**. El objetivo de este proyecto es permitir a los usuarios gestionar sus contactos, agrupándolos en grupos y etiquetándolos con diferentes categorías.

## Descripción del Proyecto

- **Backend**: Implementado con **Express** y **MySQL** para manejar las API y la base de datos de contactos, usuarios, grupos y etiquetas.
- **Frontend**: Implementado con **Angular 18**, proporcionando una interfaz amigable para que los usuarios puedan interactuar con sus contactos.

## Diagramas del Proyecto

1. **Diagrama de Clases**:
   ![Diagrama de Clases](https://github.com/e-f-o-m/contact_manager/blob/main/digrama_clases.png)

2. **Modelo Entidad-Relación (ERD)**:
   ![Modelo Entidad-Relación](https://github.com/e-f-o-m/contact_manager/blob/main/MER_libreta_contactos.png)
   

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- **Node.js** (versión 18 o superior)
- **MySQL** (versión 8 o superior)
- **Angular CLI** (versión 18 o superior)

## Instalación

1. Clona el repositorio del proyecto en tu máquina local:
```bash
git clone https://github.com/tu_usuario/contact-manager.git
cd contact-manager
```

2. Instala las dependencias del backend (Express):
```bash
cd backend
npm install
```

3. Configura la base de datos en MySQL:
Crea una base de datos llamada contact_manager.
Carga las tablas utilizando el archivo SQL proporcionado o ejecuta los comandos SQL en schema.sql.

4. Configura las variables de entorno en el backend (.env):
```bash
PGHOST=localhost o dirección
PGDATABASE=contact_manager
PGUSER=tu_usuario
PGPASSWORD=tu_contraseña
PORT=tu puesto de mysql
```

5. Inicia el servidor backend:
```bash
npm start
```

6. Instala las dependencias del frontend (Angular):

```bash
cd ../frontend
npm install
```
7. Inicia el servidor de desarrollo de Angular:

```bash
ng serve
```
## Uso
1. Accede al frontend en tu navegador: http://localhost:4200.
2. El backend estará disponible en http://localhost:3000.
3. Puedes gestionar contactos, grupos y etiquetas desde la interfaz de usuario de Angular.

## Características
1. Gestión de contactos con nombres, correos electrónicos, teléfonos y notas.
2. Agrupación de contactos en grupos personalizados.
3. Etiquetado de contactos con diferentes categorías.
4. Autenticación de usuarios para gestionar sus propios contactos.

