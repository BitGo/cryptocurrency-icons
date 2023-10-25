import * as React from "react";
const SvgGal = (props) => /* @__PURE__ */ React.createElement("svg", { width: 128, height: 128, viewBox: "0 0 128 128", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", ...props }, /* @__PURE__ */ React.createElement("rect", { width: 128, height: 128, fill: "url(#gal-pattern0)" }), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("pattern", { id: "gal-pattern0", patternContentUnits: "objectBoundingBox", width: 1, height: 1 }, /* @__PURE__ */ React.createElement("use", { xlinkHref: "#gal-image0_1_30", transform: "scale(0.0078125)" })), /* @__PURE__ */ React.createElement("image", { id: "gal-image0_1_30", width: 128, height: 128, xlinkHref: "data:image/png;base64,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" })));
export default SvgGal;