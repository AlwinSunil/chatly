import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import reactRefresh from "@vitejs/plugin-react-refresh"

const path = require("path")

export default defineConfig({
    resolve: {
        alias: {
            "@useHooks": path.resolve(__dirname, "./src/helpers/hooks"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "~firebase": path.resolve(__dirname, "./src/firebase"),
        },
    },
    plugins: [babel(), reactRefresh()],
    server: {
        host: true,
    },
})
