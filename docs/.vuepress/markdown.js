module.exports = {
    // https://vuepress.vuejs.org/config/#markdown-linenumbers
    lineNumbers: false,
    // options for markdown-it-anchor
    anchor: {
        permalinkBefore: true,
        permalink: true,
        level: [
            2,
            3,
            4,
            5,
            6,
        ],
    },
    // options for markdown-it-toc
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
