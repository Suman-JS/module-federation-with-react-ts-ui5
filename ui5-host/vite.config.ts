import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "ui5Host",
			remotes: {
				ui5Remote: "http://localhost:5001/assets/remoteEntry.js",
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
		minify: "esbuild",
	},
});
