import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const cwd = process.cwd();
const root = `${cwd}/src/editor`;
const outDir = `${cwd}/dist`;

export default defineConfig({
    plugins: [reactRefresh(), tsconfigPaths(), tailwindcss()],
    root,
    build: {
        outDir,
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {},
        assetsDir: "./packages/assets"
    },
    css: {
        devSourcemap: true
    },
    esbuild: {
        sourcemap: true
    },
    server: {
        port: 8080,
        host: "0.0.0.0",
        watch: {}
    },
    preview: {
        port: 8080,
        host: "0.0.0.0"
    }
});