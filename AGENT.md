# AGENT.md

Guidance for AI coding assistants working with this repository.

## Repository Purpose

This repository generates cryptocurrency icon SVGs and React components for BitGo applications. It's a fork of [spothq/cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) with BitGo-specific enhancements.

## Key Scripts

| Script | Purpose |
|--------|---------|
| `npm run generate` | Convert SVGs in `svg/color/` and `svg/icon/` to React components |
| `npm run manifest` | Update `manifest.json` with coin names and colors from SVGs |
| `npm run clean` | Optimize SVGs with svgo (removes metadata, minifies paths) |
| `npm run validate` | Check SVG sizes and detect embedded base64 images |
| `npm run sync-check` | Verify SVG/React/manifest files are in sync |
| `npm run preflight` | Run all validation before committing |

## Critical Patterns

### Adding New Icons - Complete Workflow

Always add BOTH the SVG and regenerate React components:

```bash
# 1. Add SVG to svg/color/{symbol}.svg (lowercase)
# 2. Add { "symbol": "SYMBOL" } to manifest.json
# 3. Run generation
npm run manifest && npm run generate
# 4. Verify
npm run validate && npm run sync-check
# 5. Commit ALL files
git add svg/color/symbol.svg react/symbol.js manifest.json
```

### Manifest Sync

`manifest.json` MUST stay in sync with `svg/color/` contents. After adding icons:

```bash
npm run manifest  # Populates name and color from SVG
```

### Pre-commit Hook

Husky runs `npm run clean && npm run generate` automatically on commit. If the hook fails, check for:
- Invalid SVG syntax
- Empty or corrupted SVG files
- Missing `<svg>` tag

### React Component Pattern

Generated components accept a `prefixId` prop for ID namespacing:

```jsx
import BtcIcon from '@bitgo-forks/cryptocurrency-icons/react/btc';

<BtcIcon prefixId="header-" width={32} height={32} />
<BtcIcon prefixId="sidebar-" width={24} height={24} />
```

This prevents CSS/ID collisions when multiple instances render on the same page.

## Common Tasks

### "Add icon for COIN"

1. Obtain or create SVG file
2. Validate: `<100KB`, no base64, has viewBox
3. Add to `svg/color/coin.svg` (lowercase filename)
4. Add `{"symbol": "COIN"}` to `manifest.json` array
5. Run: `npm run manifest && npm run generate`
6. Verify: `npm run validate && npm run sync-check`
7. Commit: SVG + React component + manifest.json

### "Fix styling collision between icons"

Run the class name prefixing script:

```bash
node scripts/clean-svg-styles.js
```

This prefixes CSS class names in SVGs with the filename to prevent collisions.

### "Icon not rendering correctly"

Check these in order:
1. SVG exists in `svg/color/` with correct filename
2. React component generated in `react/`
3. Symbol entry exists in `manifest.json`
4. `prefixId` prop passed if multiple instances on page
5. SVG has valid `viewBox` attribute

### "Manifest script failing"

Usually means SVG lacks a detectable fill color. The script extracts the primary fill for the `color` field.

**Fix:** Ensure SVG has a `fill` attribute on a visible element.

### "React component too large"

Source SVG likely contains:
- Embedded raster images (base64)
- Excessive path complexity
- Hidden layers or metadata

**Fix:** Re-export SVG from design tool, run `npm run clean`.

## File Size Limits

| Size | Status |
|------|--------|
| < 20KB | Ideal |
| 20-50KB | Acceptable |
| 50-100KB | Needs review |
| > 100KB | **Blocked by CI** |

### Current Oversized Files (Known Issues)

These files exceed 100KB and should be fixed:
- `mmt54.svg` (2.9MB) - likely embedded raster
- `bone.svg` (2.1MB) - likely embedded raster
- `towns.svg` (1.7MB) - likely embedded raster
- `lgct.svg` (1.3MB)
- `yprism.svg` (1.2MB)

## Security Requirements (CRITICAL)

SVG files are scanned for malicious JavaScript content. The following are **strictly forbidden**:

| Forbidden | Example | Reason |
|-----------|---------|--------|
| `<script>` tags | `<script>alert(1)</script>` | XSS vector |
| Event handlers | `onclick="..."`, `onload="..."` | XSS vector |
| javascript: URLs | `href="javascript:..."` | XSS vector |
| `<foreignObject>` | `<foreignObject>...</foreignObject>` | Can embed HTML/JS |
| External references | `<use href="http://..."` | Data exfiltration |

CI will automatically reject PRs containing any of these patterns.

### Security Validation

The `npm run validate` command includes security checks:
- Scans for `<script>` tags
- Detects event handlers (onclick, onload, onerror, etc.)
- Finds javascript: URLs
- Identifies `<foreignObject>` tags
- Warns about external references

## Don't Do

- Commit SVG without regenerating React component
- Add embedded raster images (base64 encoded PNG/JPEG)
- Use generic class names without running `clean-svg-styles.js`
- Skip manifest.json update for new icons
- Modify generated files in `react/` directly (regenerate instead)
- **Add any JavaScript or interactive elements to SVGs**
- **Accept SVGs from untrusted sources without security validation**

## File Structure

```
cryptocurrency-icons/
├── svg/
│   ├── color/      # Primary colored icons (source of truth)
│   ├── white/      # White monochrome variants
│   ├── black/      # Black monochrome variants
│   └── icon/       # Outline/icon variants
├── react/          # Generated React components (don't edit directly)
├── 32/             # 32px PNG exports
├── 32@2x/          # 64px PNG exports (retina)
├── 128/            # 128px PNG exports
├── scripts/
│   ├── manifest.js       # Generates manifest.json entries
│   ├── clean-svg-styles.js # Prefixes CSS class names
│   ├── validate.js       # SVG size/quality validation
│   └── sync-check.js     # File parity verification
├── generate.js     # SVG to React component generator
├── manifest.json   # Icon metadata (symbol, name, color)
└── package.json
```

## CI Protection

PRs are automatically validated in this order:

1. **Security Scan** (runs first, blocks all other checks if failed)
   - No `<script>` tags
   - No event handlers (onclick, onload, etc.)
   - No javascript: URLs
   - No `<foreignObject>` tags
   - Warns about external references

2. **SVG Validation**
   - Files must be under 100KB
   - No embedded base64 raster images
   - Must have viewBox attribute

3. **Manifest Sync**
   - manifest.json must be up to date

4. **React Component Sync**
   - All SVGs must have generated React components

CI will block merging if any check fails. Security issues have the highest priority.
