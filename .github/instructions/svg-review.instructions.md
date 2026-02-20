---
applyTo: "svg/**"
---

# SVG File Review Instructions

When reviewing changes to SVG files in this repository:

## Security Checks (MUST BLOCK)

Immediately flag and request changes if the SVG contains:

- `<script>` tags - XSS vector
- Event handlers like `onclick`, `onload`, `onerror` - XSS vector
- `javascript:` URLs - XSS vector
- `<foreignObject>` tags - Can embed HTML/JS

## Quality Checks (WARNING ONLY)

These are known issues in existing files. Warn but don't block:

- **File size >100KB**: Likely contains embedded raster image
- **Base64 data URLs**: `data:image/png;base64` or `data:image/jpeg;base64`
- **Missing viewBox**: May cause scaling issues

## Best Practices

Suggest improvements for:

- Generic class names (`cls-1`, `st0`, `a`, `b`) - causes styling conflicts
- Inline styles that could be attributes
- Unnecessary metadata or hidden layers
- Overly complex paths that could be simplified

## Pairing Requirements

When a new SVG is added to `svg/color/`:

1. Check for corresponding `react/{symbol}.js` in same PR
2. Check for `manifest.json` entry with matching symbol
3. If missing, request contributor run `npm run manifest && npm run generate`
