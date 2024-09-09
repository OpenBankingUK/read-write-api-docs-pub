const sidebar = require('./sidebar.js');
const nav = require('./nav.js');
const head = require('./head.js');
const devServer = require('./devServer.js');

module.exports = {
    base: '/spec-preview-268/',
    title: '',
    description: 'OBL Read/Write API Standards',
    head: [
        ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/img/icons/favicon-32x32.png"}],
        ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/img/icons/favicon-16x16.png"}],
        ['link', { rel: "shortcut icon", href: "/assets/img/icons/favicon.ico"}],
    ],
    themeConfig: {
        sidebar: sidebar,
        nav,
        logo: '/assets/img/open-banking-logo.svg',
        sidebarDepth: 0,
        searchMaxSuggestions: 20,
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
