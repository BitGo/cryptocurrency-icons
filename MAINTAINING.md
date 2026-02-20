# Maintaining

Guide for repository maintainers.

## Adding Icons

### Single Icon

1. **Validate the SVG**
   ```bash
   # Check file size
   ls -la svg/color/newicon.svg
   
   # Check for embedded images
   grep -l "base64" svg/color/newicon.svg
   ```

2. **Add to repository**
   - Place SVG in `svg/color/{symbol}.svg` (lowercase)
   - Add symbol to `manifest.json`

3. **Generate files**
   ```bash
   npm install
   npm run manifest    # Updates names and colors
   npm run generate    # Creates React component
   ```

4. **Verify and commit**
   ```bash
   npm run validate
   npm run sync-check
   git add svg/color/newicon.svg react/newicon.js manifest.json
   git commit -m "feat: add NEWICON"
   ```

### Bulk Updates

For adding multiple icons:

```bash
# 1. Add all SVGs to svg/color/
# 2. Add all symbols to manifest.json

# 3. Validate all files
npm run validate

# 4. Generate everything
npm run manifest
npm run generate

# 5. Check sync status
npm run sync-check

# 6. Commit
git add svg/color/ react/ manifest.json
git commit -m "feat: add batch of new icons"
```

## Troubleshooting

### "Couldn't get color" Error

The manifest script can't extract a fill color from the SVG.

**Causes:**
- SVG uses stroke instead of fill
- Colors are in CSS classes, not attributes
- No visible fill color in the SVG

**Fix:** Open the SVG and ensure it has a `fill` attribute on a visible element.

### Class Name Conflicts

Icons with generic class names (`.cls-1`, `.st0`) can cause styling conflicts.

**Fix:**
```bash
node scripts/clean-svg-styles.js
```

This prefixes all class names with the filename.

### Large Generated React Files

If the React component is unexpectedly large:

**Causes:**
- Source SVG contains embedded raster images
- SVG has excessive path complexity
- Hidden layers or metadata included

**Fix:**
- Re-export from design tool with "Outline text" option
- Use SVGO to optimize: `npm run clean`
- Manually remove unnecessary elements

### Pre-commit Hook Failures

The husky pre-commit hook runs `npm run clean && npm run generate`.

**Common failures:**
- Invalid SVG syntax
- Missing dependencies
- SVG file corruption

**Fix:** Run the scripts manually to see detailed errors:
```bash
npm run clean
npm run generate
```

## CI/CD Pipeline

### Pull Request Checks

PRs modifying `svg/`, `react/`, or `manifest.json` trigger:

1. **validate.yml**
   - SVG size validation (<100KB)
   - Embedded base64 detection
   - Manifest sync check

2. **sync-check.yml**
   - React component generation verification
   - SVG/React file parity check

### Release Process

Releases are automated via GitHub Actions:

1. Push to `master` triggers `release.yaml`
2. semantic-release analyzes commits
3. Version bump based on commit types:
   - `feat:` → minor version
   - `fix:` → patch version
   - `BREAKING CHANGE:` → major version
4. Package published to npm

### Manual Release (if needed)

```bash
# Ensure you're on master with latest
git checkout master
git pull origin master

# Verify everything is in sync
npm run preflight

# Push (release happens automatically)
git push origin master
```

## Review Guidelines

When reviewing PRs:

1. **Check automated CI results** - All checks must pass
2. **Verify icon quality** - Does it look good at 32px?
3. **Confirm attribution** - Does contributor have rights?
4. **Test rendering** - Import and render the React component

## Useful Commands

```bash
# Find all SVGs over 50KB
find svg/color -name "*.svg" -size +50k

# List SVGs with embedded images
grep -rl "base64" svg/color/

# Count total icons
ls svg/color/*.svg | wc -l

# Check manifest entry count
jq length manifest.json
```
