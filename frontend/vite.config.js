import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/movies/":"http://localhost:8000/",
      "/users/":"http://localhost:8000/"
    }
  }
})
