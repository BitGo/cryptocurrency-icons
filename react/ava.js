import * as React from "react";
const SvgAva = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200", width: 200, height: 200, ...props }, /* @__PURE__ */ React.createElement("title", null, "ava"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, id: "ava-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "ava-Background", href: "#ava-img1", x: 0, y: 0 }));
export default SvgAva;