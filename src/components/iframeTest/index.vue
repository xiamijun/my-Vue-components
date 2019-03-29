<!-- @format -->

<template>
  <div>
    <iframe :src="iframeSrc" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'previewFile',
  data() {
    return {
      iframeSrc:'../../static/previewFile.html'
    };
  }
};
</script>

<style scoped>
</style>
