import * as React from "react";
const SvgPeg = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 123, height: 123, viewBox: "0 0 123 123", ...props }, /* @__PURE__ */ React.createElement("image", { width: 123, height: 123, href: "data:image/png;base64,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" }));
export default SvgPeg;
