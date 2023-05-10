import * as React from "react";
const SvgEurt = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 64, height: 65, viewBox: "0 0 64 65", ...props }, /* @__PURE__ */ React.createElement("image", { width: 64, height: 65, href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAABQr5dQr49Mq5NN rZJPr5VPr5RPr5NPr5RPr5VNrZJQr49OrpNPr5RPr5ROrpNOr5VQr5VQsZVOr5RNrZROrZNPr5RQ r5NMrJNOrpRPrpNOrpNOrpRQr5NQr5NPr5VQr5RQr5VQr5ZQr59OrpVOrpNPr5RTsJZVsZhSsZZR r5VPrpVQr5VPrpRQrpVPr5VQr5RRr5ZYs5pXsplSsJZQrpRSsJVVsZlUsZdRsJVVspiLyrjk8u7l 8+/l8u7l8u/j8u1UsJdUsZhRsJZVsJeXz8D////+/v79/v5TsJdQsJVWsplWsphYsplTsZiTzr7z +Pfy+Pby+Pfz+Pb9/v33+/lRrpXX7Oed0sPX7Oac0cPW7OZdtJ1xvaiBxLKQzLzh8e3F5NuJyLd7 wq5ouaNYs5l1v6uKyLeg08Wo1smi1MWRzLt8w69vvahpuqPe7uqp2Mtru6V0wKqCxrOUzb2h08Wd 0sKGx7VmuKJgtp6n1sml1chjt6Da7ehVsZdzv6qWzr+t2MyMyrjd7+q23dJUsJZdtZ3u9vSd0cJZ spvf8Ovq9fJ/w7Fcs5yr18v8/f2q18vm8+/k8u+94NeQzLt2v6xkt6Bas5t3wK2LybePy7uKyLZh tp9etZ1ru6SAxLHK5t7v9/XT6+SJyLZ8wq+f08S94dbU6+Tg8Ozh8ezP6OHG5NzA4di739W53tS8 4NXA4tnJ5d3T6uTf7+uw2s9ouqNas5pvu6d5wa6Fx7Xp9fK84NaAxbF2v6tqu6Vhtp5Sr5ZWsZhW sZlXsphVspdVsplXs5lQr5ZTsZdXspp6wq6Myrlpu6RSsJdTr5ZDF4WsAAAAJnRSTlMAIBBAcJ/P 77+vYCCQ35+gfzB/j3CA70BQsODAoFCA33BgUBCQ0PQb6AEAAAABYktHREYXuvntAAAACXBIWXMA AAsTAAALEwEAmpwYAAAAB3RJTUUH5gIBESwbYAUNPwAABV1JREFUWMOlVgdjU1UUfkmhtNAy1LZA sEPwNuSeO0LyalJTaomklKHWuhpUXIi4Jy6WCxUXKu6Fe9e9tyLWgb/Jc+4LfTd5WcWT9PXm3fud d853v3PedZyqFgqFws7RWcOMmY2zmLFZTc0zGqYFDs9uLmB9m9U8u174nJYA2rPWuXPqgc9jVaym i/B8VsPmVyW1obUWHhNZUBl/TG24CaJS+HPrwyMTZdMIN9aLZ6wx/P/w5TxMD1/Gw7HTwyMPR8W/ bccVyW/6eMZsPVj66a2OivrD1nC5BJbHOOcg0KTgnP5xBYLhCIRmQsStB7SVS2CF5BJAKgkclAIu ODB0IRkDxSU6T/hr24+EYNVfMgbgghQA+OVCYTDKRQf4QbBygcf6AiHYAZwk6fnSXLmkrxT0FWaI bqWMBkKwJJDqBYoA0fjBEOhKD6eLAjATvenSEKwt6Ge0SJ+cGRhYOTiQGRzMrBzMDGRokFmZOWUI mNDuKisEwnf4v7OngtagYXVuGC2XG86ZC/2i8Zp+9M5gZK2PaCimcB2YyGE1AYY9WK4wRFuz3sui 30e0FGWQHsHUZcGB//hcjmLAP3LAleTRtXYOCywKiUE0TKHETBq5NetxDnN0N/iYkLPQ18BpqDpJ /J9+xuiZY2Njo2NnmQjOHqXx2OhoVJJCOKRgCjTbafFlTtOFnT/HKKH3XOPgPMo8JmPAtZagpU5G LRKaLBlJRnugXO26WmsX0uMm/LxmmgGjDdIC7+NoCrLIafTxKBfgpFijOwwmudGwnwePfYYUYmlI 5WfAWp3F/g8kmBxgyeDy+PkXXLjpIkPhxZdcelkUqdFGiZhFkQMrA6NgnN58+ZYrtl551dXXXHud SeH6G2686eZbtm679TasTAyDKQtkO8AnYOK333Hnlu1g2BjZYSLIe7M7d+2+6+4ErmBQwQHitU7c c29ME4dKw30FB0D0Ea177n+AnlLRAW4hf3DvQw9LkyxXQwUH0qtw+cijj+2jkbQdWCQi/0j9nn2P P/Hk/qeefmZIZp99bv+m5194EdKJl15+ZduBV1973fNkk2hvY8E2vPHmW2+/8+6O997/4MOJiYmP Pv7k072Dnx34fPcXWZOAnULEWeJLGYMmPBcSNfTl9q++/uZbo8Tvvv/hx58SpBKNYqQ1fZaQfCnD OukZ9mLXFVy4P4+bUsxTk3aFUIJpl4ZWObZZxcR0ilopmWIuySq+kZoBSVmhmBUqmCtM9Bdfyex4 J2wxmvw1Sy0Hd9HzkzS1MJxHlPcF4mmzhcBytllkOpqVZscpXVB94942mjLSpp8B+83GN2JH6rRv sINYzK4x5UrkgHLIU33QJvPifsa8ltZRdIchk1j1kgnURHbcNEYSEnKPjV1Aqni1ecE2Fd1KJ1xp 2gq4IjluGmseNcqUYgpivxfju8x7obv4JhuJu0a7SOJGL4XCKwXi0ZKlPd7ppr3k9qE/qDHiaylZ ILGg0NgkKxdAKY1oO2NKcY8D4wAZVEpl/yxdd+T9HghBp2IuxYwpeBFQAU2Wxj8VgOP0lE6xRFqA VvG//ib7h5RxOBVY1OMfcZoCk4diSpgGSx0SzwmpIH6mdUYKtQemo//SsQI3A/8xkVwRWNAVso9p HSwYwxBKj2NdMBCHR4LzJxQfFDuDKxJxlDCimdhZ5ujW5pRYS3DNwTgqUAArk38QX3ROOGL9q3Ar oK8Mfl65836ZLCYnAaKTdT2/kofeDdm68bgXXYG1y5PB/etwKlpoCatpzUudatbTVR1e7fF1uGjv rAk3LiLl4ZGFdcENF92lPtoj3Uvrhhe2pHtZJLIY7cRFy7o7KqL/A8+kYSeZZP3ZAAAAJXRFWHRk YXRlOmNyZWF0ZQAyMDIyLTAyLTAxVDE3OjQ0OjI3KzAwOjAwJtw1NwAAACV0RVh0ZGF0ZTptb2Rp ZnkAMjAyMi0wMi0wMVQxNzo0NDoyNyswMDowMFeBjYsAAAAASUVORK5CYII=" }));
export default SvgEurt;
