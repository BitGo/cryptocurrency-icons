# Testing Changes Locally

This guide explains how to test changes to `@bitgo-forks/cryptocurrency-icons` in a consuming project before publishing.

## Quick Start

```bash
# In this repo
npm run test:pack

# In your consuming project
npm install /path/to/cryptocurrency-icons/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
```

## Methods

### Method 1: npm pack (Recommended)

Creates a tarball identical to what npm publish would create.

```bash
# 1. Build everything
npm run preflight

# 2. Create tarball
npm pack

# 3. Install in consuming project
cd /path/to/consuming-project
npm install /path/to/cryptocurrency-icons/bitgo-forks-cryptocurrency-icons-0.18.1.tgz

# Or with pnpm
pnpm add /path/to/cryptocurrency-icons/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
```

**Pros**: Tests exactly what will be published
**Cons**: Need to reinstall after each change

### Method 2: pnpm link (For iterative development)

Creates a symlink for live updates.

```bash
# 1. In cryptocurrency-icons
pnpm link --global

# 2. In consuming project
pnpm link --global @bitgo-forks/cryptocurrency-icons
```

**Pros**: Changes reflect immediately
**Cons**: Symlinks can cause issues with some bundlers

### Method 3: File reference

Point directly to local path in package.json.

```json
{
  "dependencies": {
    "@bitgo-forks/cryptocurrency-icons": "file:../cryptocurrency-icons"
  }
}
```

Then run `pnpm install`.

**Pros**: Simple, works with most setups
**Cons**: Modifies package.json

## Testing Checklist

### 1. React Components

```tsx
import { Btc, Eth, GenericIcon } from '@bitgo-forks/cryptocurrency-icons';

// Test rendering
<Btc width={32} height={32} />
<Eth width={64} height={64} />
<GenericIcon width={32} height={32} />
```

### 2. SVG Imports

```tsx
// Direct SVG import (if bundler supports)
import btcSvg from '@bitgo-forks/cryptocurrency-icons/svg/color/btc.svg';

// Or as URL
const btcUrl = new URL('@bitgo-forks/cryptocurrency-icons/svg/color/btc.svg', import.meta.url);
```

### 3. Manifest

```typescript
import manifest from '@bitgo-forks/cryptocurrency-icons/manifest.json';

// Find icon by symbol
const btcMeta = manifest.find(c => c.symbol === 'BTC');
console.log(btcMeta); // { symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' }
```

### 4. PNG Imports

```tsx
// 32px
import btc32 from '@bitgo-forks/cryptocurrency-icons/32/color/btc.png';

// 128px
import btc128 from '@bitgo-forks/cryptocurrency-icons/128/color/btc.png';
```

## Automated Test Script

Run the automated test to verify the package:

```bash
npm run test:pack
```

This will:
1. Run preflight (clean, generate, validate)
2. Create a tarball
3. Extract and verify contents
4. Report any issues

## Common Issues

### "Module not found" after linking

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Stale cache in consuming project

```bash
# Clear bundler cache
rm -rf .next/cache  # Next.js
rm -rf node_modules/.vite  # Vite
```

### TypeScript errors

Ensure `react/index.d.ts` exists and is up to date:

```bash
npm run generate
```

## Testing in BitGo Projects

### retail-app

```bash
cd ~/Documents/Projects/bitgo-retail
pnpm add /path/to/cryptocurrency-icons/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
pnpm dev
# Navigate to a page with coin icons
```

### frontend-repo

```bash
cd ~/Documents/Projects/frontend-repo
pnpm add /path/to/cryptocurrency-icons/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
pnpm dev
```

## CI Verification

The PR will run these workflows:
- `validate.yml` - Security scan, SVG validation, manifest sync
- `sync-check.yml` - Verify React components match SVGs

These must pass before merge.
