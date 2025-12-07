#!/usr/bin/env node

/**
 * Script de validación para libros.json
 * Valida la estructura y tipos de datos según el schema JSON
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

// Leer el schema
const schemaPath = join(__dirname, '../src/data/libros.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

// Leer los datos
const dataPath = join(__dirname, '../src/data/libros.json');
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

// Compilar el validador
const validate = ajv.compile(schema);

// Validar
const valid = validate(data);

if (!valid) {
  console.error('❌ Validación fallida para libros.json\n');
  console.error('Errores encontrados:');
  
  validate.errors.forEach((error, index) => {
    console.error(`\n${index + 1}. ${error.instancePath || 'raíz'}:`);
    console.error(`   - ${error.message}`);
    if (error.params) {
      Object.entries(error.params).forEach(([key, value]) => {
        console.error(`     ${key}: ${value}`);
      });
    }
  });
  
  process.exit(1);
}

// Validaciones adicionales
import { existsSync } from 'fs';

let hasWarnings = false;

// Verificar que las imágenes referenciadas existan (opcional, solo warning)
data.forEach((book, index) => {
  if (book.image) {
    const imagePath = join(__dirname, '..', 'public', book.image);
    if (!existsSync(imagePath)) {
      console.warn(`⚠️  Advertencia: Imagen no encontrada para "${book.title}"`);
      console.warn(`   Ruta esperada: ${imagePath}`);
      hasWarnings = true;
    }
  }
  
  // Validar formato de fecha si existe
  if (book.readDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(book.readDate)) {
      console.error(`❌ Error: Formato de fecha inválido en libro "${book.title}"`);
      console.error(`   Fecha: ${book.readDate} (debe ser YYYY-MM-DD)`);
      process.exit(1);
    }
    
    // Validar que la fecha sea válida
    const date = new Date(book.readDate);
    if (isNaN(date.getTime())) {
      console.error(`❌ Error: Fecha inválida en libro "${book.title}"`);
      console.error(`   Fecha: ${book.readDate}`);
      process.exit(1);
    }
  }
});

// Validar duplicados por título
const titles = data.map(book => book.title.toLowerCase().trim());
const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);
if (duplicates.length > 0) {
  console.warn(`⚠️  Advertencia: Títulos duplicados encontrados:`);
  duplicates.forEach(title => {
    console.warn(`   - "${title}"`);
  });
  hasWarnings = true;
}

if (hasWarnings) {
  console.log('\n✅ Validación de estructura completada (con advertencias)');
} else {
  console.log('✅ Validación completada exitosamente');
  console.log(`   Total de libros: ${data.length}`);
  const readBooks = data.filter(book => book.readDate).length;
  console.log(`   Libros leídos: ${readBooks}`);
  console.log(`   Libros pendientes: ${data.length - readBooks}`);
}

process.exit(0);
