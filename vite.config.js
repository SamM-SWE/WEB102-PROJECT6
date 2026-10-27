import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/nba": {
          target: "https://v1.basketball.api-sports.io",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nba/, ""),
          headers: {
            "x-apisports-key": env.NBA_API_KEY
          }
        }
      }
    }
  };
});