<template>
  <div class="ml-[70px] w-72 lg:flex flex-col fixed xs:hidden">
    <div class="flex">
      <img
        class="w-[60px] h-[60px] border border-black rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxazzXBuYA1QspMPnqi7BlvoK8FASFVNRtmQ&usqp=CAU"
        alt="avatar"
      />
      <div class="ml-6">
        <h1 class="text-2xl text-white font-normal">Nika Kanashvili</h1>
        <p class="text-[#CED4DA]">Edit your profile</p>
      </div>
    </div>
    <div class="mt-10 px-3 flex items-center">
      <HouseIcon :color="feed ? '#fff' : '#E31221'" />
      <h1 class="ml-11 text-2xl text-white">News feed</h1>
    </div>
    <div class="mt-10 px-3 flex items-center">
      <CameraIcon :color="!feed ? '#fff' : '#E31221'" />
      <h1 class="ml-11 text-2xl text-white">List of movies</h1>
    </div>
  </div>
</template>

<script>
import HouseIcon from "./icons/HouseIcon.vue";
import CameraIcon from "./icons/CameraIcon.vue";
export default {
  components: { HouseIcon, CameraIcon },
  data() {
    return {
      feed: false,
    };
  },
};
</script>
