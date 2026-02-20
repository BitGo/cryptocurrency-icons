# SVG Cleanup Tracking

This document tracks pre-existing issues in the cryptocurrency-icons repository that require manual cleanup.

## Summary

| Issue Type | Count | Auto-fixable? |
|------------|-------|---------------|
| Embedded base64 raster images | ~1,250 | No |
| Oversized SVGs (>100KB) | ~48 | Partial |
| Missing viewBox | ~15 | No |

## Embedded Base64 Images (Priority: High)

These SVGs contain embedded PNG/JPEG data instead of vector graphics. This causes:
- Large file sizes (some >1MB)
- Poor scaling at different resolutions
- Increased bundle size for consumers

### Why This Matters

SVGs with embedded raster images defeat the purpose of using SVGs:
- They don't scale well
- They're much larger than necessary
- They can't be styled with CSS

### How to Fix

Each icon needs to be replaced with a proper vector version:

1. **Source from official brand assets** - Many projects provide official SVG logos
2. **Recreate in vector format** - Use Figma/Illustrator to trace the raster image
3. **Use a simpler design** - Some complex logos can be simplified

### Files Requiring Cleanup

Run `npm run validate` to see the full list. Key examples:

| File | Size | Issue |
|------|------|-------|
| alex.svg | 1002KB | Embedded base64 + oversized |
| aedz.svg | 607KB | Embedded base64 + oversized |
| acxt.svg | 247KB | Embedded base64 + oversized |
| 0x.svg | 238KB | Embedded base64 + oversized |

## Oversized SVGs (Priority: Medium)

SVGs exceeding 100KB limit. Most are oversized because of embedded raster images.

**CI Status**: The `validate.yml` workflow will warn about oversized SVGs. These are informational warnings until cleanup is complete.

## Missing viewBox (Priority: Low)

Some SVGs are missing the `viewBox` attribute, which can cause rendering issues at different sizes.

**Fix**: Add appropriate `viewBox` attribute based on the SVG dimensions.

## Cleanup Process

When cleaning up icons:

1. Find or create a proper vector version
2. Replace the file in `svg/color/`
3. Run `npm run clean` to optimize
4. Run `npm run generate` to update React component
5. Run `npm run validate` to verify fix
6. Submit PR

## Related Scripts

| Script | Purpose |
|--------|---------|
| `npm run validate` | Check all SVGs for issues |
| `npm run clean` | Optimize SVGs with SVGO |
| `npm run generate` | Regenerate React components |
| `npm run preflight` | Run all fixes and validations |
