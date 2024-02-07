import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

import { ThemeProvider } from "@ui5/webcomponents-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ErrorBoundary fallback={<h1>Something went wrong</h1>}>
			<BrowserRouter>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</StrictMode>
);
