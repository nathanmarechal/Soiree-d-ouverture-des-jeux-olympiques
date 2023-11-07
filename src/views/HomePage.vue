<template>
  <div>
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
