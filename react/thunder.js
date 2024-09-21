import * as React from "react";
const SvgThunder = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 378 377", width: 100, height: 100, ...props }, /* @__PURE__ */ React.createElement("title", null, "thunder"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 334, height: 334, id: "thunder-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "thunder-Background", href: "#thunder-img1", x: 22, y: 22 }));
export default SvgThunder;
