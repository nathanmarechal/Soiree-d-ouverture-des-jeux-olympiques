<template>
  <div class="marge">
    <MainImageAndTitle/>
    <PageTitle />
    <PageDescription />
    <SlideshowTitleComponent/>
    <PageSlideshow/>
    <StandTitle/>
    <StandHomeView/>
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
import StandHomeView from "@/components/HomePage/StandHomeView.vue";
import StandTitle from "@/components/HomePage/StandTitle.vue";
export default {
  components: {
    StandTitle,
    StandHomeView,
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
