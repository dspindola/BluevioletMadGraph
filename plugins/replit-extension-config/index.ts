import type { InlineConfig } from "vite";
export function getPages(userConfig: InlineConfig, pattern: string) {
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
export function replitExtensionConfig(options: {
    root: string
    outDir: string
}): {
    name: string
    version: string
    writeBundle: () => Promise<void>
} {
    return {
        name: "replit-extension-config",
        version: "0.0.1",
        writeBundle: async () => {
            const { root, outDir } = options
            const input = Bun.file(`${root}/extension.json`);
            await Bun.write(`${outDir}/extension.json`, await input.text())
        },
    }
}