<template>
  <header class="navbar">
    <div
      class="socket"
    >
      <div class="container">
        <div
          class="search-button"
          @click="isSearchOpen = !isSearchOpen"
        >
          <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>icon_search</title>
            <g id="🎨-Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="T#4---Generic-Content" transform="translate(-1254.000000, -11.000000)" fill="currentColor" fill-rule="nonzero" stroke="currentColor" stroke-width="0.4">
                <g id="Secondary-Nav">
                  <path d="M1263.76363,19.8996461 L1266.82154,22.9581266 C1267.05943,23.1960632 1267.06021,23.5810599 1266.81955,23.8217632 C1266.58056,24.0608 1266.18963,24.0573595 1265.95607,23.8237552 L1262.89817,20.7652747 C1260.97752,22.2603077 1258.19934,22.1249657 1256.43395,20.3592489 C1254.52202,18.4469551 1254.52202,15.3465142 1256.43395,13.4342204 C1258.34589,11.5219265 1261.44575,11.5219265 1263.35768,13.4342204 C1265.12307,15.1999372 1265.25838,17.9786391 1263.76363,19.8996461 L1263.76363,19.8996461 Z M1262.49222,19.4936204 C1263.92617,18.0594 1263.92617,15.7340693 1262.49222,14.2998489 C1261.05826,12.8656286 1258.73337,12.8656286 1257.29942,14.2998489 C1255.86547,15.7340693 1255.86547,18.0594 1257.29942,19.4936204 C1258.73337,20.9278407 1261.05826,20.9278407 1262.49222,19.4936204 Z" id="icon_search"></path>
                </g>
              </g>
            </g>
          </svg>
          <span>Search</span>
        </div>
      </div>
    </div>

    <div class="navbar-wrapper container">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
  
      <router-link
        :to="$localePath"
        class="home-link"
      >
        <img
          class="logo"
          v-if="$site.themeConfig.logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        >
        <span
          ref="siteName"
          class="site-name"
          v-if="$siteTitle"
          :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span>
      </router-link>
  
      <div
        class="links"
        :style="linksWrapMaxWidth ? {
          'max-width': linksWrapMaxWidth + 'px'
        } : {}"
      >
        <NavLinks class="can-hide"/>
      </div>
    </div>

    <div
      class="search-wrapper"
      :class="{ active: isSearchOpen }"
    >
      <div class="container">
        <span
          class="close"
          @click="isSearchOpen = false"
        >Close X</span>
        <h3>HOW CAN WE HELP?</h3>
        <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"
        />
        <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
      </div>
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null,
      isSearchOpen: false
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  // padding $navbar-vertical-padding $navbar-horizontal-padding
  padding 0
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    // height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    // margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    // position absolute
    // right $navbar-horizontal-padding
    // top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

.logo {
  display: flex !important;
  height: 100% !important;
  padding: 0;
}

.nav-links {
  padding: 0.4em;
}

.navbar-wrapper
  display: flex;
  justify-content: space-between;
  align-items: center;

.home-link {
  display: block;
  padding: 0;
  width 190px
}

.links {
  flex-direction: column-reverse;
}

.navbar {
  // line-height: 1.7; // working
  line-height: 2rem;
  // box-sizing: content-box;
}

.links {
  // margin-right: 1rem;
}

.search-box {
  position: relative;
  margin-right: 0;
  display: flex;

  input {
    flex: 1;
  }
}

.socket {
  background-color: $primaryBlue;
  padding: 10px 0;
  color: #fff;
  text-align: right;
}

.search-wrapper {
  display: none;
  background: $primaryBlue
  position: absolute;
  width: 100%;
  padding: 0;

  .close {
    display: block;
    position: absolute;
    color: white;
    top: 20px;
    right: 5.4%;
    font-size: 14px;
    cursor: pointer;
  }

  .suggestions {
    width: calc(100% - 15px);
    border-radius: 0;
    max-height: 400px;
    overflow-y: scroll;
  }

  .container {
    max-width: 620px;
    padding: 50px 0;
  }

  h3 {
    color: #fff;
    font-size: 16px;
    letter-spacing: .57px;
    line-height: 20px;
    text-transform: uppercase;
    padding: 0 0 10px;
    max-width: 620px;
    margin: 0 auto;
  }

  input {
    border-radius: 0;
    margin: auto;
    width: 100%;
    font-size: 16px;
    letter-spacing: .15px;
    color: #000;
    line-height: normal;
    border: 0;
    padding: 14px 14px 14px 36px;
    background-position: left 10px center;
    height: auto;
  }

  &.active {
    display: block;
  }
}

.search-button {
  display: inline-flex;
  align-items: center;
  font-size: .875rem;
  letter-spacing: .00625rem;
  line-height: 1.05rem;
  font-weight: 300;
  cursor: pointer;

  svg {
    height: 14px;
    width: 14px;
    margin-right: 4px;
  }
}

</style>
