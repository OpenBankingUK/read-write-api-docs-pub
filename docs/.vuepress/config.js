const sidebar = require('./sidebar.js');
const nav = require('./nav.js');
const head = require('./head.js');
const devServer = require('./devServer.js');

module.exports = {
    base: '/read-write-api-docs-pub/',
    title: '',
    description: 'OBIE Read/Write API Standards',
    head,
    themeConfig: {
        sidebar: sidebar,
        nav,
        logo: '/assets/img/logo-dark.svg',
        sidebarDepth: 0,
        searchMaxSuggestions: 10,
        smoothScroll: true,
        lastUpdated: false,
    },
    extendMarkdown: (md) => {
        return md;
    },
    devServer,
    css: {
        sourceMap: true,
    },
    runtimeCompiler: true,
    evergreen: true,
    extraWatchFiles: [
        '.vuepress/devServer.js',
        '.vuepress/enhanceApp.js',
        '.vuepress/head.js',
        '.vuepress/markdown.js',
        '.vuepress/nav.js',
        '.vuepress/sidebar.js',
    ],
};
