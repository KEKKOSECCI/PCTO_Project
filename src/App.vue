<script>
import LanguageToggle from './components/languageToggle.vue';
import NavBar from './components/NavBar.vue'
import Search from './components/search.vue';
import SideBar from './components/SideBar.vue';

export default {
  components: { NavBar, SideBar,LanguageToggle,Search}
}
</script>

<template>
  <NavBar></NavBar>
  <Search/>
  <LanguageToggle></LanguageToggle>
  <router-view>
  </router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
