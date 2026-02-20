# Copilot Instructions

Repository-specific guidance for GitHub Copilot when reviewing PRs or assisting with code in this repository.

## Repository Purpose

This is a cryptocurrency icon library that generates SVG icons and React components for BitGo applications. It's a fork of [spothq/cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons).

## Key Workflows

### Adding Icons

When reviewing PRs that add new icons:

1. **SVG must be in `svg/color/{symbol}.svg`** (lowercase filename)
2. **Manifest entry required** in `manifest.json`
3. **React component must be generated** - check `react/{symbol}.js` exists
4. **All three files should be committed together**

### Required Scripts

After adding/modifying SVGs, these scripts must be run:

```bash
npm run manifest    # Update names and colors
npm run generate    # Create React components
```

## SVG Requirements

### Security (BLOCKING - must fail PR)

Reject PRs containing any of these in SVG files:

- `<script>` tags
- Event handlers (`onclick`, `onload`, `onerror`, etc.)
- `javascript:` URLs
- `<foreignObject>` tags

### Quality (WARNING - don't block, but flag)

Flag but don't block PRs with:

- Files over 100KB (pre-existing tech debt ~48 files)
- Embedded base64 images (pre-existing tech debt ~1,250 files)
- Missing `viewBox` attribute

These are pre-existing issues tracked in `CLEANUP-TRACKING.md`.

## React Components

- Generated from SVGs using `npm run generate`
- Accept `prefixId` prop for ID namespacing
- Located in `react/` directory
- **Never edit directly** - regenerate from source SVG

## Review Checklist

When reviewing PRs:

- [ ] New SVGs have corresponding React components
- [ ] manifest.json includes new symbols
- [ ] No security violations in SVG content
- [ ] SVG uses proper vector paths (not embedded rasters)
- [ ] File size is reasonable (<100KB, ideally <20KB)

## File Structure

```
svg/color/    # Source SVGs (primary)
svg/icon/     # Outline variants
svg/white/    # White monochrome
svg/black/    # Black monochrome
react/        # Generated React components (don't edit)
manifest.json # Icon metadata
```

## Common Issues

### "React component not generated"

Contributor forgot to run `npm run generate`. Request they run it and commit the result.

### "Manifest out of sync"

Contributor forgot to run `npm run manifest`. Request they run it and commit the result.

### "Large file size"

Usually indicates embedded raster image. Suggest re-exporting from design tool as proper vector.
