module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['./src/'],
        data: "@import 'variables';",
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
}
