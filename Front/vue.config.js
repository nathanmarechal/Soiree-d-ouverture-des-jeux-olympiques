const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@back': path.resolve(__dirname, '../Back') // Chemin relatif au dossier Back
      }
    }
  }
});
