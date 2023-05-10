import * as React from "react";
const SvgPau = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 123, height: 123, viewBox: "0 0 123 123", ...props }, /* @__PURE__ */ React.createElement("image", { width: 123, height: 123, href: "data:image/png;base64,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" }));
export default SvgPau;
