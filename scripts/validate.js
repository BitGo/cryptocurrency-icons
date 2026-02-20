#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');

const SVG_DIR = path.join(__dirname, '..', 'svg', 'color');
const MAX_SIZE = 100 * 1024; // 100KB - hard limit
const WARN_SIZE = 50 * 1024; // 50KB - warning threshold

// Security: Event handlers that can execute JavaScript
const DANGEROUS_EVENT_HANDLERS = [
  'onabort', 'onactivate', 'onbegin', 'oncancel', 'oncanplay', 'oncanplaythrough',
  'onchange', 'onclick', 'onclose', 'oncopy', 'oncuechange', 'oncut', 'ondblclick',
  'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart',
  'ondrop', 'ondurationchange', 'onemptied', 'onend', 'onended', 'onerror', 'onfocus',
  'onfocusin', 'onfocusout', 'onhashchange', 'oninput', 'oninvalid', 'onkeydown',
  'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart',
  'onmessage', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout',
  'onmouseover', 'onmouseup', 'onmousewheel', 'onoffline', 'ononline', 'onpagehide',
  'onpageshow', 'onpaste', 'onpause', 'onplay', 'onplaying', 'onpopstate', 'onprogress',
  'onratechange', 'onrepeat', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking',
  'onselect', 'onshow', 'onstalled', 'onstorage', 'onsubmit', 'onsuspend', 'ontimeupdate',
  'ontoggle', 'onunload', 'onvolumechange', 'onwaiting', 'onwheel', 'onzoom'
];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}KB`;
}

/**
 * Check SVG content for security issues (malicious JavaScript)
 * @param {string} content - SVG file content
 * @returns {string[]} Array of security issues found
 */
function checkSecurity(content) {
  const securityIssues = [];
  const contentLower = content.toLowerCase();

  // Check for <script> tags
  if (/<script[\s>]/i.test(content)) {
    securityIssues.push('Contains <script> tag');
  }

  // Check for javascript: URLs
  if (/javascript\s*:/i.test(content)) {
    securityIssues.push('Contains javascript: URL');
  }

  // Check for data: URLs with JavaScript MIME types
  if (/data\s*:\s*(text\/javascript|application\/javascript|text\/ecmascript)/i.test(content)) {
    securityIssues.push('Contains data: URL with JavaScript MIME type');
  }

  // Check for event handlers
  for (const handler of DANGEROUS_EVENT_HANDLERS) {
    const regex = new RegExp(`${handler}\\s*=`, 'i');
    if (regex.test(content)) {
      securityIssues.push(`Contains event handler: ${handler}`);
      break; // Only report once per file
    }
  }

  // Check for <foreignObject> which can embed HTML/JS
  if (/<foreignobject[\s>]/i.test(content)) {
    securityIssues.push('Contains <foreignObject> tag (can embed HTML/JS)');
  }

  // Check for <use> with external references (can load external content)
  if (/<use[^>]+href\s*=\s*["'][^#]/i.test(content)) {
    securityIssues.push('Contains <use> with external href (potential XSS vector)');
  }

  // Check for xlink:href with javascript:
  if (/xlink:href\s*=\s*["']\s*javascript:/i.test(content)) {
    securityIssues.push('Contains xlink:href with javascript: URL');
  }

  // Check for href with javascript:
  if (/href\s*=\s*["']\s*javascript:/i.test(content)) {
    securityIssues.push('Contains href with javascript: URL');
  }

  // Check for set/animate targeting event handlers
  if (/<(set|animate)[^>]+attributename\s*=\s*["']on/i.test(content)) {
    securityIssues.push('Contains animation targeting event handler attribute');
  }

  // Check for embedded HTML via CDATA
  if (/CDATA\s*\[.*<(script|iframe|object|embed)/i.test(content)) {
    securityIssues.push('Contains suspicious content in CDATA section');
  }

  return securityIssues;
}

function validate() {
  const files = fs.readdirSync(SVG_DIR).filter(f => f.endsWith('.svg'));
  const issues = { errors: [], warnings: [], security: [] };
  let totalSize = 0;

  console.log(`\nValidating ${files.length} SVG files in svg/color/\n`);

  for (const file of files) {
    const filePath = path.join(SVG_DIR, file);
    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    totalSize += stats.size;

    // Security checks (CRITICAL - always run first)
    const securityIssues = checkSecurity(content);
    for (const issue of securityIssues) {
      issues.security.push(`${file}: ${issue}`);
    }

    // Size checks (warnings for pre-existing files - see CLEANUP-TRACKING.md)
    if (stats.size > MAX_SIZE) {
      issues.warnings.push(`${file}: ${formatSize(stats.size)} exceeds 100KB limit`);
    } else if (stats.size > WARN_SIZE) {
      issues.warnings.push(`${file}: ${formatSize(stats.size)} (consider optimizing)`);
    }

    // Embedded image check (warnings for pre-existing files - see CLEANUP-TRACKING.md)
    if (content.includes('data:image/png;base64') || 
        content.includes('data:image/jpeg;base64') ||
        content.includes('data:image/jpg;base64')) {
      issues.warnings.push(`${file}: Contains embedded base64 raster image`);
    }

    // viewBox check
    if (!content.includes('viewBox')) {
      issues.warnings.push(`${file}: Missing viewBox attribute`);
    }

    // Empty or invalid SVG check
    if (!content.includes('<svg')) {
      issues.errors.push(`${file}: Invalid SVG (no <svg> tag found)`);
    }

    // Check for empty file
    if (content.trim().length === 0) {
      issues.errors.push(`${file}: Empty file`);
    }
  }

  // Summary
  console.log('Summary');
  console.log('-------');
  console.log(`Total files: ${files.length}`);
  console.log(`Total size: ${formatSize(totalSize)}`);
  console.log(`Average size: ${formatSize(Math.round(totalSize / files.length))}`);
  console.log('');

  // Report security issues (CRITICAL - always first)
  if (issues.security.length > 0) {
    console.log(`🚨 SECURITY ISSUES (${issues.security.length}):`);
    issues.security.forEach(s => console.log(`  🚨 ${s}`));
    console.log('');
  }

  // Report errors
  if (issues.errors.length > 0) {
    console.log(`ERRORS (${issues.errors.length}):`);
    issues.errors.forEach(e => console.log(`  ❌ ${e}`));
    console.log('');
  }

  // Report warnings
  if (issues.warnings.length > 0) {
    console.log(`WARNINGS (${issues.warnings.length}):`);
    issues.warnings.forEach(w => console.log(`  ⚠️  ${w}`));
    console.log('');
  }

  // Final status
  const hasSecurityIssues = issues.security.length > 0;
  const hasErrors = issues.errors.length > 0;
  const hasWarnings = issues.warnings.length > 0;

  if (hasSecurityIssues) {
    console.log('🚨 SECURITY VALIDATION FAILED - Potentially malicious content detected!\n');
    console.log('SVG files must not contain:');
    console.log('  - <script> tags');
    console.log('  - Event handlers (onclick, onload, onerror, etc.)');
    console.log('  - javascript: URLs');
    console.log('  - <foreignObject> tags');
    console.log('  - External references via <use> href\n');
  } else if (!hasErrors && !hasWarnings) {
    console.log('✅ All SVG files passed validation!\n');
  } else if (!hasErrors) {
    console.log('✅ Validation passed with warnings.\n');
  } else {
    console.log('❌ Validation failed. Please fix errors above.\n');
  }

  // Auto-fix mode: run safe fixes if requested
  if (shouldFix && (hasErrors || hasWarnings) && !hasSecurityIssues) {
    console.log('🔧 Running auto-fix...\n');
    
    // Run svgo to optimize SVGs (may help with size issues)
    try {
      console.log('  Running npm run clean (svgo optimization)...');
      execSync('npm run clean', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
      console.log('  ✅ SVG optimization complete\n');
    } catch (e) {
      console.log('  ⚠️  Clean failed, continuing...\n');
    }
    
    // Regenerate React components
    try {
      console.log('  Running npm run generate...');
      execSync('npm run generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
      console.log('  ✅ React components regenerated\n');
    } catch (e) {
      console.log('  ⚠️  Generate failed\n');
    }
    
    console.log('Auto-fix complete. Re-run validate to check remaining issues.\n');
  } else if (shouldFix && hasSecurityIssues) {
    console.log('⚠️  Cannot auto-fix security issues. Manual intervention required.\n');
  }

  // Exit with error code if there are security issues or errors
  // Security issues are the highest priority
  process.exit((hasSecurityIssues || hasErrors) ? 1 : 0);
}

validate();
