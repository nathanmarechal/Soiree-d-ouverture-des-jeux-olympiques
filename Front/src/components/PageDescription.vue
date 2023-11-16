<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-lg-6 d-flex align-items-center justify-content-center">
        <div class="image-container"></div>
      </div>
      <div class="col-lg-6 d-flex flex-column align-items-center justify-content-center">
        <h2 class="subtitle">Une cérémonie sur l'eau</h2>
        <p class="lead text justi">{{ pageDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import image from '../assets/parcours.jpg';

export default {
  data() {
    return {
      image: image,
      pageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    };
  },
};
</script>

<style scoped>
.justi{
  text-align: justify;
}

.image-container {
  background-image: url('../assets/parcours.jpg');
  background-size: cover;
  background-position: center;
  min-height: 500px;
  width: 100%;
}
.row {
  min-height: 500px;
}
.subtitle {
  margin-bottom: 20px;
}
</style>