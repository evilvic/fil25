# Libros FIL 2025

Sitio estático minimalista para documentar los libros adquiridos en la Feria Internacional del Libro de Guadalajara 2025. El sitio muestra una grilla responsiva de libros con un efecto visual que distingue entre libros leídos (a color) y no leídos (en escala de grises).

## 📚 Sobre el proyecto

Este proyecto documenta la colección de libros comprados en FIL 2025. Es un sitio estático construido con [Astro](https://astro.build) que se mantiene manualmente editando un archivo JSON.

### Características

- **Grilla responsiva**: Se adapta a diferentes tamaños de pantalla (móvil, tablet, desktop)
- **Efecto visual**: Los libros no leídos aparecen en escala de grises, los leídos a color completo
- **Diseño minimalista**: Basado en el estilo del blog personal del autor
- **Mantenimiento manual**: Los datos se editan directamente en un archivo JSON

## 🏗️ Arquitectura técnica

### Stack

- **Astro 5.16.4**: Framework para sitios estáticos
- **TypeScript**: Para tipado en componentes
- **CSS**: Estilos scoped en componentes y estilos globales

### Estructura del proyecto

```
/
├── public/
│   ├── books/          # Imágenes de portadas de libros
│   ├── fonts/          # Fuente Urbanist (Variable y Regular)
│   └── favicon.svg     # Favicon del sitio
├── src/
│   ├── components/
│   │   └── BookGrid.astro    # Componente principal que renderiza la grilla
│   ├── data/
│   │   └── libros.json        # Datos de los libros (editar aquí)
│   ├── pages/
│   │   └── index.astro        # Página principal
│   └── styles/
│       ├── global.css         # Estilos globales y variables CSS
│       ├── fonts.css          # Definiciones de fuentes
│       └── books.css          # Estilos específicos para libros
└── package.json
```

### Componentes principales

#### `BookGrid.astro`

Componente que renderiza la grilla de libros. Recibe un array de objetos `Book` y los muestra en un grid responsivo.

**Interfaz TypeScript:**
```typescript
interface Book {
  title: string;           // Título del libro (requerido)
  subtitle?: string;        // Subtítulo (opcional)
  author: string[];        // Array de autores
  publishers: string[];    // Array de editoriales (soporta co-ediciones)
  image?: string;          // Ruta a la imagen (opcional, muestra placeholder si falta)
  readDate?: string;       // Fecha de lectura en formato YYYY-MM-DD (opcional, si existe = leído)
}
```

**Características:**
- Grid responsivo con breakpoints:
  - ≤480px: 2 columnas fijas
  - 481-768px: grid adaptativo (mínimo 140px)
  - 769-1024px: grid adaptativo (mínimo 180px)
  - ≥1025px: grid adaptativo (mínimo 220px)
- Efecto grayscale para libros no leídos (`filter: grayscale(100%)`)
- Placeholder con información completa del libro (título, subtítulo, autores, editorial) si no hay imagen
- Muestra fecha de lectura cuando `readDate` está presente
- Estilos scoped con Astro
- Lazy loading de imágenes para mejor rendimiento

#### `libros.json`

Archivo JSON que contiene todos los datos de los libros. Este es el único archivo que necesitas editar para agregar o modificar libros.

**Estructura de ejemplo:**
```json
{
  "title": "Título del Libro",
  "subtitle": "Subtítulo opcional",
  "author": ["Autor 1", "Autor 2"],
  "publishers": ["Editorial 1", "Editorial 2"],
  "image": "/books/nombre-imagen.webp",
  "readDate": "2025-12-06"
}
```

**Notas:**
- `subtitle` es opcional - si no existe, simplemente no se muestra
- `publishers` es un array - para una sola editorial usa `["Editorial"]`, para co-ediciones usa `["Editorial 1", "Editorial 2"]`
- `image` es opcional - si no existe, se muestra un placeholder con información completa del libro (título, subtítulo, autores, editorial)
- `readDate` es opcional - si está presente (formato YYYY-MM-DD), el libro se muestra a color y se muestra la fecha; si no existe, se muestra en escala de grises
- Se recomienda usar formato WebP para las imágenes por mejor compresión

### Estilos

#### Variables CSS

El proyecto usa variables CSS para mantener consistencia:

```css
--font-size-s: 0.875rem;  /* 14px */
--font-size-m: 1rem;      /* 16px */
--font-size-l: 1.125rem;  /* 18px */

--text-primary: rgba(0, 0, 0, 0.85);
--text-secondary: rgba(0, 0, 0, 0.4);
--text-tertiary: rgba(0, 0, 0, 0.24);
```

Soporta modo oscuro automático mediante `@media (prefers-color-scheme: dark)`.

#### Fuente

Usa la fuente **Urbanist** (Variable Font) que soporta pesos de 100 a 900. Los archivos están en `public/fonts/`.

## 📝 Cómo agregar o editar libros

### Agregar un nuevo libro

1. Edita `src/data/libros.json`
2. Agrega un nuevo objeto al array con la estructura:
   ```json
   {
     "title": "Título",
     "author": ["Autor"],
     "publishers": ["Editorial"],
     "read": false
   }
   ```
3. (Opcional) Agrega la imagen en `public/books/` y referencia con `"image": "/books/nombre.jpg"`

### Marcar un libro como leído

Agrega el campo `"readDate"` con la fecha en formato YYYY-MM-DD al objeto del libro en `libros.json`:

```json
{
  "title": "Título del Libro",
  "readDate": "2025-12-06"
}
```

Cuando `readDate` está presente, el libro se muestra a color y se muestra la fecha de lectura. Si no existe, el libro se muestra en escala de grises.

### Agregar una imagen

1. Coloca la imagen en `public/books/`
2. Agrega el campo `"image": "/books/nombre-archivo.jpg"` al objeto del libro

Si no agregas imagen, se mostrará automáticamente un placeholder con información completa del libro (título, subtítulo, autores y editorial) en un diseño minimalista.

## 🚀 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza el build localmente                 |
| `npm run astro ...`       | Ejecuta comandos del CLI de Astro                |
| `npm run astro check`     | Ejecuta validación de tipos y configuración      |
| `npm run validate`        | Valida la estructura de `libros.json` según schema |

## 🎨 Diseño

El diseño está basado en el blog personal del autor (`vic.monster`) con:

- Tipografía Urbanist
- Paleta de colores minimalista
- Espaciado generoso
- Efectos de transición suaves
- Soporte para modo oscuro automático

## 📦 Dependencias

### Producción
- `astro`: ^5.16.4

### Desarrollo
- `ajv`: ^8.12.0 - Validador JSON Schema
- `ajv-formats`: ^2.1.1 - Formatos adicionales para AJV (fechas, etc.)

El proyecto es completamente estático en producción.

## 🔍 Estado actual del proyecto

- **Total de libros**: 40
- **Libros leídos**: 1 (con fecha de lectura registrada)
- **Formato de imágenes**: Mayormente WebP (recomendado)
- **Última actualización**: Diciembre 2025

## 📄 Licencia

Proyecto personal para documentación de libros.

## 🛠️ Desarrollo

### Estructura de archivos

- `src/pages/index.astro`: Página principal que importa los datos y renderiza el grid
- `src/components/BookGrid.astro`: Componente que renderiza la grilla de libros con lógica de estado leído/no leído
- `src/data/libros.json`: Base de datos JSON con todos los libros
- `src/styles/global.css`: Variables CSS, estilos globales y soporte para modo oscuro
- `src/styles/fonts.css`: Definiciones de fuentes Urbanist
- `src/styles/books.css`: Actualmente vacío (estilos están en el componente)

### Flujo de datos

1. `libros.json` contiene el array de libros
2. `libros.schema.json` define la estructura válida (validación automática)
3. `scripts/validate-libros.js` valida los datos antes del build
4. `src/types/book.ts` define el tipo TypeScript compartido
5. `index.astro` importa los datos y los pasa a `BookGrid`
6. `BookGrid` renderiza cada libro con estilos condicionales basados en `readDate`

### Validación de datos

El proyecto incluye validación automática de la estructura de datos:

- **JSON Schema**: `src/data/libros.schema.json` define la estructura esperada
- **Script de validación**: Se ejecuta automáticamente antes de cada build
- **Validaciones incluidas**:
  - Estructura y tipos de campos
  - Campos requeridos (title, author, publishers)
  - Formato de fechas (YYYY-MM-DD)
  - Patrón de rutas de imágenes
  - Existencia de archivos de imagen (advertencias)
  - Detección de títulos duplicados (advertencias)

Ejecuta `npm run validate` manualmente para validar sin hacer build.
