# Contributing Icons

Thank you for contributing to the cryptocurrency icons library!

## Before You Start

1. **Check if the icon already exists** - Search `svg/color/` for the symbol
2. **Ensure you have rights** - You must have permission to use and distribute the logo
3. **Use the issue template** - For requests, use the "Add Currency" issue template

## SVG Requirements

### Security Requirements (CRITICAL)

SVG files are scanned for malicious content. The following are **strictly forbidden**:

| Forbidden Content | Reason |
|-------------------|--------|
| `<script>` tags | Can execute JavaScript |
| Event handlers (`onclick`, `onload`, etc.) | Can execute JavaScript |
| `javascript:` URLs | Can execute JavaScript |
| `<foreignObject>` tags | Can embed HTML/JavaScript |
| External `<use>` references | Can load external malicious content |

PRs containing any of these will be **automatically rejected** by CI.

### File Size Limits

| Threshold | Status |
|-----------|--------|
| < 20KB | Ideal |
| 20-50KB | Acceptable |
| 50-100KB | Flagged for review |
| > 100KB | **Rejected** |

Large files typically indicate embedded raster images or overly complex paths.

### Technical Requirements

**Must have:**
- Proper vector paths (no embedded PNG/JPEG base64 data)
- `viewBox` attribute for proper scaling
- Clean, optimized paths

**Avoid:**
- Inline styles when possible (use attributes)
- Generic class names (`cls-1`, `st0`, `a`, `b`)
- Embedded fonts (convert to paths)
- Hidden layers or metadata
- Any JavaScript or interactive elements

### Quality Standards

- Icon should be recognizable at 32px
- Works well at 32px, 128px, and larger sizes
- Appropriate level of detail for icon use
- Consistent visual weight with existing icons

## Submission Process

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/cryptocurrency-icons.git
cd cryptocurrency-icons
npm install
```

### 2. Add Your SVG

Place the SVG file in `svg/color/` with a lowercase filename:

```
svg/color/{symbol}.svg
```

Examples:
- `svg/color/btc.svg`
- `svg/color/eth.svg`
- `svg/color/usdc.svg`

### 3. Update Manifest

Add an entry to `manifest.json`:

```json
{
  "symbol": "NEWSYMBOL"
}
```

The name and color will be auto-populated when you run the manifest script.

### 4. Generate Components

```bash
npm run manifest    # Update names and colors
npm run generate    # Generate React component
```

### 5. Validate

```bash
npm run validate    # Check size and quality
npm run sync-check  # Verify files are in sync
```

### 6. Commit and Push

Commit both the SVG and generated React component:

```bash
git add svg/color/newsymbol.svg react/newsymbol.js manifest.json
git commit -m "feat: add NEWSYMBOL icon"
git push origin your-branch
```

### 7. Open Pull Request

Include in your PR description:
- Currency name
- Symbol
- Official website URL
- Theme/brand color (hex)

## Automated Checks

Pull requests are automatically validated for:

**Blocking (will fail CI):**
- [ ] No malicious content (scripts, event handlers)
- [ ] Manifest.json is in sync
- [ ] React component is generated

**Warnings (informational):**
- [ ] SVG file size under 100KB
- [ ] No embedded base64 raster images

PRs failing blocking checks cannot be merged. Warnings are informational due to pre-existing technical debt (see CLEANUP-TRACKING.md).

## Common Issues

### "File too large"

Your SVG likely contains:
- Embedded raster images (base64)
- Overly complex paths
- Unnecessary metadata

**Fix:** Re-export from your design tool with "Outline text" and "Export as SVG" options. Remove embedded images.

### "Contains base64 image"

The SVG has an embedded PNG or JPEG.

**Fix:** Replace with proper vector paths or use a simpler logo version.

### "Missing viewBox"

The SVG doesn't scale properly.

**Fix:** Add a viewBox attribute to the SVG root element:
```xml
<svg viewBox="0 0 32 32" ...>
```

### "React component not generated"

You forgot to run the generate script.

**Fix:**
```bash
npm run generate
git add react/yoursymbol.js
```

## Questions?

Open an issue with the "question" label if you need help.
