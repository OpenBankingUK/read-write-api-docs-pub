// https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    // ...apply enhancements to the app
}

// // // https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
// // export default ({
// //     Vue, // the version of Vue being used in the VuePress app
// //     options, // the options for the root Vue instance
// //     router, // the router instance for the app
// //     siteData // site metadata
// // }) => {
// //     // ...apply enhancements to the app

// export default ({ router }) => {
//     // Redirect everything to v3.1.2 of the specification.
//     // Taken from https://github.com/vuejs/vuepress/issues/239#issuecomment-384269121.
//     router.addRoutes([
//         { path: '/', redirect: '/v3.1.2/specification/mi-reporting-profile.html' },
//         { path: '/v3.1.2/', redirect: '/v3.1.2/specification/mi-reporting-profile.html' },
//         { path: '/v3.1.2/specification/', redirect: '/v3.1.2/specification/mi-reporting-profile.html' },
//     ])
// }

// // // https://github.com/vuejs/vuepress/issues/239#issuecomment-384269121
// // export default ({ router }) => {
// //     router.addRoutes([
// //       { path: '/', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub/', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub/v3.1.2', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub/v3.1.2/', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub/v3.1.2/specification', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/mi-docs-pub/v3.1.2/specification/', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //       { path: '/test1/', redirect: 'v3.1.2/specification/mi-reporting-profile' },
// //       { path: '/test2/', redirect: 'v3.1.2/specification/mi-reporting-profile.html' },
// //     ])
// //   }

// // TODO: Use this, https://v1.vuepress.vuejs.org/guide/assets.html#base-url, instead.
