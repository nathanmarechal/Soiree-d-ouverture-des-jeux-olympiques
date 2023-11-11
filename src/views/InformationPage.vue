<template>
    <div>
      <food ref="food"></food>
      <drink ref="drink"></drink>
      <fan ref="fan"></fan>
      <billetterie ref="billetterie"></billetterie>
      <shop ref="shop"></shop>
      <activity ref="activity"></activity>
      <inter ref="inter"></inter>
      <ratp ref="ratp"></ratp>

    </div>
</template>





<script>
import food from "../components/FoodInformationComponent.vue"
import drink from "../components/DrinkInformationComponent.vue"
import fan from "../components/FanInformationComponent.vue"
import billetterie from "../components/BilleterieInformationComponent.vue"
import shop from "../components/ShopInformationComponent.vue"
import activity from "../components/ActivityInformationComponent.vue"
import inter from "../components/InterInformationComponent.vue"
import ratp from "../components/RATPInformationComponent.vue"


export default {
  components: {
    ratp,
    inter,
    activity,
    shop,
    billetterie,
    fan,
    food,
    drink
  },
  data() {
    return {
      componentIds: ['food', 'drink', 'fan', 'billetterie', 'shop', 'activity', 'inter', 'ratp']
    }
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      event.preventDefault();
      if (event.deltaY > 0) {
        // Scrolling down
        this.moveToNextComponent();
      } else {
        // Scrolling up
        this.moveToPreviousComponent();
      }
    },
    moveToNextComponent() {
      // Logic to move to the next component
      const currentIndex = this.getCurrentComponentIndex();
      if (currentIndex < this.componentIds.length - 1) {
        this.$refs[this.componentIds[currentIndex + 1]].$el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    moveToPreviousComponent() {
      // Logic to move to the previous component
      const currentIndex = this.getCurrentComponentIndex();
      if (currentIndex > 0) {
        this.$refs[this.componentIds[currentIndex - 1]].$el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    getCurrentComponentIndex() {
      const scrolledY = window.scrollY;
      for (let i = 0; i < this.componentIds.length; i++) {
        const elementTop = this.$refs[this.componentIds[i]].$el.offsetTop;
        const elementHeight = this.$refs[this.componentIds[i]].$el.offsetHeight;
        if (scrolledY < elementTop + elementHeight) {
          return i;
        }
      }
      return this.componentIds.length - 1;
    }
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}


</style>