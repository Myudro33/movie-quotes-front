<template>
  <div v-for="(image, index) in images" :key="index" :class="image.class">
    <div class="flex absolute top-1/2 xs:left-6 md:left-24">
      <hr class="xs:w-4 md:w-14 border-2 border-white xs:m-2 md:m-8" />
      <div class="flex flex-col">
        <h1 v-html="image.text1" class="font-bold xs:text-[20px] md:text-[50px]"></h1>
        <h1 class="font-bold md:text-[30px] xs:mt-2">{{ image.text2 }}</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 90vh;
  color: #ffffff;
  position: relative;
  background-color: grey;
  background-blend-mode: multiply;
}
.parallax1 {
  background-image: url('../assets/landing/landing-image-1.png');
}
.parallax2 {
  background-image: url('../assets/landing/landing-image-2.png');
}
.parallax3 {
  background-image: url('../assets/landing/landing-image-3.png');
}
</style>
<script setup>
const images = [
  {
    class: 'parallax parallax1',
    text1: `“You have to leave somethig <br/>
behind to go forward”`,
    text2: 'Interstellar, 2014'
  },
  {
    class: 'parallax parallax2',
    text1: `“I think we’re just gonna have <br/>
to be secretly in love with earch other <br/>
and leave it that”`,
    text2: 'The Royal Tenenbaums,2001 '
  },
  {
    class: 'parallax parallax3',
    text1: `“I think we’re just gonna have <br />
            to be secretly in love with earch other <br />
            and leave it that”`,
    text2: 'The Royal Tenenbaums,2001'
  }
]
</script>
