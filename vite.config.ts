import { defineConfig, InlineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import extension from "./extension.json"
import { writeFile } from "node:fs/promises";

const cwd = process.cwd();
const root = `${cwd}/src`;
const outDir = `${cwd}/dist`;

function getPages(userConfig: InlineConfig, pattern: string) {
    const glob = new Bun.Glob(pattern).scanSync({
        cwd: userConfig.root
    });

    const paths = Array.from(glob).map(path => {
        const [dir, ...rest] = path.split("/")
        return [
            dir,
            `/${dir}/${rest.join("/")}`]
    })

    return Object.fromEntries(paths)
}

const config: InlineConfig = {
    plugins: [reactRefresh(), tsconfigPaths(), tailwindcss()],
    publicDir: `${cwd}/public`,
    root,
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
}

export default defineConfig({
    ...config,
    build: {
        outDir,
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                styles: "/styles.css",
                ...getPages(config, "**/*.html")
            },
            plugins: [
                {
                    name: "copy",
                    writeBundle: async () => {
                        await writeFile('./dist/extension.json', JSON.stringify(extension, null, 2))
                    }
                }
            ]
        },
        assetsDir: "assets"
    },
});