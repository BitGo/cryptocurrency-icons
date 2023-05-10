import * as React from "react";
const SvgMaps = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 200, height: 200, viewBox: "0 0 200 200", ...props }, /* @__PURE__ */ React.createElement("image", { width: 200, height: 200, href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACslBMVEX///9wz3B11WV41WJ2 1WJ21GR21GR31WN31mN31mJ31WN21WN21WN20mN402R41WJ21GR21WN21WN31mN31mN512N41WR3 1mN31WN31WN21WJwz3B402R41WR31mN21WJwz3Bwz3B31mN512N412h412h31mN512Nwz3B41WJ5 12N61WV41WR31WN31mN31mN31WN412h402R21WN31mN21WN402R512N402R412h31WN412h21GR2 1GJ31mN41WR31WN412h21WR21WR31mN21WN21GJwz3B31WN31mRwz2B31mN11WV21GR21GJ41WR3 1WN41WR41mN31WN41mN31WN31mR61WV21WN21WN21WJ11WV21WNwz2B41WJ31WN31WN31WN31WNw z2B21GNwz2B41WJwz2B41WJwz2B21GN31mKAz2B11WB21GN31mJ21GJ31mJ21GJ31WN31GN31WJ1 1WJ31WR112F31GN31WN31GN11WJ31GN31GN112GAz2B21GOAz2B4z2CAz2B4z2B21GN11WKAz2B3 1WJ31WJ1z2B4z2B112F21GN4z2B31WJ4z2B31mN31WJ31WJ4z2B31WJ31mN31mJ21GKAz2B31WJ6 1WB21WJ31mJ21WJ21GN31WJ21GN31WJ21GJ112F31WJ31WJ31GN61WB10mJ112F31GN32WJ10mJ2 12F4z2B10mJ10mJ31WJ10mJ212F31WF212F31WN/122h4pSz6Ke76rGQ3YDU8s7u+uz////3/fXM 78SZ34qZ4Iru+uui4pTd9djE7Lvl9+LM78Wz56eq5Z7u+ezE7buq5J7d9NiI2nfm9+K76bHl9uKA 2G32/PWI2nbm+OLu+euq5J3D7Luq5Z2R3YCy56ei45TU8c73/PWQ3ICy5qeh4ZTV8s6zq3SwAAAA uHRSTlMAAQwkQFFseJzf78+EHhAYP4KckHgYEEjD0BAKOIC/fwcMb18YDltNBUJCBkDS38RQBAxu MDQwSCgUnwIjI6g48ArDz9LvPwJ1dQJwHltbaIh4l5YeHoceeMM4BtIBSDTPnG4FQgdOC2AKGD8B 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 AAAAAElFTkSuQmCC" }));
export default SvgMaps;
