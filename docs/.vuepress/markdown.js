module.exports = {
    // Config for these values can be found here: https://v1.vuepress.vuejs.org/config/#plugins
    lineNumbers: false,
    anchor: {
        level: [
            2,
            3,
            4,
            5,
            6,
        ],
    },
    toc: {
        includeLevel: [
            2,
            3,
            4,
            5,
            6,
        ],
    },
    // https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown
    extendMarkdown: (md) => {
        return md;
    },
    // https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown
    chainMarkdown: (config) => {
        return config;
    },
};
