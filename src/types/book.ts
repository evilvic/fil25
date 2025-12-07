/**
 * Tipo TypeScript para la estructura de un libro
 * Mantiene consistencia entre el schema JSON y el código
 */
export interface Book {
  /** Título del libro (requerido) */
  title: string;
  
  /** Subtítulo opcional del libro */
  subtitle?: string;
  
  /** Array de autores (mínimo 1 autor requerido) */
  author: string[];
  
  /** Array de editoriales (mínimo 1 editorial requerida) */
  publishers: string[];
  
  /** Ruta a la imagen de portada (debe comenzar con /books/ y tener extensión válida) */
  image?: string;
  
  /** Fecha de lectura en formato YYYY-MM-DD (opcional, si existe = leído) */
  readDate?: string;
}
