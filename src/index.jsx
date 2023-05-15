import React from "react";
import { createRoot } from 'react-dom/client';

import Gallery from "./pages/Gallery";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>
);
