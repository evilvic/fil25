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

### 3. Accesibilidad
- **Oportunidad**: 
  - Mejorar contraste en modo oscuro
  - ARIA labels en elementos interactivos
  - Navegación por teclado
  - Skip links
- **Valor**: Cumplimiento WCAG, mejor experiencia para todos

### 4. Performance
- **Oportunidad**: 
  - Preload de fuentes críticas
  - Critical CSS inline
  - Service Worker para cache offline
  - Bundle analysis
- **Métrica objetivo**: Lighthouse score > 90

### 5. Testing
- **Oportunidad**: Tests automatizados
- **Implementación**: 
  - Vitest para unit tests
  - Playwright para E2E
  - Tests de regresión visual

## 🔵 Mejoras de UX/UI

### 6. Animaciones y transiciones
- **Oportunidad**: 
  - Transiciones suaves al filtrar/ordenar
  - Animación de aparición de tarjetas (stagger)
  - Hover effects más elaborados
- **Nota**: Respetar `prefers-reduced-motion` (ya implementado)

### 7. Modo de visualización
- **Oportunidad**: 
  - Toggle entre grid y lista
  - Tamaño de grid ajustable
  - Vista compacta vs. expandida

### 8. Exportación de datos
- **Oportunidad**: 
  - Exportar a CSV/JSON
  - Generar PDF del catálogo
  - Compartir lista en redes sociales

### 9. Feedback visual
- **Oportunidad**: 
  - Indicador de carga
  - Mensajes de estado (sin resultados en búsqueda)
  - Confirmación al marcar como leído (si se hace desde UI)

## 🟣 Mejoras de Datos

### 10. Campos adicionales en JSON
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

### 11. Integración con APIs
- **Oportunidad**: 
  - Auto-completar datos desde Open Library API
  - Obtener portadas automáticamente
  - Sincronizar con Goodreads/LibraryThing

### 12. Historial de cambios
- **Oportunidad**: Tracking de cuándo se agregó cada libro, cuándo se leyó
- **Implementación**: Git history o campo `addedDate` en JSON

## 🟠 Mejoras de Infraestructura

### 13. CI/CD
- **Oportunidad**: 
  - GitHub Actions para build automático
  - Deploy automático a Vercel/Netlify
  - Validación de JSON en PRs
  - Preview deployments

### 14. Monitoreo y analytics
- **Oportunidad**: 
  - Analytics básico (Plausible, GoatCounter - privacy-friendly)
  - Error tracking (Sentry)
  - Performance monitoring

### 15. Documentación
- **Oportunidad**: 
  - Documentación de API (si se agrega)
  - Guía de contribución
  - Changelog
  - Ejemplos de uso avanzado

## 📊 Priorización Sugerida

### Fase 1 (Quick wins - 1-2 días)
1. Ordenamiento - #1

### Fase 2 (Mejoras medias - 1 semana)
2. Mejoras de accesibilidad - #3
3. Performance - #4

### Fase 3 (Features mayores - 2-3 semanas)
4. Vista detalle de libro - #2
5. Campos adicionales en JSON - #10
6. CI/CD y deploy automático - #13
7. Testing básico - #5

### Fase 4 (Nice to have)
8. Integración con APIs externas - #11
9. Exportación de datos - #8
10. Analytics y monitoreo - #14

## ✅ Completado

- **Imagen faltante**: Convertida a WebP y referencia actualizada en JSON
- **Validación de datos**: JSON Schema, script de validación y tipos TypeScript implementados
- **Estadísticas básicas**: Mostradas en el párrafo introductorio (total, leídos, pendientes)
- **Filtrado y búsqueda**: Sistema completo de filtros dinámicos con búsqueda en tiempo real, filtros por estado/autor/editorial, URL params y diseño responsivo
- **Optimización de imágenes**: Intersection Observer para lazy loading mejorado, 152 variantes generadas (400w, 600w, 800w, 1200w), srcset responsivo implementado
- **SEO mejorado**: Open Graph tags, Twitter Cards, Schema.org JSON-LD con datos estructurados de libros, sitemap.xml dinámico, robots.txt configurado

## 📝 Notas Adicionales

- El proyecto está bien estructurado y sigue buenas prácticas de Astro
- El código es limpio y mantenible
- La documentación en README ahora está actualizada y precisa
- El diseño es minimalista y efectivo
- La base es sólida para agregar features sin romper lo existente
