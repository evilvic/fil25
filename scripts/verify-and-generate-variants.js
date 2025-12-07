#!/usr/bin/env node

/**
 * Script para verificar y generar todas las variantes de imágenes faltantes
 * Verifica qué imágenes están en el JSON y genera las variantes que faltan
 */

import { readFileSync } from 'fs';
import { readdir, stat, access } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BOOKS_DIR = join(__dirname, '../public/books');
const LIBROS_JSON = join(__dirname, '../src/data/libros.json');
const SIZES = [400, 600, 800, 1200];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function verifyAndGenerate() {
  try {
    // Leer el JSON de libros
    const librosData = JSON.parse(readFileSync(LIBROS_JSON, 'utf-8'));
    const imagesInJSON = librosData
      .filter(book => book.image)
      .map(book => book.image.replace('/books/', ''));

    console.log(`📚 Imágenes referenciadas en JSON: ${imagesInJSON.length}\n`);

    // Verificar qué imágenes existen físicamente
    const allFiles = await readdir(BOOKS_DIR);
    const existingImages = allFiles.filter(file => 
      /\.(webp|jpg|jpeg|png)$/i.test(file) && !/_\d+w\.(webp|jpg|jpeg|png)$/i.test(file)
    );

    console.log(`📁 Imágenes existentes en public/books/: ${existingImages.length}\n`);

    // Verificar imágenes faltantes
    const missingImages = imagesInJSON.filter(img => !existingImages.includes(img));
    if (missingImages.length > 0) {
      console.log(`⚠️  Imágenes referenciadas en JSON pero no encontradas:`);
      missingImages.forEach(img => console.log(`   - ${img}`));
      console.log('');
    }

    // Procesar todas las imágenes existentes
    let processed = 0;
    let skipped = 0;
    let errors = 0;
    let variantsGenerated = 0;

    for (const file of existingImages) {
      const inputPath = join(BOOKS_DIR, file);
      const ext = extname(file);
      const baseName = basename(file, ext);

      try {
        const stats = await stat(inputPath);
        if (!stats.isFile()) {
          skipped++;
          continue;
        }

        console.log(`🖼️  Procesando: ${file}`);

        // Leer metadata de la imagen
        const metadata = await sharp(inputPath).metadata();
        const originalWidth = metadata.width;

        if (!originalWidth) {
          console.log(`   ⚠️  No se pudo leer metadata, omitiendo\n`);
          skipped++;
          continue;
        }

        // Verificar y generar variantes faltantes
        const variantsToGenerate = [];
        for (const size of SIZES) {
          if (originalWidth > size) {
            const variantPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            const exists = await fileExists(variantPath);
            
            if (!exists) {
              variantsToGenerate.push(size);
            }
          } else {
            // Si la imagen es más pequeña que el tamaño, no generar esa variante
            // pero verificar si existe una variante más grande que debería eliminarse
            const variantPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            if (await fileExists(variantPath)) {
              console.log(`   ⚠️  Variante ${size}w existe pero la imagen original es más pequeña (${originalWidth}px)`);
            }
          }
        }

        if (variantsToGenerate.length > 0) {
          console.log(`   📦 Generando ${variantsToGenerate.length} variantes faltantes...`);
          
          for (const size of variantsToGenerate) {
            const outputPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            
            await sharp(inputPath)
              .resize(size, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85 })
              .toFile(outputPath);

            variantsGenerated++;
            console.log(`   ✓ Generada variante ${size}w`);
          }
          
          processed++;
          console.log(`   ✅ Completado\n`);
        } else {
          // Verificar si todas las variantes necesarias ya existen
          let allVariantsExist = true;
          for (const size of SIZES) {
            if (originalWidth > size) {
              const variantPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
              if (!(await fileExists(variantPath))) {
                allVariantsExist = false;
                break;
              }
            }
          }
          
          if (allVariantsExist) {
            console.log(`   ✓ Todas las variantes ya existen\n`);
          } else {
            console.log(`   - Imagen muy pequeña, no se requieren variantes\n`);
          }
          skipped++;
        }

      } catch (error) {
        errors++;
        console.error(`   ✗ Error procesando ${file}:`, error.message);
        console.log('');
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN');
    console.log('='.repeat(50));
    console.log(`Imágenes procesadas: ${processed}`);
    console.log(`Variantes generadas: ${variantsGenerated}`);
    console.log(`Imágenes omitidas: ${skipped}`);
    console.log(`Errores: ${errors}`);
    console.log(`Total de imágenes: ${existingImages.length}`);
    console.log(`Imágenes en JSON: ${imagesInJSON.length}`);
    
    if (missingImages.length > 0) {
      console.log(`\n⚠️  ADVERTENCIA: ${missingImages.length} imagen(es) referenciada(s) en JSON pero no encontrada(s)`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyAndGenerate();
