import { type InlineConfig, mergeConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'
import { getPages, replitExtensionConfig } from "./plugins/replit-extension-config"

const cwd = process.cwd();
const root = `${cwd}/src`;
const outDir = `${cwd}/dist`;


const config: InlineConfig = {
    plugins: [reactRefresh(), tailwindcss()],
    publicDir: `${cwd}/public`,
    root,
    server: {
        port: 8080,
        host: "0.0.0.0",
    },
    preview: {
        port: 8080,
        host: "0.0.0.0"
    }
}

export default mergeConfig(config, {
    build: {
        outDir,
        rollupOptions: {
            input: getPages(config, "**/*.html"),
            plugins: [
                replitExtensionConfig({
                    root: ".",
                    outDir: 'dist'
                })
            ]
        },
    },
});