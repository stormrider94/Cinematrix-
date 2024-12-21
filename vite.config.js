import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // Example: Customize Ant Design theme variables
          "@primary-color": "#1DA57A",
        },
      },
    },
  },
});
