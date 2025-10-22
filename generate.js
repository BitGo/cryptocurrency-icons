const { readdirSync, readFileSync } = require("fs");
const { transform } = require("@svgr/core");
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
		// Placeholder that SVGR will convert to JSX
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
    // Destruct prefixId so is not added to the svg tag
    jsxCode = jsxCode.replace(
        /const (Svg\w+) = props =>/,
        'const $1 = ({ prefixId = "", ...props }) =>'
    );
    
    jsxCode = jsxCode.replace(
        /const (\w+) = \(props\) =>/,
        'const $1 = ({ prefixId = "", ...props }) =>'
    );
    
    jsxCode = jsxCode.replaceAll(
        /:\s*"url\(#__PREFIX__([^)]+)\)"/g,
        ': `url(#${prefixId}$1)`'
    );
    
    jsxCode = jsxCode.replaceAll(
        /"__PREFIX__([^"]+)"/g, 
        `{prefixId + "$1"}`
    );
    
    jsxCode = jsxCode.replaceAll(
        /"#__PREFIX__([^"]+)"/g, 
        `{"#" + prefixId + "$1"}`
    );

    jsxCode = jsxCode.replaceAll(
        /"url\(#__PREFIX__([^)]+)\)"/g, 
        `{"url(#" + prefixId + "$1" + ")"}`
    );
    
    jsxCode = jsxCode.replaceAll(
        /props\.prefixId/g,
        'prefixId'
    );
    
    return jsxCode;
};

const generateComponents = (iconDir) => {
	const icons = readdirSync(iconDir);
	icons.forEach((file) => {
		const [fileName] = file.split(".");
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
            console.log(`Content preview: ${svgCode.substring(0, 100)}...`);
            return;
        }

		const processedSvg = replaceIds(svgCode, iconName);

		let jsCode = transform.sync(
			processedSvg,
			{
				expandProps: "end",
				typescript: false,
				jsx: false,
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
