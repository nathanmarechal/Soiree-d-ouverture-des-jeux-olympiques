<template>
  <div class="marge">
    <MainImageAndTitle/>
    <PageTitle />
    <PageDescription />
    <SlideshowTitleComponent/>
    <PageSlideshow/>
    <CardHomeTitleComponent></CardHomeTitleComponent>
    <CarteForHomePage/>
  </div>
</template>


<script>

import PageTitle from '../components/HomePage/PageTitle.vue'
import PageSlideshow from '../components/HomePage/PageSlideshow.vue'
import PageDescription from '../components/HomePage/PageDescription.vue'
import MainImageAndTitle from "@/components/HomePage/MainImageAndTitle.vue";
import SlideshowTitleComponent from "@/components/HomePage/SlideshowTitleComponent.vue";
import CarteForHomePage from "@/components/HomePage/CarteForHomePage.vue";
import CardHomeTitleComponent from "@/components/HomePage/CardHomeTitleComponent.vue";
export default {
  components: {
    SlideshowTitleComponent,
    MainImageAndTitle,
    PageSlideshow,
    PageTitle,
    PageDescription,
    CarteForHomePage,
    CardHomeTitleComponent
  }
}
</script>

<style scoped>
.marge{
  margin-bottom: 5%;
}
</style>
