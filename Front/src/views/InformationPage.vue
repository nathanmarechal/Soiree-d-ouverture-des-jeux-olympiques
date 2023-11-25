<template>
    <div>
      <food ref="food"></food>
    </div>
</template>





<script>
import food from "../components/infoPage/FoodInformationComponent.vue"


export default {
  components: {
    food,
  },
  data() {
    return {

      componentIds: ['food']
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
      const currentIndex = this.getCurrentComponentIndex();
      if (currentIndex < this.componentIds.length - 1) {
        this.$refs[this.componentIds[currentIndex + 1]].$el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    moveToPreviousComponent() {
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