# APP-NASA (Trabajo Práctico 2)

## Miembros del Equipo
- **[JOAQUIN DAL DOSSO VULCANO]** - (PM / Scrum Master & Desarrollador)
- **[MATTEO ALDAY]** - (Desarrollador)
- **[FIDEL PIZARRO]** - (Desarrollador)

---

##  Descripción de la Aplicación
Esta es una Single Page Application (SPA) desarrollada para el Trabajo Práctico 2. La aplicación simula un explorador de imágenes espaciales basado en la API APOD (Astronomy Picture of the Day) de la NASA. 

###  Funcionalidades Principales:
- **Exploración de Galería:** Visualización paginada de tarjetas con imágenes espaciales consumidas desde MockAPI.
- **Buscador Integrado:** Filtrado de imágenes por título en tiempo real desde la barra de navegación.
- **Vista de Detalle:** Ruta dinámica (`/details/:id`) que permite ver la información completa y ampliada de una imagen específica.
- **Sección de Favoritos:** Ruta dedicada (`/favorites`) para gestionar los elementos guardados.
- **Internacionalización (i18n):** Soporte multi-idioma integrado para cambiar el idioma de la interfaz.
- **Diseño Moderno:** Interfaz responsiva y estilizada utilizando Tailwind CSS.

---

##  Tecnologías Utilizadas
- **Core:** React 19 + Vite
- **Enrutamiento:** React Router DOM 7
- **Estilos:** Tailwind CSS 4
- **Internacionalización:** i18next / react-i18next
- **Datos:** Fetch API conectada a un entorno de MockAPI

---

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) en tu computadora.
- Tener instalado Git.

### Paso a paso

1. **Clonar el repositorio:**
   Abre tu terminal e ingresa el siguiente comando (reemplaza la URL por la de tu repo):
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. **Navegar al directorio del proyecto:**
   ```bash
   cd TP-PWA
   ```
3. **Instalar las dependencias:**
   ```bash
   npm install
   ```
4. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```
### Estructura del Proyecto
- /src/Components: Componentes de interfaz reutilizables (Header, Footer, tarjetas).
- /src/Pages: Las vistas principales de enrutamiento (Home, Favorites, Details).
- /src/services: Servicios de conexión a la API (ej: apodService.js).
- /src/locales: Archivos de configuración para la traducción de idiomas.