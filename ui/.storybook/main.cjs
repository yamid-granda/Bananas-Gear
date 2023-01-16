const { mergeConfig } = require('vite');
const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: '@/ui', replacement: path.resolve(__dirname, '../src') },
          { find: '@/components', replacement: path.resolve(__dirname, '../src/components') },
        ],
      },

      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
              @use 'sass:math';
              @use "../styles/index" as *;
              @import "../../styles/native-variables.scss";
              @import "../../styles/reset.scss";
            `,
          },
        },
      },
    });
  },
}