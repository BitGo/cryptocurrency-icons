#!/usr/bin/env node

'use strict';

const { readFileSync, writeFileSync, readdirSync, statSync } = require('fs');
const { join } = require('path');
const { optimize } = require('svgo');

const DIRECTORIES = ['svg', 'originals'];

const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'prefixIds',
      params: {
        delim: '-',
        prefixClassNames: true,
      },
    },
  ],
};

function getAllSvgFiles(dir, files = []) {
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        getAllSvgFiles(fullPath, files);
      } else if (entry.endsWith('.svg')) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Directory doesn't exist, skip
  }
  return files;
}

function cleanSvgs() {
  let totalFiles = 0;
  let optimizedFiles = 0;
  let totalSaved = 0;

  for (const dir of DIRECTORIES) {
    const files = getAllSvgFiles(dir);
    
    for (const file of files) {
      totalFiles++;
      const original = readFileSync(file, 'utf8');
      const originalSize = Buffer.byteLength(original, 'utf8');
      
      try {
        const result = optimize(original, { ...svgoConfig, path: file });
        const optimizedSize = Buffer.byteLength(result.data, 'utf8');
        
        if (result.data !== original) {
          writeFileSync(file, result.data);
          optimizedFiles++;
          const saved = originalSize - optimizedSize;
          totalSaved += saved;
          
          if (saved > 1024) {
            console.log(`  ✓ ${file} (saved ${(saved / 1024).toFixed(1)}KB)`);
          }
        }
      } catch (e) {
        console.error(`  ✗ ${file}: ${e.message}`);
      }
    }
  }

  console.log(`\nSVG Optimization Complete`);
  console.log(`------------------------`);
  console.log(`Total files: ${totalFiles}`);
  console.log(`Optimized: ${optimizedFiles}`);
  console.log(`Total saved: ${(totalSaved / 1024).toFixed(1)}KB`);
}

cleanSvgs();
