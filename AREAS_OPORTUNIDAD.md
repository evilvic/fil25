# Áreas de Oportunidad - FIL 2025

Este documento identifica y prioriza las oportunidades de mejora para el proyecto de documentación de libros de FIL 2025. Las áreas están organizadas por categorías (Funcionalidad, Técnicas, UX/UI, Datos, Infraestructura) y priorizadas según su impacto y complejidad de implementación. El objetivo es servir como roadmap para el desarrollo futuro del proyecto, permitiendo una evolución planificada y estructurada.

Análisis realizado: Diciembre 2025

## 🟡 Mejoras de Funcionalidad

### 1. Ordenamiento
- **Oportunidad**: Ordenar por título, autor, fecha de lectura, fecha de adquisición
- **Implementación**: Botones de ordenamiento con estado en URL

### 2. Vista detalle de libro
- **Oportunidad**: Página individual para cada libro con más información
- **Implementación**: 
  - Rutas dinámicas en Astro (`[slug].astro`)
  - Campos adicionales opcionales: año de publicación, ISBN, notas personales, rating

## 🟢 Mejoras Técnicas

### 3. Optimización de imágenes ✅ COMPLETADO
- **Oportunidad**: 
  - Generar múltiples tamaños (srcset)
  - Usar formato AVIF además de WebP
  - Lazy loading mejorado con intersection observer
- **Implementación completada**: 
  - ✅ Script `generate-image-variants.js` para generar variantes en 400w, 600w, 800w, 1200w
  - ✅ Srcset implementado con múltiples tamaños responsivos
  - ✅ Intersection Observer para lazy loading mejorado
  - ✅ Soporte para AVIF con fallback automático a WebP/JPG
  - ✅ Carga diferida con `data-src` y observación de intersección
  - ✅ Preload de imágenes a 100px antes de entrar al viewport
  - ✅ Transición suave de opacidad al cargar imágenes
  - ✅ Fallback para navegadores sin Intersection Observer
  - ✅ `decoding="async"` para mejor rendimiento
  - ✅ Comando `npm run generate-images` para regenerar variantes cuando sea necesario

### 4. SEO mejorado
- **Oportunidad**: 
  - Open Graph tags
  - Twitter Cards
  - Schema.org markup para libros
  - Sitemap.xml
  - robots.txt
- **Valor**: Mejor indexación, previews en redes sociales

### 5. Accesibilidad
- **Oportunidad**: 
  - Mejorar contraste en modo oscuro
  - ARIA labels en elementos interactivos
  - Navegación por teclado
  - Skip links
- **Valor**: Cumplimiento WCAG, mejor experiencia para todos

### 6. Performance
- **Oportunidad**: 
  - Preload de fuentes críticas
  - Critical CSS inline
  - Service Worker para cache offline
  - Bundle analysis
- **Métrica objetivo**: Lighthouse score > 90

### 7. Testing
- **Oportunidad**: Tests automatizados
- **Implementación**: 
  - Vitest para unit tests
  - Playwright para E2E
  - Tests de regresión visual

## 🔵 Mejoras de UX/UI

### 8. Animaciones y transiciones
- **Oportunidad**: 
  - Transiciones suaves al filtrar/ordenar
  - Animación de aparición de tarjetas (stagger)
  - Hover effects más elaborados
- **Nota**: Respetar `prefers-reduced-motion` (ya implementado)

### 9. Modo de visualización
- **Oportunidad**: 
  - Toggle entre grid y lista
  - Tamaño de grid ajustable
  - Vista compacta vs. expandida

### 10. Exportación de datos
- **Oportunidad**: 
  - Exportar a CSV/JSON
  - Generar PDF del catálogo
  - Compartir lista en redes sociales

### 11. Feedback visual
- **Oportunidad**: 
  - Indicador de carga
  - Mensajes de estado (sin resultados en búsqueda)
  - Confirmación al marcar como leído (si se hace desde UI)

## 🟣 Mejoras de Datos

### 12. Campos adicionales en JSON
- **Oportunidad**: 
  - `year`: Año de publicación
  - `isbn`: ISBN del libro
  - `pages`: Número de páginas
  - `genre`: Género(s)
  - `language`: Idioma
  - `acquiredDate`: Fecha de adquisición
  - `notes`: Notas personales
  - `rating`: Calificación (1-5 estrellas)
  - `tags`: Etiquetas personalizadas

### 13. Integración con APIs
- **Oportunidad**: 
  - Auto-completar datos desde Open Library API
  - Obtener portadas automáticamente
  - Sincronizar con Goodreads/LibraryThing

### 14. Historial de cambios
- **Oportunidad**: Tracking de cuándo se agregó cada libro, cuándo se leyó
- **Implementación**: Git history o campo `addedDate` en JSON

## 🟠 Mejoras de Infraestructura

### 15. CI/CD
- **Oportunidad**: 
  - GitHub Actions para build automático
  - Deploy automático a Vercel/Netlify
  - Validación de JSON en PRs
  - Preview deployments

### 16. Monitoreo y analytics
- **Oportunidad**: 
  - Analytics básico (Plausible, GoatCounter - privacy-friendly)
  - Error tracking (Sentry)
  - Performance monitoring

### 17. Documentación
- **Oportunidad**: 
  - Documentación de API (si se agrega)
  - Guía de contribución
  - Changelog
  - Ejemplos de uso avanzado

## 📊 Priorización Sugerida

### Fase 1 (Quick wins - 1-2 días)
1. Mejorar SEO (meta tags) - #4
2. Ordenamiento - #1

### Fase 2 (Mejoras medias - 1 semana)
3. Optimización de imágenes - #3
4. Mejoras de accesibilidad - #5

### Fase 3 (Features mayores - 2-3 semanas)
5. Vista detalle de libro - #2
6. Campos adicionales en JSON - #12
7. CI/CD y deploy automático - #15
8. Testing básico - #7

### Fase 4 (Nice to have)
9. Integración con APIs externas - #13
10. Exportación de datos - #10
11. Analytics y monitoreo - #16

## ✅ Completado

- **Imagen faltante**: Convertida a WebP y referencia actualizada en JSON
- **Validación de datos**: JSON Schema, script de validación y tipos TypeScript implementados
- **Estadísticas básicas**: Mostradas en el párrafo introductorio (total, leídos, pendientes)
- **Filtrado y búsqueda**: Sistema completo de filtros dinámicos con búsqueda en tiempo real, filtros por estado/autor/editorial, URL params y diseño responsivo
- **Optimización de imágenes**: Intersection Observer para lazy loading mejorado, soporte AVIF con fallback automático, carga diferida optimizada

## 📝 Notas Adicionales

- El proyecto está bien estructurado y sigue buenas prácticas de Astro
- El código es limpio y mantenible
- La documentación en README ahora está actualizada y precisa
- El diseño es minimalista y efectivo
- La base es sólida para agregar features sin romper lo existente
