<template>
  <main>
    <header>
      <nav class="nav has-shadow" id="top">
        <div class="container">
          <div class="nav-left">
            <a class="nav-item" href="../index.html">
              <img src="#" alt="Projecta">
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

<style>

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

</style>
