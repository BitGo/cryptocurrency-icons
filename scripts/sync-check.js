#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');

const SVG_COLOR_DIR = path.join(__dirname, '..', 'svg', 'color');
const SVG_ICON_DIR = path.join(__dirname, '..', 'svg', 'icon');
const REACT_DIR = path.join(__dirname, '..', 'react');
const MANIFEST_PATH = path.join(__dirname, '..', 'manifest.json');

function syncCheck() {
  const issues = [];

  // Get all SVG files from both color and icon directories (without extension)
  const colorSvgFiles = fs.readdirSync(SVG_COLOR_DIR)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));
  
  const iconSvgFiles = fs.readdirSync(SVG_ICON_DIR)
    .filter(f => f.endsWith('.svg'))
    .map(f => f.replace('.svg', ''));
  
  // Combined list for React component check (generate.js processes both)
  const allSvgFiles = [...new Set([...colorSvgFiles, ...iconSvgFiles])];
  
  // Color SVGs only (for manifest check)
  const svgFiles = colorSvgFiles;

  // Get all React components (without extension)
  const reactFiles = fs.readdirSync(REACT_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => f.replace('.js', ''));

  // Get manifest symbols
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const manifestSymbols = manifest.map(m => m.symbol.toLowerCase());

  console.log('\nSync Check Results\n');
  console.log('------------------');
  console.log(`SVG files (svg/color/): ${colorSvgFiles.length}`);
  console.log(`SVG files (svg/icon/): ${iconSvgFiles.length}`);
  console.log(`React components (react/): ${reactFiles.length}`);
  console.log(`Manifest entries: ${manifestSymbols.length}`);
  console.log('');

  // Check SVG -> React parity (both color and icon directories)
  console.log('Checking SVG -> React parity...');
  let missingReact = 0;
  for (const svg of allSvgFiles) {
    // Handle special case: "index" SVG becomes "indexIcon" React component
    const reactName = svg === 'index' ? 'indexIcon' : svg;
    if (!reactFiles.includes(reactName)) {
      const dir = colorSvgFiles.includes(svg) ? 'svg/color' : 'svg/icon';
      issues.push(`Missing React component: ${dir}/${svg}.svg -> react/${reactName}.js`);
      missingReact++;
    }
  }
  if (missingReact === 0) {
    console.log('  ✅ All SVGs have corresponding React components');
  } else {
    console.log(`  ❌ ${missingReact} SVGs missing React components`);
  }

  // Check React -> SVG parity (orphaned React components)
  // React components can come from either svg/color or svg/icon
  console.log('Checking for orphaned React components...');
  let orphanedReact = 0;
  for (const react of reactFiles) {
    // Handle special case: "indexIcon" React comes from "index" SVG
    const svgName = react === 'indexIcon' ? 'index' : react;
    if (!allSvgFiles.includes(svgName)) {
      issues.push(`Orphaned React component: react/${react}.js (no matching SVG)`);
      orphanedReact++;
    }
  }
  if (orphanedReact === 0) {
    console.log('  ✅ No orphaned React components');
  } else {
    console.log(`  ⚠️  ${orphanedReact} orphaned React components found`);
  }

  // Check manifest -> SVG parity
  console.log('Checking manifest -> SVG parity...');
  let missingManifestSvg = 0;
  for (const symbol of manifestSymbols) {
    const svgName = symbol.toLowerCase();
    // Some symbols start with $ which maps to $symbol.svg
    if (!svgFiles.includes(svgName) && !svgFiles.includes(`$${svgName}`)) {
      issues.push(`Manifest entry "${symbol.toUpperCase()}" has no SVG file`);
      missingManifestSvg++;
    }
  }
  if (missingManifestSvg === 0) {
    console.log('  ✅ All manifest entries have SVG files');
  } else {
    console.log(`  ❌ ${missingManifestSvg} manifest entries missing SVGs`);
  }

  // Check SVG -> manifest parity (SVGs not in manifest)
  console.log('Checking SVG -> manifest parity...');
  let missingSvgManifest = 0;
  for (const svg of svgFiles) {
    // Normalize: remove $ prefix if present
    const normalizedSvg = svg.startsWith('$') ? svg.substring(1) : svg;
    if (!manifestSymbols.includes(normalizedSvg) && !manifestSymbols.includes(svg)) {
      // Only warn, don't error - some SVGs might intentionally not be in manifest
      // issues.push(`SVG "${svg}.svg" not in manifest.json`);
      missingSvgManifest++;
    }
  }
  if (missingSvgManifest === 0) {
    console.log('  ✅ All SVGs are in manifest');
  } else {
    console.log(`  ⚠️  ${missingSvgManifest} SVGs not in manifest (may be intentional)`);
  }

  console.log('');

  // Report issues
  if (issues.length === 0) {
    console.log('✅ All files are in sync!\n');
    process.exit(0);
  } else {
    console.log('Issues found:');
    issues.forEach(i => console.log(`  - ${i}`));
    console.log('');
    
    // Only exit with error for missing React components (critical)
    const criticalIssues = issues.filter(i => i.includes('Missing React component'));
    
    // Auto-fix mode: regenerate React components if requested
    if (shouldFix && criticalIssues.length > 0) {
      console.log('🔧 Running auto-fix for sync issues...\n');
      try {
        console.log('  Running npm run generate...');
        execSync('npm run generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log('\n  ✅ React components regenerated.');
        console.log('\nRe-run sync-check to verify fixes.\n');
      } catch (e) {
        console.log('  ⚠️  Generate failed\n');
      }
    } else if (!shouldFix) {
      console.log('To fix missing React components, run: npm run generate');
      console.log('  Or run: npm run sync-check:fix');
      console.log('To fix manifest issues, run: npm run manifest');
      console.log('');
    }
    
    process.exit(criticalIssues.length > 0 ? 1 : 0);
  }
}

syncCheck();
