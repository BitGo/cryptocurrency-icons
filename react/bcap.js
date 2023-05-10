import * as React from "react";
const SvgBcap = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 123, height: 123, viewBox: "0 0 123 123", ...props }, /* @__PURE__ */ React.createElement("image", { width: 123, height: 123, href: "data:image/png;base64,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" }));
export default SvgBcap;
