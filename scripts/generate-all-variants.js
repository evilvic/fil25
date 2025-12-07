#!/usr/bin/env node

/**
 * Script para generar TODAS las variantes faltantes de imágenes
 */

import { readFileSync, existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BOOKS_DIR = join(__dirname, '../public/books');
const SIZES = [400, 600, 800, 1200];

async function generateAllVariants() {
  try {
    const files = await readdir(BOOKS_DIR);
    const images = files.filter(file => 
      /\.(webp|jpg|jpeg|png)$/i.test(file) && !/_\d+w\.(webp|jpg|jpeg|png)$/i.test(file)
    );

    console.log(`📚 Procesando ${images.length} imágenes...\n`);

    let totalGenerated = 0;
    let totalSkipped = 0;

    for (const file of images) {
      const inputPath = join(BOOKS_DIR, file);
      const ext = extname(file);
      const baseName = basename(file, ext);

      try {
        const metadata = await sharp(inputPath).metadata();
        const originalWidth = metadata.width;

        if (!originalWidth) {
          console.log(`⚠️  ${file}: No se pudo leer metadata\n`);
          continue;
        }

        console.log(`🖼️  ${file} (${originalWidth}px)`);

        const variantsToGenerate = [];
        for (const size of SIZES) {
          if (originalWidth > size) {
            const variantPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            if (!existsSync(variantPath)) {
              variantsToGenerate.push(size);
            }
          }
        }

        if (variantsToGenerate.length > 0) {
          for (const size of variantsToGenerate) {
            const outputPath = join(BOOKS_DIR, `${baseName}_${size}w${ext}`);
            
            await sharp(inputPath)
              .resize(size, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: 85 })
              .toFile(outputPath);

            totalGenerated++;
            console.log(`   ✓ Generada ${size}w`);
          }
          console.log('');
        } else {
          console.log(`   ✓ Todas las variantes necesarias ya existen\n`);
          totalSkipped++;
        }

      } catch (error) {
        console.error(`   ✗ Error: ${error.message}\n`);
      }
    }

    console.log('='.repeat(50));
    console.log(`✅ Variantes generadas: ${totalGenerated}`);
    console.log(`⏭️  Sin cambios: ${totalSkipped}`);
    console.log(`📊 Total imágenes: ${images.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateAllVariants();
