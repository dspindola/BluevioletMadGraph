import { useReplit } from "@replit/extensions-react";
import type { EditorPreferences, } from "@replit/extensions";
import { Suspense, use } from "react";

function Preferences({ loader }: { loader: () => Promise<{ error: null | Error, data: EditorPreferences | null }> }) {
    const { error, data } = use(loader())

    if (error) {
        return <div>
            <h1>Error</h1>
            <p>{error.message}</p>
        </div>
    }

    return <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}

export function App() {
    const { replit, error } = useReplit()

    if (error) {
        return <main className="min-h-screen bg-white dark:bg-black text-white">
            <h1>theme app</h1>
            <p>{error.message}</p>
        </main>
    }

    const loadConfig = () => replit.experimental.editor.getPreferences()
        .then(preferences => {
            return {
                error: null,
                data: preferences
            }
        })
        .catch(error => {
            return {
                error,
                data: null
            }
        })

    return <main className="min-h-screen bg-white dark:bg-black text-white">
        <h1>theme app</h1>
        <Suspense>
            <Preferences loader={loadConfig} />
        </Suspense>
    </main>
}