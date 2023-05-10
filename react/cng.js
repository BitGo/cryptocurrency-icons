import * as React from "react";
const SvgCng = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 64, height: 65, viewBox: "0 0 64 65", ...props }, /* @__PURE__ */ React.createElement("image", { width: 64, height: 65, href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACqVBMVEUAAAD///////////// //////////////////////////////////////////////////////////////////////////// ///s//PI/9zF//+4///h/+xV/5Oc/8Dq//Lv//+K//9V//+u//9r/6HL/97H//9m///1//j7//+M ///i/+xt/6LV/+Ti///t//Sg/8Nh/5ps/6Hg/+un/8dW/5Su/8v3//r4//pu/6LJ/93p//F0/6fI /tv8//20/8/G/9r+/v/N5v/j/+11/6bE/dnf7/8tlP8Afv9drf/w+P/+//6p/8jD/9n+//+CwP8G gf8fjv+y2P/k/+5z/6XC/tjW6/8/nv9ttf/u9v/9//2h/8NY/5TB/9f7/f+Wyv8Phf9FoP/8/v/e /+pW///9//7h8P9NpP9lsf/S//9//65p/6B5/6mo/8jz//eez/8Vif+93v+V///0//hn/57W/+Xg 7/9LpP9rtP/t9v9l///G//+9/9Zj/5ye/8H9/v9UqP8bi/+x1//J//+6/v7x///r///r//KT/7uP /7jp//KJw/8MhP9Rp//v9//y//+X//+o///G/9ti/5tg/5rE/9ra7P8nkv8ai/+hz//Y//9n//+S /7l8/6zy//b0+f9/vv8Bfv/p9P+Z//9X//+p///i8f/Y/+Zm/55f/5q//9ff7v/h//8okv+Xy/97 /6uB/6+0/9Bb/5e2/9AYi/+czf95/6qK/7Xj/+7g//9Uqf+1/9Cq//8Xiv+n0/9nsv8gjv+42/+r //9Yqv+s//+TyP+DwP/d9/fC///c7f88nP+Dv/7n//+LxP8Cf/+Ev/2T///b7f8nkf+EwP7e//9u //93uv+Fwf+S///0///W6v8ijv9h///R///r9f+Gwf/w///z///x+P8wMY2SAAAAF3RSTlMAEFBw kJ+/QN/P7zAgj39foGCAsODA0FhD5lUAAAABYktHRAH/Ai3eAAAACXBIWXMAAAsTAAALEwEAmpwY AAAAB3RJTUUH5gIBESs4jSPqigAAA5hJREFUWMOlmOdf00AYx1Oatmkoo9XyABrUOhAVnIBbcUZR 3AP3QFDcC9x7i+JW3Av33nvvPXHPv8Rr2jRNcpcmH59XvYfn9809d88lz0FRJDOFmWmLFZmFNttM lDEz2WgGZGa3hOmX22gWMMZawvXJrUA0qy2kPFxDLiAc2rlHQEiL1NA7mNB6AIY4iShWjx6tJmFD IvXJiWkY0GMJhvQYgtmYHiBKsf5G9cDKylK1f7FxSkF8BYWDCT5g0crwilxCpeBx5SqeqsqYCEkf BmoAV626NKyR6FEDQDoYDA7AcQk1fYOkWh4PDsCIeqd6iWp7AVydZGGQ4sEDwEycANTlfFZPE8AS JwBQ309o0FADAE4BgH0DNPIDuNS0dDLASq6hxk1EAteUDAAHuYibNRcBLTQALlIGyFq2SvUBWmsA UA4mvDyjDUDbdgKgvQYATJQN6+/Qke/UGTK7eAFdtQBhlAvjzerWnef5Hj0BevXmuD5aADNVTu3s 24/3Wf9sGDBw0GAtgEW9hkOGDuNFGz4CYGSyAMiJR38bpQLYqfIKT25eQM6PzhZcXkDiGMiMyx87 bvwEeThDKfQTpcdPmuz3IcCUJJiaL+zJtOmyeFYOKCiUHj9jpuhNmTUbYM5csbDmpQdLZID5CwLy hYsAFi/xuZcug+UrApXNrVxFBACsLvLp16yF4nWe9aJ7w8aAfNNmuUK5iFu2Ivm2EoDtOzwiIH2n 9Phdu+XxrGoX9uzdl7cfkg4cREtfCoeQ5/CRgPzoMeVG2jGFdDwD4IRQO6Vw8hQ6l6dF/ZlYVbCb ogFnIqCILyyAzLPnhMefxwTS+BdaEIC/cBGdy0scd/kKLtBJhWMBVyUAz19DFZF2HRsH6APHkgE3 fAD+5i0gGIP7rKkBPH87Fw+weNs6PQD+zl0swNvsmFgi4B7cl85GCSEDCruRPsADgIeB0/mIkAH+ w/BYADxBv54+8wOeY8L8DZ+VBHgh/H75SgC8Jk0AOwUB8MY/ePvOC3hPnABuFT4g/cdicZRVhnbj kyqIllpkRg3I+fwlaPz1mxoQ3PLaVIDvP+SOn2W/lDHO4DZNmcTvP6oJ/1WMXfJGMcQ1QW12Radq 0tXp4xfAyF2BrDdGwN85HHbd+ZPuLLQ+PU2+hjp1pMGaKQ1zRIfSu7XvfagoNSfhDn3zRAj3f8mF RMwxGLXL0BXe4aTdgZclG0M7jf4DQDBTuA2ZQ1P7D6agquZ2B6qMAAAAJXRFWHRkYXRlOmNyZWF0 ZQAyMDIyLTAyLTAxVDE3OjQzOjU2KzAwOjAwaLIs4wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0w Mi0wMVQxNzo0Mzo1NiswMDowMBnvlF8AAAAASUVORK5CYII=" }));
export default SvgCng;
