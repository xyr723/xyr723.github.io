import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoFromCI = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repoFromCI ? repoFromCI.endsWith('.github.io') : true;
const base = isUserSite || !repoFromCI ? '/' : `/${repoFromCI}/`;

export default defineConfig({
  base,
  plugins: [react()],
});
