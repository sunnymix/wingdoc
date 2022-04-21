import { defineConfig } from 'umi';

const basePath = '/wingdoc-ui/';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/**', component: '@/pages/index' },
  ],
  fastRefresh: {},
  base: basePath,
  favicon: `${basePath}img/favicon.ico`,
  publicPath: basePath,
  outputPath: `dist${basePath}`,
});
