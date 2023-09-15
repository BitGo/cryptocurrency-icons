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
		result = result
			.replaceAll(`id="${id}"`, `id="${iconName}-${id}"`)
			.replaceAll(`#${id}`, `#${iconName}-${id}`);
	});
	return result;
};

const generateComponents = (iconDir) => {
	const icons = readdirSync(iconDir);
	icons.forEach((file) => {
		const [fileName] = file.split(".");
		let iconName = fileName;
		if (iconName === "index") {
			iconName = "indexIcon";
		}
		const svgPath = join(iconDir, file);
		const svgCode = readFileSync(svgPath, "utf8");

		const jsCode = transform.sync(
			replaceIds(svgCode, iconName),
			{
				expandProps: "end",
				typescript: false,
				jsx: false,
			},
			{ filePath: svgPath }
		);

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
