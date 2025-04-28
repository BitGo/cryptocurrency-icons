#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const SVG_DIR = path.join(__dirname, '..', 'svg', 'color');

/**
 * Creates a CSS-safe prefix from a filename
 * CSS class names can't start with a number or special characters
 * @param {string} fileName - The filename without extension
 * @returns {string} CSS-safe prefix
 */
function createCssSafePrefix(fileName) {
  // Check if the filename starts with a number or special character
  if (/^[^a-zA-Z_]/.test(fileName)) {
    return `_${fileName}`;
  }
  return fileName;
}

/**
 * Process an SVG file to prefix class names with the filename
 * @param {string} filePath - Path to SVG file
 */
async function processFile(filePath) {
  const fileName = path.basename(filePath, '.svg');
  const content = await readFile(filePath, 'utf8');
  const cssPrefix = createCssSafePrefix(fileName);

  // Check if file has style tags
  if (!content.includes('<style')) {
    console.log(`Skipping ${fileName}.svg (no style tags)`);
    return;
  }

  console.log(`Processing ${fileName}.svg`);

  // Extract class names from style tag
  const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  const classRegex = /\.([a-zA-Z0-9_-]+)\s*{/g;
  
  let styleMatch = styleRegex.exec(content);
  if (!styleMatch) return; // No style tag found

  const styleContent = styleMatch[0];
  let classMatch;
  const classNames = [];
  
  // Reset regex to find all classes
  classRegex.lastIndex = 0;
  while ((classMatch = classRegex.exec(styleContent)) !== null) {
    // Only add class names that don't already have the filename prefix
    const className = classMatch[1];
    if (!className.startsWith(`${cssPrefix}-`)) {
      classNames.push(className);
    }
  }
  
  if (classNames.length === 0) {
    console.log(`No changes needed for ${fileName}.svg (classes already prefixed or no classes found)`);
    return; // No classes to modify
  }
  
  let newContent = content;
  let modified = false;
  
  // Replace class names in style tags
  classNames.forEach(className => {
    const newClassName = `${cssPrefix}-${className}`;
    
    // Replace in style definition
    const classDefRegex = new RegExp(`\\.${className}\\s*{`, 'g');
    const newContentAfterStyleChange = newContent.replace(classDefRegex, `.${newClassName} {`);
    
    if (newContentAfterStyleChange !== newContent) {
      modified = true;
      newContent = newContentAfterStyleChange;
    }
    
    // Replace in class attributes
    const classAttrRegex = new RegExp(`class="([^"]*\\b)${className}(\\b[^"]*)"`, 'g');
    const newContentAfterClassChange = newContent.replace(classAttrRegex, (match, prefix, suffix) => {
      return `class="${prefix}${newClassName}${suffix}"`;
    });
    
    if (newContentAfterClassChange !== newContent) {
      modified = true;
      newContent = newContentAfterClassChange;
    }
  });
  
  if (modified) {
    // Write the updated content back to the file
    await writeFile(filePath, newContent, 'utf8');
    console.log(`Updated ${fileName}.svg with prefixed class names`);
  } else {
    console.log(`No changes needed for ${fileName}.svg (classes already updated)`);
  }
}

/**
 * Main function to process all SVG files
 */
async function main() {
  try {
    const files = await readDir(SVG_DIR);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
    
    console.log(`Found ${svgFiles.length} SVG files in ${SVG_DIR}`);
    
    // Process each file
    for (const file of svgFiles) {
      const filePath = path.join(SVG_DIR, file);
      await processFile(filePath);
    }
    
    console.log('All SVG files processed successfully!');
  } catch (error) {
    console.error('Error processing SVG files:', error);
    process.exit(1);
  }
}

main();
