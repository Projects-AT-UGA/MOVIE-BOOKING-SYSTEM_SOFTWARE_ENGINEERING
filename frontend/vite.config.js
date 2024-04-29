import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/movies/":"http://localhost:8000/",
      "/users/":"http://localhost:8000/",
      "/user":"http://localhost:8000/",
      "/admin":"http://localhost:8000/",
      "/admin/movies":"http://localhost:8000/",
      "/superuser/login":"http://localhost:8000/",
      "/card":"http://localhost:8000/",
      "/booking":"http://localhost:8000/",
      "/payment":"http://localhost:8000/"
    }
  }
})
