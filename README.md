# Cryptocurrency Icons

BitGo fork of [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) for generating SVG icons and React components used in BitGo applications.

## Install

```bash
npm install @bitgo-forks/cryptocurrency-icons
```

## Usage

### SVG Icons

Import SVG files directly from the package:

```javascript
// Color icons (recommended)
import btcIcon from '@bitgo-forks/cryptocurrency-icons/svg/color/btc.svg';

// Monochrome variants
import btcWhite from '@bitgo-forks/cryptocurrency-icons/svg/white/btc.svg';
import btcBlack from '@bitgo-forks/cryptocurrency-icons/svg/black/btc.svg';
import btcOutline from '@bitgo-forks/cryptocurrency-icons/svg/icon/btc.svg';
```

### React Components

Import and use React components with the `prefixId` prop for ID namespacing:

```jsx
import BtcIcon from '@bitgo-forks/cryptocurrency-icons/react/btc';

function MyComponent() {
  return (
    <BtcIcon 
      prefixId="unique-id" 
      width={32} 
      height={32} 
    />
  );
}
```

The `prefixId` prop prevents CSS/ID collisions when rendering multiple icons on the same page.

### PNG Icons

Pre-rendered PNG icons are available in multiple sizes:

- `32/` - 32x32 pixels
- `32@2x/` - 64x64 pixels (retina)
- `128/` - 128x128 pixels

### Manifest

The `manifest.json` file contains metadata for all icons:

```json
{
  "symbol": "BTC",
  "name": "Bitcoin",
  "color": "#f7931a"
}
```

Use this for programmatic access to icon metadata, colors, and display names.

## Adding New Icons

1. Add your SVG to the `svg/color/` directory (lowercase filename)
2. Add the symbol to `manifest.json`
3. Run the generation scripts:

```bash
npm install
npm run manifest
npm run generate
```

4. Commit both the SVG and generated React component

### SVG Requirements

- **Maximum file size**: 100KB (recommended: <20KB)
- **Format**: Proper vector SVG (no embedded PNG/JPEG base64 data)
- **ViewBox**: Must include `viewBox` attribute
- **Class names**: Avoid generic names like `cls-1` or `st0` (will be auto-prefixed)

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run generate` | Generate React components from SVGs |
| `npm run manifest` | Update manifest.json with coin names and colors |
| `npm run clean` | Optimize SVGs with svgo |
| `npm run validate` | Check SVG sizes and detect embedded images |
| `npm run sync-check` | Verify SVG/React/manifest parity |
| `npm run preflight` | Run all validation before committing |

## Repository Structure

```
cryptocurrency-icons/
├── svg/
│   ├── color/      # Full-color icons (primary)
│   ├── white/      # White monochrome
│   ├── black/      # Black monochrome
│   └── icon/       # Outline icons
├── react/          # Generated React components
├── 32/             # 32px PNG exports
├── 32@2x/          # 64px PNG exports (retina)
├── 128/            # 128px PNG exports
├── manifest.json   # Icon metadata
└── scripts/        # Generation and validation scripts
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for submission guidelines.

## Maintainers

See [MAINTAINING.md](MAINTAINING.md) for maintainer workflows.
