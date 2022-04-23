import { defineConfig } from 'umi';

const basePath = '/wingdoc-ui/';

export default defineConfig({
  base: basePath,
  favicon: `${basePath}img/favicon.ico`,
  fastRefresh: {},
  nodeModulesTransform: { type: 'none', },
  publicPath: basePath,
  outputPath: `dist${basePath}`,
  routes: [
    {
      path: '/', 
      component: "@/layouts/index",
      routes: [
        { path: "/", exact: true, component: "@/pages/index" },
        { path: "/doc", exact: true, component: "@/pages/doc/docs" },
        { path: "/doc/:docId", exact: true, component: "@/pages/doc/doc" },
        { path: "/task", exact: true, component: "@/pages/task/tasks" },
        { path: "/media", exact: true, component: "@/pages/media/medias" },
      ],
    },
  ],
});
