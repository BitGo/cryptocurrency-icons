import * as React from "react";
const SvgHtx = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200", width: 200, height: 200, ...props }, /* @__PURE__ */ React.createElement("title", null, "htx"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, id: "htx-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "htx-Background", href: "#htx-img1", x: 0, y: 0 }));
export default SvgHtx;