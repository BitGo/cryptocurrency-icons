const { readdirSync, readFileSync } = require("fs");
const { transform } = require("@svgr/core");
const jsxModule = require("@svgr/plugin-jsx");
const jsx = jsxModule.default || jsxModule;
const { join } = require("path");
const esbuild = require("esbuild");

const ICON_DIR = "./svg/icon";
const ICON_COLOR_DIR = "./svg/color";

function findSVGIds(svgString) {
    const idRegex = /id="([^"]+)"/g;
    const ids = [];
    let match;

    while ((match = idRegex.exec(svgString)) !== null) {
        ids.push(match[1]);
    }

    return ids;
}

/**
 * give all ids in an svg a globally unique value to prevent styling collisions
 * @param {string} svgCode
 * @param {string} iconName
 * @returns
 */
const replaceIds = (svgCode, iconName) => {
    const ids = findSVGIds(svgCode);
    if (!ids.length) {
        return svgCode;
    }
    let result = svgCode;
    ids.forEach((id) => {
        const baseId = `${iconName}-${id}`;
        result = result
            .replaceAll(`id="${id}"`, `id="__PREFIX__${baseId}"`)
            .replaceAll(`"#${id}"`, `"#__PREFIX__${baseId}"`)
            .replaceAll(`url(#${id})`, `url(#__PREFIX__${baseId})`);
    });
    return result;
};

/**
 * Convert placeholders to JSX expressions after SVGR conversion
 * @param {string} jsxCode
 * @returns {string}
 */
const convertPlaceholders = (jsxCode) => {
    const jsxPatterns = {
        svgComponentWithSpaces: {
            pattern: /const (Svg\w+)\s*=\s*props\s*=>/g,
            replacement: 'const $1 = ({ prefixId = "", ...props }) =>'
        },
        componentWithParens: {
            pattern: /const (\w+)\s*=\s*\(props\)\s*=>/g,
            replacement: 'const $1 = ({ prefixId = "", ...props }) =>'
        },
        minifiedSvgComponent: {
            pattern: /const (Svg\w+)=props=>/g,
            replacement: 'const $1=({prefixId="", ...props})=>'
        },
        minifiedComponentWithParens: {
            pattern: /const (\w+)=\(props\)=>/g,
            replacement: 'const $1=({prefixId="", ...props})=>'
        },
        cssUrlInProperties: {
            pattern: /(\s*)(\w+):\s*url\(\s*#__PREFIX__([^)]+)\s*\)/g,
            replacement: '$1$2: url(#" + prefixId + "$3)'
        },
        urlInStyleProps: {
            pattern: /:\s*"url\(#__PREFIX__([^)]+)\)"/g,
            replacement: ': `url(#${prefixId}$1)`'
        },
        regularIdReferences: {
            pattern: /"__PREFIX__([^"]+)"/g,
            replacement: '{prefixId + "$1"}'
        },
        hrefStyleReferences: {
            pattern: /"#__PREFIX__([^"]+)"/g,
            replacement: '{"#" + prefixId + "$1"}'
        },
        urlFunctionReferences: {
            pattern: /"url\(#__PREFIX__([^)]+)\)"/g,
            replacement: '{"url(#" + prefixId + "$1" + ")"}'
        },
        cleanupPropsReferences: {
            pattern: /props\.prefixId/g,
            replacement: 'prefixId'
        }
    };

    let result = jsxCode;
    
    Object.keys(jsxPatterns).forEach(patternName => {
        const { pattern, replacement } = jsxPatterns[patternName];
        result = result.replace(pattern, replacement);
    });
    
    return result;
};

const generateComponents = (iconDir) => {
    const icons = readdirSync(iconDir);
    icons.forEach((file) => {
        // Remove only the .svg extension, preserving dots in the filename (e.g., "0x0.ai.svg" -> "0x0.ai")
        const fileName = file.replace(/\.svg$/, "");
        console.log(`Processing file: ${file}`);
        let iconName = fileName;
        if (iconName === "index") {
            iconName = "indexIcon";
        }
        const svgPath = join(iconDir, file);
        const svgCode = readFileSync(svgPath, "utf8");

        if (!svgCode || svgCode.trim().length === 0) {
            console.error(`❌ Empty file: ${file}`);
            return;
        }
            
        if (!svgCode.includes('<svg')) {
            console.error(`❌ Invalid SVG (no <svg> tag): ${file}`);
            return;
        }

        const processedSvg = replaceIds(svgCode, iconName);

        let jsCode = transform.sync(
            processedSvg,
            {
                expandProps: "end",
                typescript: false,
                plugins: [jsx],
            },
            { filePath: svgPath }
        );

        jsCode = convertPlaceholders(jsCode);

        esbuild.buildSync({
            outfile: `react/${iconName}.js`,
            allowOverwrite: true,
            loader: {
                ".js": "jsx",
            },
            stdin: {
                contents: jsCode,
                loader: "jsx",
            },
        });
    });
};

generateComponents(ICON_DIR);
generateComponents(ICON_COLOR_DIR);

// Generate index.js and index.d.ts that export all components
const fs = require("fs");

function generateIndex() {
    const reactDir = "./react";
    const files = readdirSync(reactDir)
        .filter(f => f.endsWith(".js") && f !== "index.js")
        .sort();
    
    // Generate component name from filename (handle special characters)
    const getComponentName = (filename) => {
        const base = filename.replace(".js", "");
        // Convert to valid JS identifier: replace invalid chars, ensure doesn't start with number
        let name = base
            .replace(/[^a-zA-Z0-9]/g, "_")
            .replace(/^(\d)/, "_$1");
        // PascalCase
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    // Build exports
    const exports = [];
    const typeExports = [];
    
    for (const file of files) {
        const componentName = getComponentName(file);
        const importPath = `./${file.replace(".js", "")}`;
        exports.push(`export { default as ${componentName} } from "${importPath}";`);
        typeExports.push(`export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement> & { prefixId?: string }>;`);
    }

    // Write index.js
    const indexJs = `// Auto-generated index file - do not edit manually
${exports.join("\n")}
`;
    fs.writeFileSync(join(reactDir, "index.js"), indexJs);
    console.log(`\n✅ Generated react/index.js with ${exports.length} exports`);

    // Write index.d.ts
    const indexDts = `// Auto-generated TypeScript declarations - do not edit manually
import * as React from "react";

${typeExports.join("\n")}
`;
    fs.writeFileSync(join(reactDir, "index.d.ts"), indexDts);
    console.log(`✅ Generated react/index.d.ts with ${typeExports.length} type declarations`);
}

generateIndex();
