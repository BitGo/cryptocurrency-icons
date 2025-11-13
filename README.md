# Cryptocurrency Icons

[This project](http://cryptoicons.co) was forked from https://github.com/spothq/cryptocurrency-icons & is now used to generate icons & react components for BitGo apps.

## Install 🚀

```
$ npm install cryptocurrency-icons
```

You can then import the icons from `./node_modules/cryptocurrency-icons`, for example `./node_modules/cryptocurrency-icons/svg/color/kmd.svg`.

There's also a `manifest.json` file included in the package with a list of the currency symbol, the name of the icons and the associated colors.

## Adding a new coin

After adding the new icon to the `/svg/color` directory, generate the corresponding React component for it and include both file in the commit.

```
$ npm run generate
```
