#!/usr/bin/env node

/**
 * Script para analizar el tamaño del bundle después del build
 * Muestra el tamaño de los archivos generados en dist/
 */

import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, '../dist');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function getFileSize(filePath) {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

async function analyzeDirectory(dir, prefix = '') {
  const files = await readdir(dir, { withFileTypes: true });
  const results = [];

  for (const file of files) {
    const fullPath = join(dir, file.name);
    const relativePath = prefix ? `${prefix}/${file.name}` : file.name;

    if (file.isDirectory()) {
      const subResults = await analyzeDirectory(fullPath, relativePath);
      results.push(...subResults);
    } else {
      const size = await getFileSize(fullPath);
      results.push({ path: relativePath, size });
    }
  }

  return results;
}

async function analyzeBundle() {
  try {
    console.log('📊 Analizando bundle...\n');

    const files = await analyzeDirectory(DIST_DIR);
    
    // Ordenar por tamaño (mayor a menor)
    files.sort((a, b) => b.size - a.size);

    let totalSize = 0;
    const categories = {
      html: [],
      css: [],
      js: [],
      images: [],
      fonts: [],
      other: []
    };

    files.forEach(file => {
      totalSize += file.size;
      const ext = file.path.split('.').pop()?.toLowerCase();
      
      if (file.path.endsWith('.html')) {
        categories.html.push(file);
      } else if (file.path.endsWith('.css')) {
        categories.css.push(file);
      } else if (file.path.endsWith('.js')) {
        categories.js.push(file);
      } else if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'].includes(ext)) {
        categories.images.push(file);
      } else if (['woff', 'woff2', 'ttf', 'otf'].includes(ext)) {
        categories.fonts.push(file);
      } else {
        categories.other.push(file);
      }
    });

    console.log('📁 Archivos por categoría:\n');

    if (categories.html.length > 0) {
      console.log('📄 HTML:');
      categories.html.forEach(file => {
        console.log(`   ${file.path.padEnd(50)} ${formatBytes(file.size)}`);
      });
      console.log('');
    }

    if (categories.css.length > 0) {
      console.log('🎨 CSS:');
      categories.css.forEach(file => {
        console.log(`   ${file.path.padEnd(50)} ${formatBytes(file.size)}`);
      });
      console.log('');
    }

    if (categories.js.length > 0) {
      console.log('⚡ JavaScript:');
      categories.js.forEach(file => {
        console.log(`   ${file.path.padEnd(50)} ${formatBytes(file.size)}`);
      });
      console.log('');
    }

    if (categories.fonts.length > 0) {
      const fontsSize = categories.fonts.reduce((sum, f) => sum + f.size, 0);
      console.log('🔤 Fuentes:');
      categories.fonts.forEach(file => {
        console.log(`   ${file.path.padEnd(50)} ${formatBytes(file.size)}`);
      });
      console.log(`   Total fuentes: ${formatBytes(fontsSize)}\n`);
    }

    if (categories.images.length > 0) {
      const imagesSize = categories.images.reduce((sum, f) => sum + f.size, 0);
      console.log('🖼️  Imágenes:');
      console.log(`   Total imágenes: ${formatBytes(imagesSize)} (${categories.images.length} archivos)\n`);
    }

    if (categories.other.length > 0) {
      console.log('📦 Otros:');
      categories.other.forEach(file => {
        console.log(`   ${file.path.padEnd(50)} ${formatBytes(file.size)}`);
      });
      console.log('');
    }

    console.log('='.repeat(60));
    console.log(`📊 Tamaño total: ${formatBytes(totalSize)}`);
    console.log(`📁 Total archivos: ${files.length}`);
    
    // Recomendaciones
    console.log('\n💡 Recomendaciones:');
    const htmlSize = categories.html.reduce((sum, f) => sum + f.size, 0);
    const cssSize = categories.css.reduce((sum, f) => sum + f.size, 0);
    const jsSize = categories.js.reduce((sum, f) => sum + f.size, 0);
    
    if (htmlSize > 100 * 1024) {
      console.log('   ⚠️  HTML > 100KB: Considera code splitting');
    }
    if (cssSize > 50 * 1024) {
      console.log('   ⚠️  CSS > 50KB: Considera purgar CSS no usado');
    }
    if (jsSize > 100 * 1024) {
      console.log('   ⚠️  JS > 100KB: Considera code splitting o minificación');
    }
    if (totalSize < 500 * 1024) {
      console.log('   ✅ Bundle total < 500KB: Excelente!');
    }

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: No se encontró el directorio dist/');
      console.error('   Ejecuta "npm run build" primero');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

analyzeBundle();
