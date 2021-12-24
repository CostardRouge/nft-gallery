import React from "react";
import ReactDOM from "react-dom";

import tree from "./tree.json";
import Gallery from "./pages/Gallery";

ReactDOM.render(
  <React.StrictMode>
    <Gallery tree={tree} />
  </React.StrictMode>,
  document.getElementById("root")
);
