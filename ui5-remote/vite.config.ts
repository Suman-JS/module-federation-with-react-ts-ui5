import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "ui5Remote",
			filename: "remoteEntry.js",
			exposes: {
				"./DateTimePickerCard": "./src/components/DateTimePickerCard",
				"./CustomComponent": "./src/components/CustomComponent",
				"./SideNavbar": "./src/components/SideNavbar",
			},
			shared: [
				"react",
				"react-dom",
				"tailwindcss",
				"@ui5/webcomponents-react",
				"react-router-dom",
			],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: false,
	},
});
