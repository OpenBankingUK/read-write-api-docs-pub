<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <router-link
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span
        class="chevron"
        v-if="collapsable"
        :class="open ? 'up' : 'down'"
      >
        <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>ico_chevron</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-788.000000, -1329.000000)" fill="currentColor" fill-rule="nonzero">
              <polygon transform="translate(792.000000, 1336.000000) rotate(-90.000000) translate(-792.000000, -1336.000000)" points="798.5 1333.45455 792 1340 785.5 1333.45455 786.944444 1332 792 1337.09091 797.055556 1332"></polygon>
            </g>
          </g>
        </svg>
      </span>
    </router-link>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span
        class="chevron"
        v-if="collapsable"
        :class="open ? 'up' : 'down'"
      >
        <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>ico_chevron</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-788.000000, -1329.000000)" fill="currentColor" fill-rule="nonzero">
              <polygon transform="translate(792.000000, 1336.000000) rotate(-90.000000) translate(-792.000000, -1336.000000)" points="798.5 1333.45455 792 1340 785.5 1333.45455 786.944444 1332 792 1337.09091 797.055556 1332"></polygon>
            </g>
          </g>
        </svg>
      </span>
    </p>

    <DropdownTransition>
      <SidebarLinks
        class="sidebar-group-items"
        :items="item.children"
        v-if="open || !collapsable"
        :sidebarDepth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from '../util'
import DropdownTransition from '@theme/components/DropdownTransition.vue'

export default {
  name: 'SidebarGroup',
  props: ['item', 'open', 'collapsable', 'depth'],
  components: { DropdownTransition },
  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate () {
    this.$options.components.SidebarLinks = require('./SidebarLinks.vue').default
  },
  methods: { isActive }
}
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  &.open, &:hover
    color inherit
  .arrow
    position relative
    top -0.12em
    left 0.5em
  .chevron
    float right
    transform translateY(3px)
    &.up
      svg
        transform rotate(-90deg)
    &.down
      svg
        transform rotate(90deg)
    svg
      color #00A5B7
  &.clickable
    &.active
      font-weight 700
      color $primaryBlue
    &:hover
      color $primaryBlue

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden

.sidebar-group.depth-0
 & > a
  color $primaryBlue
  &:hover, &.open
    text-decoration underline

.sidebar
  & > .sidebar-links
    & > li > a
      color $primaryBlue
      &:hover
        text-decoration underline

</style>
