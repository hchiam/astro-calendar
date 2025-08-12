import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [svelte(), react()],
  // site: 'http://example.com', // Your public domain, e.g.: https://my-site.dev/
});
