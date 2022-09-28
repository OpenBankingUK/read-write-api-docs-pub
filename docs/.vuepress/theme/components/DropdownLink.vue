<template>
  <div
    class="dropdown-wrapper"
    :class="{ open }"
  >
    <a
      class="dropdown-title"
      @click="toggle"
    >
      <span class="title">{{ item.text }}</span>
      <span
        class="arrow"
        :class="open ? 'down' : 'right'"
      ></span>
    </a>

    <DropdownTransition>
      <ul
        class="nav-dropdown"
        v-show="open"
      >
        <li
          class="dropdown-description"
        >
          <div class="dropdown-description__title">{{ item.text }}</div>
          <div class="dropdown-description__description">{{ item.description }}</div>
          <a
             class="dropdown-description__link"
            :href="item"
            target="_blank"
          >
            <span>Find out more</span>
            <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>ico_chevron</title>
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-788.000000, -1329.000000)" fill="#00A5B7" fill-rule="nonzero">
                  <polygon transform="translate(792.000000, 1336.000000) rotate(-90.000000) translate(-792.000000, -1336.000000)" points="798.5 1333.45455 792 1340 785.5 1333.45455 786.944444 1332 792 1337.09091 797.055556 1332"></polygon>
                </g>
              </g>
            </svg>
          </a>
        </li>

        <li
          class="dropdown-item"
          :key="subItem.link || index"
          v-for="(subItem, index) in item.items"
        >
          <h4
            v-if="subItem.type === 'links'"
          >
            {{ subItem.text }}
            <svg width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Combined Shape</title>
              <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="T#01---Homepage---Navigation" transform="translate(-600.000000, -71.000000)" fill="#101289">
                  <g id="About-Us" transform="translate(553.000000, 65.218476)">
                    <path d="M50.5,4 L50.5,8.5 L55,8.5 L55,10 L49,10 L49,4 L50.5,4 Z" id="Combined-Shape" transform="translate(52.000000, 7.000000) rotate(-45.000000) translate(-52.000000, -7.000000) "></path>
                  </g>
                </g>
              </g>
            </svg>

          </h4>

          <ul
            class="dropdown-subitem-wrapper"
            v-if="subItem.type === 'links'"
          >
            <li
              class="dropdown-subitem"
              :key="childSubItem.link"
              v-for="childSubItem in subItem.items"
            >
              <NavLink :item="childSubItem"/>
            </li>
          </ul>

          <NavLink
            v-else
            :item="subItem"
          />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import DropdownTransition from '@theme/components/DropdownTransition.vue'

export default {
  components: { NavLink, DropdownTransition },

  data () {
    return {
      open: false
    }
  },

  props: {
    item: {
      required: true
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="stylus">
.dropdown-wrapper
  cursor pointer
  .dropdown-title
    display block
    &:hover
      border-color transparent
    .arrow
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem
  .nav-dropdown
    .dropdown-item
      color inherit
      line-height 1.7rem
      h4
        margin 0.45rem 0 0
        border-top 1px solid #eee
        padding 0.45rem 1.5rem 0 1.25rem
      .dropdown-subitem-wrapper
        padding 0
        list-style none
        .dropdown-subitem
          font-size 0.9em
      a
        display block
        line-height 1.7rem
        position relative
        border-bottom none
        font-weight 400
        margin-bottom 0
        padding 0 1.5rem 0 1.25rem
        &:hover
          color $accentColor
        &.router-link-active
          color $accentColor
          &::after
            content ""
            width 0
            height 0
            border-left 5px solid $accentColor
            border-top 3px solid transparent
            border-bottom 3px solid transparent
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0
.nav-links
  .dropdown-description
    width 235px
    padding 31px 40px 40px 0
    background-color #f8f8f8
    position relative
    padding-left 5.4%
    &__description
      white-space normal
      font-size 16px
      font-weight 300
      letter-spacing .15px
      line-height 28px
      color #333
    &__title
      font-size 20px
      font-weight 700
      letter-spacing .15px
      line-height 1.2
      text-decoration none
      color $primaryBlue
      margin-bottom 18px
    &__link
      color $primaryBlue
      font-size 16px
      font-weight 700
      display flex
      align-items center
      margin-top 18px
      svg
        width 18px
        height 13px
        margin-left 3px
        margin-top -2px
        transition margin-left .25s ease
      &:hover
        color $primaryBlue
      &:hover svg
        margin-left 6px

@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    .nav-dropdown
      transition height .1s ease-out
      overflow hidden
      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0
        h4, & > a
          font-size 15px
          line-height 2rem
        .dropdown-subitem
          font-size 14px
          padding-left 1rem

@media (min-width: $MQMobile)
  .navbar-wrapper
    .nav-links
      padding 0
  .nav-item
    margin 0 11px
    &:last-child
      margin-right 0
  .dropdown-wrapper
    &:hover .nav-dropdown
      // override the inline style.
      display flex !important
    &:hover .dropdown-title
      color: #101289;
      -webkit-text-stroke: 0.9px #101289;
    .dropdown-title
      opacity .85
      color #000
      font-size 15px
      font-weight 300
      letter-spacing .1px
      line-height 12px
      padding 42.5px 0
    .dropdown-title .arrow
      // make the arrow always down at desktop
      // border-left 4px solid transparent
      // border-right 4px solid transparent
      // border-top 6px solid $arrowBgColor
      // border-bottom 0
      display none
    .nav-dropdown
      display none
      position absolute
      top 100%
      left 0
      width 100%
      background-color #fff
      padding 0
      text-align left
      margin 0
      border-top 1px solid rgba(0,0,0,.1);
      box-shadow 0 8px 24px rgba(16, 18, 137, 0.1);
      .dropdown-item
        list-style none
        padding 30px 20px 40px 35px
        width min(392px, 15%)
        .nav-link
          padding 0
          svg
            display none
        h4
          border none
          position relative
          margin-bottom 8px
          font-size .875rem
          letter-spacing .00625rem
          line-height 1.2rem
          color $primaryBlue
          padding 0
          font-weight 700
          display inline-block
          white-space normal
          svg
            transition margin-left .25s ease
          &:hover svg
            margin-left 6px
        .dropdown-subitem
          white-space normal
          margin-bottom 8px
          span
            display none
          a
            font-size .875rem
            letter-spacing .00625rem
            line-height 1.2rem
            display block
            color #000
            padding-top 7px
            &:hover
              text-decoration underline
              color $primaryBlue
</style>
