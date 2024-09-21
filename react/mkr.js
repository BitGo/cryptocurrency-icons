import * as React from "react";
const SvgMkr = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 250 250", width: 100, height: 100, ...props }, /* @__PURE__ */ React.createElement("title", null, "mkr"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 197, height: 102, id: "mkr-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "mkr-Background", href: "#mkr-img1", x: 27, y: 74 }));
export default SvgMkr;
