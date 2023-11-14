<template>
  <div class="inter-image-container">
    <img src="../assets/inter.jpg" alt="Background" class="inter-img-fluid w-100 h-100">
    <div class="inter-overlay-text">
      <p>{{ description }}</p>
      <button class="inter-overlay-button">Cliquez ici</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    }
  }
}
</script>

<style scoped>
.inter-image-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.inter-img-fluid {
  object-fit: cover;
}

.inter-overlay-text {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 5px;
  max-width: 45%;
}

.inter-overlay-text p {
  color: white;
  font-size: 24px;
  margin: 0;
  text-align: justify;
}

.inter-overlay-button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #D8C17B;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.inter-overlay-button:hover {
  background-color: #a09860;
}
</style>
