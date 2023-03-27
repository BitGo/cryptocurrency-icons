import * as React from "react";
const SvgCvx = (props) => /* @__PURE__ */ React.createElement("svg", { id: "Layer_1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", x: "0px", y: "0px", width: "65px", height: "65px", viewBox: "0 0 65 65", enableBackground: "new 0 0 65 65", xmlSpace: "preserve", ...props }, /* @__PURE__ */ React.createElement("image", { id: "image0", width: 65, height: 65, x: 0, y: 0, href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAA4ODg5OTk6Ojo6 Ojo6Ojo6Ojo4ODhAQEA4ODg5OTk6Ojo6Ojo4ODg5OTk1NTU4ODg6Ojo5OTk5OTk5OTk6Ojo6Ojo6 Ojo8PDw7Ozs5OTk9PT07Ozs6Ojo6Ojs7OjgzTWkceuGcvd/m5eXm5ubl5eVoaGg5Ojo6OjkyTm4W gvynz/f+//7///9zc3NBS0ZOgWt0ioKTk5OUlJOMnrB9uvfN5Pi0tLSUlJRMTExFXFFj2KS16tP+ //////79//79/v3+/v5lZWU4Ozo3OzpEW1Jj2KVYoYJo0qTz+vby/fr4/fyJiYk/Pz82WH8lgvHA 2/T8/Pz6+vq6urpVpIJm2KX3/vv9/f/+/v+GhoYvVIEVgf272vT+/f69vb1m16b5/vudnZ2enp5g YGA0SF8lX6B7i5iRu+atz/Bm16X09PQ5OTk7Ozs4PDobeeNUofI2Ozogc9ZSmObx8vLy8vK3t7c2 OkA2Oj9VpIFn16f4/vs5OjmNmVm3yG36/Pb+//22kD3xvEb7/PL//v47Ojm2kD7yu0f7+/L//v1S Pj5URURTU1NGRkY5OTjiVlb0hoa1kD45OjjjV1b1hobHx8fIyMh2dnZoQ0TAU1DApqX2z8342tn8 /PL9/f3///06OTqCRkj8Wl33z9CdfzzInkHX1cf27tL79ehpaWmfdXP3f4D32trb29vR0dE7OThg Vz3zvED23qFgVz/0vD723aT9///9/v5FQz1pWzZqZVZqampqa2qOc3HzhoT0zs2VlZVra2tDQ0M7 OTo7OjpvREb7Wlv4wcBxcXE5OzpkQUPMUlHKo6POzc3Nzc1hYWFWYxlIAAAAHXRSTlMAIFBggJ+Q QBB/v+/PYN8wX9+PoHCwwDBAz69Q0GkjH2wAAAABYktHRC3N2kE9AAAACXBIWXMAAAsTAAALEwEA mpwYAAAAB3RJTUUH5gIBESwaFwI9qQAAAxVJREFUWMOlmPdj0kAUxy8QILSFqmBarVdXbVGJe1uq ca+qRdyzbq3bOlGrlta99957b8W9Z/2bvJCiwd67JPD9BUje++Tdu7uXdyAEi7NYed5m53mLQ0Cm 5XCmpWONMmwuzoS74EzwjivNZfTxaRiS22kgEA72Vxl6AHr8CYxMZgAZev6KGGHU0w2gdmKgbDiN +Ssj4VIEAAgzACrCHICCcJgEkHQm7hWuvmkCbpBA8JgHYOzQAKzJALBbSGkMivik5yGudC7FEDC2 1RK8DJtcdhC1mQBDaNqseYuWeXmt8nUyYaHfLPBhX+s2bf2SJLWDg2CshfYdOnbq3KVrNwKQuvcg 6kk1i60JelHo1bswUNSnrxKCrFCkflQzO7Qj+g8YOKjQH/OUAoEATMiAZmLwkKHDhivPHlFcPHLU 6CJJKikJjqFZktloSLseGjtOHj+BECbi3EmTp0xVvkrTgERQi2to+gwSQbB05iyMZ8+ZO28+SPAi RB1eaIFCWIjLlB+LFi9ZGoAIdiQwCaqWLV+xsry8fBXN0oY4A4Sy1WtiHzRLEShva9et9/8j4HAY Q4IIGzZuqtAQGBJRFvX65i1bKzWEiI9BoOehqnrbdg1hx85dRLvpBEGfEN6zdx+4HmzAxtqvEtTs +w4cPAQSeGBNqoTg4SNHccGx4ydOnmKtSWp5qKo+feasP7Yvzp2/cFH2g4RsYG9eunzl6jVlb5bm X79x8xYByLfvlNIsye6mTmfk7r37Dyolrej1QYRqlA8/fPRYfiI/VauMTEQneBWCnXrr2fMX0Zev Xr8hxUV6G41G372nmmXCL/7Ih49h36fPX8hQ5K8Yklt9XzSC7n/7/uPnr5qamt8gwaX/zmIr3sgI BpvAuoq/NxGfYggkiJT7hyT6sFgI2j7KngwhoR9MZhw8ShBnej4a/9/TWkwC3HUPb+bWFbU1N7Mq gOOBy3AuwCOK0bbQAx9gOSP9dboXsWTVDUPUO3Jy7OXpzkb64jxgHKLRczOyirTx2408/6+EHE8T rbfIm3KPKyvbqigni/X3wx/ezcj3hBQLlAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wMi0wMVQx Nzo0NDoyNiswMDowMICrPoMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDItMDFUMTc6NDQ6MjYr MDA6MDDx9oY/AAAAAElFTkSuQmCC" }));
export default SvgCvx;