# Libros FIL 2025

Sitio estático minimalista para documentar los libros adquiridos en la Feria Internacional del Libro de Guadalajara 2025. El sitio muestra una grilla responsiva de libros con un efecto visual que distingue entre libros leídos (a color) y no leídos (en escala de grises).

## 📚 Sobre el proyecto

Este proyecto documenta la colección de libros comprados en FIL 2025. Es un sitio estático construido con [Astro](https://astro.build) que se mantiene manualmente editando un archivo JSON.

### Características

- **Grilla responsiva**: Se adapta a diferentes tamaños de pantalla (móvil, tablet, desktop)
- **Efecto visual**: Los libros no leídos aparecen en escala de grises, los leídos a color completo
- **Filtrado y búsqueda**: Sistema completo de filtros dinámicos (búsqueda, estado, autor, editorial) con actualización en tiempo real
- **Ordenamiento**: Ordenar por título, autor o fecha de lectura (ascendente/descendente)
- **Animaciones suaves**: Transiciones al filtrar/ordenar y animación stagger para aparición de tarjetas
- **Accesibilidad**: Skip links, ARIA labels, navegación por teclado, contraste WCAG AA
- **Performance optimizado**: Preload de fuentes, CSS crítico inline, Service Worker para cache offline
- **SEO mejorado**: Open Graph tags, Twitter Cards, Schema.org JSON-LD, sitemap.xml
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
│   │   ├── BookGrid.astro    # Componente principal que renderiza la grilla
│   │   └── FilterBar.astro   # Componente de filtros y ordenamiento
│   ├── data/
│   │   ├── libros.json        # Datos de los libros (editar aquí)
│   │   └── libros.schema.json # Schema JSON para validación
│   ├── pages/
│   │   ├── index.astro        # Página principal
│   │   └── sitemap.xml.ts     # Generador dinámico de sitemap
│   ├── styles/
│   │   ├── global.css         # Estilos globales y variables CSS
│   │   ├── fonts.css          # Definiciones de fuentes
│   │   ├── critical.css       # CSS crítico para inlinar en <head>
│   │   └── books.css          # Estilos específicos para libros
│   └── types/
│       └── book.ts            # Tipo TypeScript compartido
├── scripts/
│   ├── validate-libros.js     # Validador de estructura JSON
│   ├── generate-all-variants.js # Generador de variantes de imágenes
│   └── analyze-bundle.js      # Analizador de tamaño del bundle
├── public/
│   ├── books/                 # Imágenes de portadas de libros
│   ├── fonts/                 # Fuente Urbanist
│   ├── robots.txt             # Configuración para crawlers
│   └── sw.js                  # Service Worker para cache offline
└── package.json
```

### Componentes principales

#### `FilterBar.astro`

Componente que proporciona filtrado y ordenamiento de libros.

**Funcionalidades:**
- **Búsqueda**: Campo de texto para buscar por título o subtítulo
- **Filtros**: 
  - Estado (Todos/Leídos/Pendientes)
  - Autor (dropdown dinámico que se actualiza según otros filtros)
  - Editorial (dropdown dinámico que se actualiza según otros filtros)
- **Ordenamiento**: Select con opciones:
  - Orden original
  - Título (A-Z / Z-A)
  - Autor (A-Z / Z-A)
  - Fecha de lectura (antiguos/recientes primero)
- **Estado en URL**: Todos los filtros y ordenamiento se guardan en parámetros de URL para compartir estado
- **Actualización dinámica**: Los dropdowns de autor/editorial se actualizan automáticamente según los filtros activos
- **Botón limpiar**: Resetea todos los filtros y ordenamiento

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
- Lazy loading de imágenes con Intersection Observer
- Imágenes responsivas con `srcset` y múltiples variantes (400w, 600w, 800w, 1200w)
- Animaciones suaves: fadeInScale para mostrar/ocultar, stagger para aparición
- Hover effects mejorados con transform y brightness
- Soporte para `prefers-reduced-motion`
- Accesibilidad: ARIA labels, role="article", tabindex para navegación por teclado

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
     "publishers": ["Editorial"]
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
| `npm run validate`        | Valida la estructura de `libros.json` según schema |
| `npm run generate-images` | Genera variantes de imágenes (400w, 600w, 800w, 1200w) |
| `npm run analyze`         | Analiza el tamaño del bundle generado |

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
- `sharp`: ^0.34.5 - Procesamiento de imágenes para generar variantes

El proyecto es completamente estático en producción.

## 🔍 Estado actual del proyecto

- **Total de libros**: 38
- **Libros leídos**: 1 (con fecha de lectura registrada)
- **Formato de imágenes**: WebP (recomendado)
- **Variantes de imágenes**: 152 variantes generadas (400w, 600w, 800w, 1200w)
- **Última actualización**: Diciembre 2025

## ✨ Funcionalidades implementadas

### Filtrado y búsqueda
- Búsqueda en tiempo real por título o subtítulo
- Filtros por estado (leídos/pendientes), autor y editorial
- Dropdowns dinámicos que se actualizan según filtros activos
- Estado persistente en URL para compartir filtros
- Contador de resultados visible

### Ordenamiento
- Ordenar por título, autor o fecha de lectura
- Dirección ascendente/descendente
- Integrado con sistema de filtros
- Estado guardado en URL

### Accesibilidad
- Skip link para saltar al contenido principal
- ARIA labels en todos los elementos interactivos
- Navegación por teclado mejorada
- Contraste WCAG AA en modo oscuro
- Soporte para lectores de pantalla

### Performance
- Preload de fuentes críticas
- CSS crítico inlinado en `<head>`
- Service Worker para cache offline
- Lazy loading de imágenes con Intersection Observer
- Imágenes responsivas con srcset

### SEO
- Open Graph tags para redes sociales
- Twitter Cards
- Schema.org JSON-LD con datos estructurados
- Sitemap.xml dinámico
- robots.txt configurado

### Animaciones
- Transiciones suaves al filtrar/ordenar
- Animación stagger para aparición de tarjetas
- Hover effects mejorados
- Respeto a `prefers-reduced-motion`

## 📄 Licencia

Proyecto personal para documentación de libros.

## 🛠️ Desarrollo

### Estructura de archivos

- `src/pages/index.astro`: Página principal con SEO, skip link, Service Worker y renderizado de componentes
- `src/components/BookGrid.astro`: Componente que renderiza la grilla de libros con animaciones y lazy loading
- `src/components/FilterBar.astro`: Componente de filtros, búsqueda y ordenamiento con estado en URL
- `src/data/libros.json`: Base de datos JSON con todos los libros
- `src/data/libros.schema.json`: Schema JSON para validación automática
- `src/types/book.ts`: Tipo TypeScript compartido para consistencia
- `src/styles/global.css`: Variables CSS, estilos globales, modo oscuro y focus-visible
- `src/styles/fonts.css`: Definiciones de fuentes Urbanist
- `src/styles/critical.css`: CSS crítico inlinado en `<head>` para mejor performance
- `src/styles/books.css`: Actualmente vacío (estilos están en el componente)
- `public/sw.js`: Service Worker para cache offline
- `public/robots.txt`: Configuración para crawlers
- `scripts/validate-libros.js`: Validador de estructura JSON (ejecuta antes de build)
- `scripts/generate-all-variants.js`: Generador de variantes de imágenes para srcset
- `scripts/analyze-bundle.js`: Analizador de tamaño del bundle

### Flujo de datos

1. `libros.json` contiene el array de libros
2. `libros.schema.json` define la estructura válida (validación automática)
3. `scripts/validate-libros.js` valida los datos antes del build (hook `prebuild`)
4. `src/types/book.ts` define el tipo TypeScript compartido
5. `index.astro` importa los datos, agrega SEO, CSS crítico y Service Worker
6. `FilterBar` recibe los libros y maneja filtrado/ordenamiento con estado en URL
7. `BookGrid` renderiza cada libro con estilos condicionales basados en `readDate`
8. JavaScript cliente-side filtra y ordena dinámicamente sin recargar la página

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

### Optimización de imágenes

El proyecto genera automáticamente variantes de imágenes en diferentes tamaños para usar con `srcset`:

- **Tamaños generados**: 400w, 600w, 800w, 1200w
- **Formato**: WebP (optimizado)
- **Comando**: `npm run generate-images`
- **Ubicación**: `public/books/` (variantes se generan como `nombre_400w.webp`, etc.)

Si una imagen original es más pequeña que un tamaño objetivo, se crea una copia optimizada del tamaño original.

### Service Worker

El sitio incluye un Service Worker (`public/sw.js`) que:
- Cachea recursos críticos en la primera visita
- Usa estrategia Cache First para assets estáticos
- Usa estrategia Network First para HTML (siempre intenta obtener la versión más reciente)
- Permite funcionar offline después de la primera visita
- Se registra automáticamente al cargar la página

### SEO y metadatos

El sitio incluye:
- **Open Graph tags**: Para previews en Facebook y otras redes
- **Twitter Cards**: Para previews en Twitter
- **Schema.org JSON-LD**: Datos estructurados de todos los libros para mejor indexación
- **Sitemap.xml**: Generado dinámicamente en `/sitemap.xml`
- **robots.txt**: Configurado para permitir todos los crawlers

**Nota**: la URL del sitio es `https://fil25.vic.fail` y vive en tres lugares: `src/pages/index.astro`, `src/pages/sitemap.xml.ts` y `public/robots.txt`. Si cambia, cámbiala en los tres.
