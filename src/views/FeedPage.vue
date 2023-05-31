<template>
  <div class="flex md:mt-8">
    <TheSidebar />
    <div class="mx-auto xs:w-full md:w-[938px]">
      <div class="flex">
        <button
          class="bg-[#24222F] text-white rounded-[10px] md:w-[216px] md:h-[52px] xs:w-full xs:h-[86px] text-xl font-normal flex items-center px-3"
        >
          <PencilIcon />
          Write new quote
        </button>
        <div
          class="ml-8 xs:hidden md:flex items-center h-[52px] border-b border-[#EFEFEF4D]"
        >
          <SearchIcon />
          <input
            class="w-[493px] h-[30px] bg-transparent text-white px-3"
            placeholder="Enter @ to search movies, Enter # to search quotes "
            type="text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import PencilIcon from "../components/icons/PencilIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
</script>
