import * as React from "react";
const SvgFx = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64", width: 64, height: 64, ...props }, /* @__PURE__ */ React.createElement("title", null, "fx"), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("image", { width: 64, height: 64, id: "fx-img1", href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAwBQTFRFAAAAVVVVAAAA////cXFxSkpKOTk5GRkZJSUlFhYWBwcHAQAB////AAAAzMzMZGRkLy8vGBgYDw8PBgYGAAAAAAAAkJCQOTk5GhoaCwsLAAAAAAAAAQEBAAAAlZWVQEBAGBgYAwMDAQEBAAAA////Ozs7ExMTAAAAWVlZGxsbBAQE////QkJCERER////NDQ0CAgI4eHhKioq8PDwODg4AQEBKSkpAAAAQUFBYmJi6OjoGRkZOjo6jo6OERERAQICOzs7FRUVQUFBXl5eaGhoW1tbHR0dMzMzkpKS6enp////7u7uvr6+ICAgFhYWGBgY0NDQ9vb27e3t/f39/v7+X19fsLCw4eHhJycnLCwsc3NzLS0tMjIy7u7uFhYWe3t7iIiIDg4Oq6urUlJSQ0NDtra2RUVFNjY2tbW1GBgYpaWlxcXFwsLC09PTwMDAxsbGZWVlAQEAAgIAIiIikZGRAQACAAABjo6Op6en5eXlpKSkqKioV1dXGxgMDQwGAwMBBAMBIR8NsrKyOzs7ExEIybpBwrI/FRUKi38w69lLOTQXt7e3R0dHmIoy//JQt6c7Dw4HJyQRR0AaRj8aFBIIPTgXf3Qr/+1Nz71B9uRM4MxFHx0NQDoX9uFN/+xOnZA0NjAU8N1L/+5Pg3gsrqA4//FPfHIpo5U0BgYDk4cw+uNK7dhHMzATmY0y/+lL+ONM28dDFxUJ9N1KMS0S/eZLmIwx59RJ++ZNXlghxLM+/ehNSUEZAwIAOzYV0L5ACgkFeG0o/+pN/eZMwrA9//NQT0kbAAACyLc/9N1I8dpI8dxJfXMomo40VEwcsqE6BAMD+eJL7NZFoJQ2SkIawK48Mi0T7NdJ6dJGhHgqkYQyLikRqZs3x7U+bWMl489GIh4O//BPZ14iy7pCSkUbb2Ymz75Bj4Qv3slFp5o3Dw4GzbxC18VFbGEkuKo8REREGRcL3MlE+eRNVU8exrU+X1ggsaM6ybk+vLy8HxwOsqQ8//lSnJyc3d3dfXMrcmcnRT8XKkvZZwAAAQB0Uk5TAAMED0aAt8n4////AQIPXqfh////ATeO5v/+/P39MKv+//4DC4r2+0LS/wOA/wSy/yLCId/7xvqBPAvZiS32/7H+//////+S////////6v///////2H//////6n/D+H//////33//7f/zf////////////j//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3qjqKQAAAVfSURBVHicpVd9TBNnGH8eBNpDWtyOFhXSgXXOWUdi0PAxsgym0YzFzKiZbisbbAkbZWRm+2fJ4thfkmUfMXJmyzJUmIkfOOMyNeoyZ2YQBs5o1g0zKq4DHRyV0RauQOTde9f2enfAibnnj0vv7T2/9/k9n++LMEMQpwEWYEyAxOQ+QBIhM7/WLqRjCKwx3YREMYJgIWF9AFtgGuxUdwpS6fMeMHRNgEep8iSk0OcQJLG8DgAScFDFkAlMg4zqHyFrAiYsFMIvfjQXgNO3nG6bapkKzqAqijUlNEmN6XX6ZgewAb8Sccj0HzNDVbZj0YSdkB765SwAmE6tv8vOsXvCisASyiMs05ABkOQjBkhEV10UM7KE3JAdEQdID69BP9s/t/UKHjkBB7mWHlYBICnAQGbfPNRFyRtmydWYDVEAWyTPfEvlXH1x+pZF+sy8DGALpDkH2MC89QHYQLZvXEopCQBJUSRlvvZHJW/K3CGRQEm/+KZtXv5LiJDDP3FFRKAANmsW9iU9OH5qMU/nkcEgLwIgKR1IfRgHRIWdzL5MTUDAzJXoM2nyT7BTRoLDqwNgnXCSnmGCNCTPdq1Se1Cwh2I/QMczeX+s+9npQyQOZ2+KygCBgbFiWtX3k3/T42CdWu7zIyZNb7yco/KAwCzJjrYjCnJFmNsGtr/0XBJCSWa7VWmAq3s9TgKYIgwKaacX6gBYgyXD7Qjb/+InlMuu7oowkxzI9Pa+yNvP63EAk+3x4wivXLQoGbi8m+4xJPXHOB09ADZUdhjdeEbFwD5UwYP9h/F13bCWt+nFUeTwPMFk97lJ5aIltPlfWNLLD+mqxiR1Yyu+2T6qcIFALXh5AHIOP/a3+Pqg+jBllGDNCbOmDLb5IXJjPvvTgohsxbePM8tiTAXG5aIJcCcCTnGG0en2rSXkhlalSmWL4sV1S9iO7x1yQQKAVVmz6qC94oAUiepmaaF6qlWJQDVfQ2ahsDYBUMTbgxnXISmfZuJIZOmX9hdMuN8D8CkD1Z1lMN78zr6qAwmAbmYM09JkgFjY6zugeG98iw00nT+TNTwM4iceTgEwjgsZlz+UwPQzQu1FKOeCVvrmKEjOik35BhA+Mi+4nYc4PLo/HhxKQaAAcvFGF71baBi/s4hrHu7jZMQPGinAnxxHn7uq6fSpl02QAFQUNACVyWumsb6pTtR96yscunPJ28hif4O7VUFB4UQtgLv1m8HF+FPG2AqyFDtoh3jVXnH6C8SdcRMkJyrCqAU4suNoMAO3uzOa2nAk7MCBX4mV47L9MgcpjIpE0gJ4uFM3Rws3MK4CRyElMUp39nBnf3lm05EdsW/FRNKmsgrgnHf1EY6p3rnhUDb2/b6npsXDtQ08VS4nk5jK6mLSAFy8xxYCnNpxCb2r+f76uvG00Zph29NyGMRi0pazAqCypX3ketYbgv2w7U42hqy4ei149xVjgQwglrO2oaiicNzZ8+SaprrdRbdL9r7bWZR/ofTD17uwKk5BaigzW5oykdoGnvucqcUT2442dJ5PzX0Jes5UXOiM16fU0rRN1eXdxsPXK6KJRHZT7y+7tggwt6p0PZ7Y1fXIlZyyhAukpqpp6y7vP1uhvFECoP3tVtvi8sYmgKotm+H788eu4cmrjNAcZyC2de1gcXnvIuzZGwUQ3ucG8djVLScBOahFsj98MPcsiddzdLDMHG1EgCy5vNyqfqSS2GibbbgqpRJaVG9ERowN11nGu+5MThgQH++GDxjGjziGD1nGj3nGD5qGj7rGD9vGj/vGLxzGrzzGL11g+NoHs10844U1v4vnLFdfOvAf5uoLhi/f0tJDXf//B9TF1LFR+eoXAAAAAElFTkSuQmCC" })), /* @__PURE__ */ React.createElement("style", null), /* @__PURE__ */ React.createElement("use", { id: "fx-Background", href: "#fx-img1", x: 0, y: 0 }));
export default SvgFx;