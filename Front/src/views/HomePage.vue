<template>
  <div class="marge">
    <MainImageAndTitle/>
    <PageTitle />
    <PageDescription />
    <SlideshowTitleComponent/>
    <PageSlideshow/>
  </div>
</template>


<script>

import PageTitle from '../components/PageTitle.vue'
import PageSlideshow from '../components/PageSlideshow.vue'
import PageDescription from '../components/PageDescription.vue'
import MainImageAndTitle from "@/components/MainImageAndTitle.vue";
import SlideshowTitleComponent from "@/components/SlideshowTitleComponent.vue";
export default {
  components: {
    SlideshowTitleComponent,
    MainImageAndTitle,
    PageSlideshow,
    PageTitle,
    PageDescription,
  }
}
</script>

<style scoped>
.marge{
  margin-bottom: 5%;
}
</style>
