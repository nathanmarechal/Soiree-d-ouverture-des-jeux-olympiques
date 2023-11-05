<template>
  <div class="container-fluid h-100">
    <div class="row h-100">

      <div class="col-lg-8 d-flex align-items-center justify-content-center">
        <div class="card">
          <div class="card-body">
            Contenu de la carte
          </div>
        </div>
      </div>
      <div class="col-lg-4 d-flex align-items-center justify-content-center mt-5">
        <p class="lead test">{{ pageDescription }}</p>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pageDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas suscipit sem eget dui blandit, eget ullamcorper odio interdum. Sed vel nunc ac sapien facilisis ultricies. Sed luctus nunc non dolor semper, non mattis felis bibendum. Nunc vitae ante eget tortor aliquet consectetur. Aliquam erat volutpat. Duis vel hendrerit lorem. Nullam aliquet felis eu nulla mattis, eget vehicula tortor ultricies. Aenean varius purus nec mauris tincidunt, non pharetra felis fringilla. Maecenas mattis consectetur mi, nec sollicitudin ipsum euismod a. Nullam in luctus nisl. Integer auctor, odio eget iaculis facilisis, lectus justo malesuada nisl, sed posuere metus neque nec nisi. Sed venenatis, libero in venenatis malesuada, nulla ligula aliquet nulla, vel consectetur tortor dolor nec justo. Vestibulum consequat elit ac tortor interdum, a consectetur sapien varius. Vivamus interdum, justo in tincidunt faucibus, urna ex viverra arcu, sit amet mattis libero turpis vel sapien"
    }
  }
}
</script>

<style>

</style>
