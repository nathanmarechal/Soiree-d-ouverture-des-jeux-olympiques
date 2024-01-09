<template>
  <div id="app">
    <div class="nav">
      <PageNavbar/>
    </div>
    <router-link to="/"></router-link>
    <div class="content">
      <router-view></router-view>
    </div>
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
  background-color: rgba(236, 240, 241, 0.9);
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
  border-radius: 2vh;
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