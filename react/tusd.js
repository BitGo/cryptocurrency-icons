import * as React from "react";
const SvgTusd = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200", width: 100, height: 100, ...props }, /* @__PURE__ */ React.createElement("title", null, "tusd"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, id: "tusd-img1", href: "data:image/png;base64,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" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "tusd-Background", href: "#tusd-img1", x: 0, y: 0 }));
export default SvgTusd;
