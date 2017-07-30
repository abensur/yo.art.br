<template>
  <main>
    <header>
      <nav class="nav has-shadow" id="top">
        <div class="container">
          <div class="nav-left">
            <a class="nav-item" href="../index.html">
              <img height="40px" src="./assets/mercadocriativo.png" alt="Mercado Criativo" />
            </a>
          </div>
          <span class="nav-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="nav-right nav-menu" v-bind:class="{ 'is-active': menuActive }" >
            <router-link tag="a" class="nav-item is-tab"  to="lista">lista</router-link>
            <router-link tag="a" class="nav-item is-tab"  to="cadastro">cadastro</router-link>
          </div>
        </div>
      </nav>
    </header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menuActive: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuActive = !this.menuActive
    }
  }
}
</script>

<style lang="scss">

body {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.nav {
  height: 5rem !important;
  background-color: #7832A1 !important;
}
.nav-item {
  color: #fff !important;
  font-weight: 500 !important;
}
.nav-toggle {
  height: 5rem !important;
}
.nav-toggle:hover {
  background-color: darken(#7832A1, 10) !important;
}
.nav-toggle span {
  background-color: #fff !important;
  width: 1rem !important;
  height: 2px !important;
}
.nav-right.nav-menu.is-active .nav-item {
  color: #666 !important;
}
.nav-item a:not(.button).is-tab.is-active, a.nav-item:not(.button).is-tab.is-active {
  border-bottom-color: #fff !important;
}
.nav-left .nav-item {
  width: 5rem;
}
.nav-left .nav-item img {
  width: 100%;
  /* min-width: 100%; */
  max-height: 100%;
}
</style>
