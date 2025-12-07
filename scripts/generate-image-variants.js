#!/usr/bin/env node

/**
 * Script para generar variantes de imágenes en diferentes tamaños
 * Genera versiones en 400w, 600w, 800w y 1200w para usar con srcset
 */

import { readdir, stat } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BOOKS_DIR = join(__dirname, '../public/books');
const SIZES = [400, 600, 800, 1200];

async function generateVariants() {
  try {
    // Leer todos los archivos en el directorio de libros
    const files = await readdir(BOOKS_DIR);
    // Solo procesar imágenes originales (excluir variantes que ya tienen _400w, _600w, etc.)
    const imageFiles = files.filter(file => 
      /\.(webp|jpg|jpeg|png)$/i.test(file) && !/_\d+w\.(webp|jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Encontradas ${imageFiles.length} imágenes para procesar\n`);

    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const file of imageFiles) {
      const inputPath = join(BOOKS_DIR, file);
      const ext = extname(file);
      const baseName = basename(file, ext);

      try {
        // Verificar que el archivo existe y obtener su tamaño
        const stats = await stat(inputPath);
        if (!stats.isFile()) {
          skipped++;
          continue;
        }

        console.log(`Procesando: ${file}`);

        // Leer la imagen original para obtener sus dimensiones
        const metadata = await sharp(inputPath).metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;

        // Generar variantes solo si la imagen original es más grande que el tamaño objetivo
        const variants = [];
        for (const size of SIZES) {
          // Solo generar si el tamaño original es mayor que el tamaño objetivo
          if (originalWidth > size) {
            const outputPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            
            await sharp(inputPath)
              .resize(size, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85 })
              .toFile(outputPath);

            variants.push(`${size}w`);
            console.log(`  ✓ Generada variante ${size}w`);
          } else {
            console.log(`  - Omitida variante ${size}w (imagen original más pequeña)`);
          }
        }

        if (variants.length > 0) {
          processed++;
          console.log(`  ✓ Completado: ${variants.length} variantes generadas\n`);
        } else {
          skipped++;
          console.log(`  - Sin variantes generadas (imagen muy pequeña)\n`);
        }

      } catch (error) {
        errors++;
        console.error(`  ✗ Error procesando ${file}:`, error.message);
      }
    }

    console.log('\n=== Resumen ===');
    console.log(`Procesadas: ${processed}`);
    console.log(`Omitidas: ${skipped}`);
    console.log(`Errores: ${errors}`);
    console.log(`Total: ${imageFiles.length}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

generateVariants();
