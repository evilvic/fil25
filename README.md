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
  read: boolean;           // true = leído (a color), false = no leído (gris)
}
```

**Características:**
- Grid responsivo con breakpoints:
  - ≤480px: 2 columnas fijas
  - 481-768px: grid adaptativo (mínimo 140px)
  - 769-1024px: grid adaptativo (mínimo 180px)
  - ≥1025px: grid adaptativo (mínimo 220px)
- Efecto grayscale para libros no leídos (`filter: grayscale(100%)`)
- Placeholder con primera letra del título si no hay imagen
- Estilos scoped con Astro

#### `libros.json`

Archivo JSON que contiene todos los datos de los libros. Este es el único archivo que necesitas editar para agregar o modificar libros.

**Estructura de ejemplo:**
```json
{
  "title": "Título del Libro",
  "subtitle": "Subtítulo opcional",
  "author": ["Autor 1", "Autor 2"],
  "publishers": ["Editorial 1", "Editorial 2"],
  "image": "/books/nombre-imagen.jpg",
  "read": false
}
```

**Notas:**
- `subtitle` es opcional - si no existe, simplemente no se muestra
- `publishers` es un array - para una sola editorial usa `["Editorial"]`, para co-ediciones usa `["Editorial 1", "Editorial 2"]`
- `image` es opcional - si no existe, se muestra un placeholder con la primera letra del título
- `read` controla el efecto visual: `false` = gris, `true` = color

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

Cambia `"read": false` a `"read": true` en el objeto del libro en `libros.json`.

### Agregar una imagen

1. Coloca la imagen en `public/books/`
2. Agrega el campo `"image": "/books/nombre-archivo.jpg"` al objeto del libro

Si no agregas imagen, se mostrará automáticamente un placeholder con la primera letra del título.

## 🚀 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza el build localmente                 |
| `npm run astro ...`       | Ejecuta comandos del CLI de Astro                |

## 🎨 Diseño

El diseño está basado en el blog personal del autor (`vic.monster`) con:

- Tipografía Urbanist
- Paleta de colores minimalista
- Espaciado generoso
- Efectos de transición suaves
- Soporte para modo oscuro automático

## 📦 Dependencias

- `astro`: ^5.16.4

No hay dependencias adicionales - el proyecto es completamente estático.

## 📄 Licencia

Proyecto personal para documentación de libros.
