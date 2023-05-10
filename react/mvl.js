import * as React from "react";
const SvgMvl = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 123, height: 123, viewBox: "0 0 123 123", ...props }, /* @__PURE__ */ React.createElement("image", { width: 123, height: 123, href: "data:image/png;base64,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 bWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==" }));
export default SvgMvl;
