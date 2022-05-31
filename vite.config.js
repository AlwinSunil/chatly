import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [babel(), reactRefresh()],
    server: {
        host: true,
    },
})
