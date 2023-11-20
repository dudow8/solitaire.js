import React from "react";
import { createRoot } from "react-dom/client";
import { Solitaire } from './components';

const App = () => (
    <Solitaire />
)

const root = createRoot(document.getElementById("root"));
root.render(<App />,);
