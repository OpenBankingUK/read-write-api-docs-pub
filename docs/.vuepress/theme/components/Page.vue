<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  // padding-bottom: 2rem;
  // padding-bottom: calc(2rem + 204px);
  // display: block;

  // height: calc(83vh - 3.6em);
  // height: calc(83% - 3.6em);

  // margin-bottom: -200px;
  // min-height: 100%;

  min-height: calc(100vh - 255px);
  // overflow: auto;
}

// .theme-default-content {
//   height: calc(100vh - 283px);
// }

.theme-default-content {
  // box-sizing: border-box;
  // height: 100%;
  // max-height: calc(100vh - 300px);
}

.page {
  // margin-bottom: -204px;
}
</style>
