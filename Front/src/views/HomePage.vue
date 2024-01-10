<template>
  <div class="marge">
    <div v-if="$store.getters['user/getLang']==='fr'">
    <MainImageAndTitle_fr/>
    </div>
    <div v-else>
    <MainImageAndTitle_en/>
    </div>
    <PageTitle />
    <PageDescription :id="1"/>
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
import MainImageAndTitle_fr from "@/components/HomePage/MainImageAndTitle_fr.vue";
import MainImageAndTitle_en from "@/components/HomePage/MainImageAndTitle_en.vue";
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
    MainImageAndTitle_fr,
    MainImageAndTitle_en,
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
