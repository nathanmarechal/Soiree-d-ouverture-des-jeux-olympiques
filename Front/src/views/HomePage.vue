<template>
  <div class="marge">
    <PageSlideshow />
    <PageTitle />
    <PageDescription />
  </div>
</template>


<script>

import PageTitle from '../components/PageTitle.vue'
import PageSlideshow from '../components/PageSlideshow.vue'
import PageDescription from '../components/PageDescription.vue'
export default {
  components: {
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
