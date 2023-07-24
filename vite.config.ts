import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteSvgr from "vite-plugin-svgr";
import { resolve } from "path";
import autoprefixer from "autoprefixer";


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		viteSvgr({
			exportAsDefault: true,
		}),
		react(),
	],
	css: {
		postcss: {
			plugins: [
				autoprefixer({}), // add options if needed
			],
		},
	},

	base: "",
	resolve: {
		alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
	},
});
