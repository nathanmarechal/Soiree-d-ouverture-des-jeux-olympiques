<template>
  <div id="app">
    <div class="nav">
      <PageNavbar/>
    </div>
    <router-link to="/"></router-link>
    <router-view></router-view>
    <PageFooter />
  </div>
</template>


<script>

import PageNavbar from './components/PageNavbar.vue'
import PageFooter from './components/PageFooter.vue'
export default {
  components: {
    PageNavbar,
    PageFooter
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  height: 100%;
  width: 100%;
}

.nav{
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1050;
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(~@/assets/Logos/logotest.png) repeat;
  background-color: #FEFEE2 ;
  opacity: 0.2;
  z-index: -1;
}
</style>