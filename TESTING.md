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

### CodeArtifact 401 Unauthorized

If you see `ERR_PNPM_FETCH_401` errors when installing:

```
ERR_PNPM_FETCH_401  GET https://private-*.d.codeartifact.*.amazonaws.com/npm/npm_private/@bitgo-private%2F...: Unauthorized - 401
```

Your AWS CodeArtifact token has expired. Refresh it first:

```bash
# Refresh credentials
aws codeartifact login --tool npm --domain private --domain-owner 199765120567 --repository npm_private --region us-west-2

# Then retry install
pnpm add /path/to/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
```

### Stale package - changes not reflected

If you reinstall the tarball but changes aren't reflected, pnpm may be using a cached version:

```bash
# Clear the specific package from pnpm cache
rm -rf node_modules/.pnpm/@bitgo-forks+cryptocurrency-icons*

# Reinstall
pnpm add /path/to/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
```

Or force a fresh install:

```bash
# Remove and reinstall
pnpm remove @bitgo-forks/cryptocurrency-icons
pnpm add /path/to/bitgo-forks-cryptocurrency-icons-0.18.1.tgz
```

### "Module not found" for specific icon

If Vite complains about a missing icon like `react/core.js`:

```
Failed to resolve import "@bitgo-forks/cryptocurrency-icons/react/core.js"
```

1. Check if the icon exists in the tarball:
   ```bash
   tar -tzf bitgo-forks-cryptocurrency-icons-*.tgz | grep "core.js"
   ```

2. If missing, add the SVG and regenerate:
   ```bash
   # Add the SVG to svg/color/
   npm run generate
   npm run test:pack
   ```

3. Reinstall the updated tarball (see "Stale package" above)

### "Module not found" after linking

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Vite still can't resolve import (file exists in node_modules)

If Vite shows "Failed to resolve import" but the file actually exists in `node_modules`:

```bash
# Check if file exists
ls node_modules/@bitgo-forks/cryptocurrency-icons/react/core.js

# If it exists, clear Vite's cache
rm -rf node_modules/.vite

# Restart dev server
pnpm dev
```

Vite aggressively caches dependency resolution. Clearing `.vite` forces a full re-scan.

### Stale bundler cache (general)

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
