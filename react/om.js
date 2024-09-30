import * as React from "react";
const SvgOm = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200", width: 200, height: 200, ...props }, /* @__PURE__ */ React.createElement("title", null, "Mantra Dao"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, id: "om-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "om-Background", href: "#om-img1", x: 0, y: 0 }));
export default SvgOm;
