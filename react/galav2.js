import * as React from "react";
const SvgGalav2 = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 200, height: 200, viewBox: "0 0 200 200", ...props }, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, href: "data:image/png;base64,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 MFeBjYsAAAAASUVORK5CYII=" }));
export default SvgGalav2;
