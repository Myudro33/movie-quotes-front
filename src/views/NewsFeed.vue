<template>
  <div class="flex">
    <button
      class="bg-[#24222F] text-white rounded-[10px] md:w-auto md:h-[52px] xs:w-full xs:h-[86px] text-xl font-normal flex items-center px-3"
    >
      <PencilIcon />
      {{ $t("feed.write_new_quote") }}
    </button>
    <div class="ml-8 xs:hidden md:flex items-center h-[52px] border-b border-[#EFEFEF4D]">
      <SearchIcon />
      <input
        class="w-[493px] h-[30px] bg-transparent text-white px-3"
        :placeholder="$t('feed.search_placeholder')"
        type="text"
      />
    </div>
  </div>
</template>
