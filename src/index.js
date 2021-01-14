// Base
import React from "react";
import ReactDOM from "react-dom";
// Router
import { BrowserRouter } from "react-router-dom";
// Components
import App from "./App";
// Styles
import "./index.css";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
