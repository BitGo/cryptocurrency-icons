import * as React from "react";
const SvgOceanv2 = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 123, height: 123, viewBox: "0 0 123 123", ...props }, /* @__PURE__ */ React.createElement("image", { width: 123, height: 123, href: "data:image/png;base64,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 AElFTkSuQmCC" }));
export default SvgOceanv2;
