#!/usr/bin/env node

'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const PKG = require('../package.json');

function run(cmd, options = {}) {
  console.log(`\n> ${cmd}`);
  try {
    execSync(cmd, { 
      cwd: ROOT, 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return true;
  } catch (e) {
    if (!options.ignoreError) {
      console.error(`Command failed: ${cmd}`);
      process.exit(1);
    }
    return false;
  }
}

function main() {
  console.log('='.repeat(60));
  console.log(`Testing @bitgo-forks/cryptocurrency-icons v${PKG.version}`);
  console.log('='.repeat(60));

  // Step 1: Run preflight
  console.log('\n📦 Step 1: Running preflight...');
  run('npm run preflight');

  // Step 2: Create tarball
  console.log('\n📦 Step 2: Creating tarball...');
  const tarballName = `bitgo-forks-cryptocurrency-icons-${PKG.version}.tgz`;
  const tarballPath = path.join(ROOT, tarballName);
  
  // Remove old tarball if exists
  if (fs.existsSync(tarballPath)) {
    fs.unlinkSync(tarballPath);
  }
  
  run('npm pack');

  if (!fs.existsSync(tarballPath)) {
    console.error(`❌ Tarball not created: ${tarballPath}`);
    process.exit(1);
  }
  
  const tarballSize = fs.statSync(tarballPath).size;
  console.log(`✅ Created ${tarballName} (${(tarballSize / 1024 / 1024).toFixed(2)} MB)`);

  // Step 3: Extract and verify contents
  console.log('\n📦 Step 3: Verifying tarball contents...');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'crypto-icons-test-'));
  
  try {
    execSync(`tar -xzf ${tarballPath} -C ${tempDir}`, { cwd: ROOT });
    
    const extractedDir = path.join(tempDir, 'package');
    const requiredFiles = [
      'package.json',
      'manifest.json',
      'react/index.js',
      'react/index.d.ts',
      'react/Btc.js',
      'react/Eth.js',
      'svg/color/btc.svg',
      'svg/color/eth.svg',
      'svg/icon/btc.svg',
      '32/color/btc.png',
      '128/color/btc.png',
    ];
    
    const missing = [];
    const found = [];
    
    for (const file of requiredFiles) {
      const fullPath = path.join(extractedDir, file);
      if (fs.existsSync(fullPath)) {
        found.push(file);
      } else {
        missing.push(file);
      }
    }
    
    console.log(`\n✅ Found ${found.length}/${requiredFiles.length} required files`);
    
    if (missing.length > 0) {
      console.error('\n❌ Missing files:');
      missing.forEach(f => console.error(`   - ${f}`));
      process.exit(1);
    }

    // Count total files
    const countFiles = (dir) => {
      let count = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          count += countFiles(path.join(dir, entry.name));
        } else {
          count++;
        }
      }
      return count;
    };
    
    const totalFiles = countFiles(extractedDir);
    console.log(`📊 Total files in package: ${totalFiles}`);
    
    // Verify React components count
    const reactFiles = fs.readdirSync(path.join(extractedDir, 'react')).filter(f => f.endsWith('.js'));
    console.log(`📊 React components: ${reactFiles.length}`);
    
    // Verify SVG count
    const svgColorFiles = fs.readdirSync(path.join(extractedDir, 'svg/color')).filter(f => f.endsWith('.svg'));
    console.log(`📊 Color SVGs: ${svgColorFiles.length}`);
    
  } finally {
    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ Package verified successfully!');
  console.log('='.repeat(60));
  console.log(`\nTo install in another project:`);
  console.log(`  npm install ${tarballPath}`);
  console.log(`  # or`);
  console.log(`  pnpm add ${tarballPath}`);
  console.log('');
}

main();
