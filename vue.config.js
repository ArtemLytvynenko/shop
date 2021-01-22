module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/styles/styles.scss";`
            }
        },
    },
    configureWebpack: {
        devtool: 'source-map'
    }
};
