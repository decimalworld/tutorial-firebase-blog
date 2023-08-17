<template>
<div class="post-view">
  <div class="container quillWrapper">
    <h2>{{ getBlogTitle }}</h2>
    <img :src="getBlogPhotoFileURL" alt="" />
    <div class="post-content ql-editor" v-html="getBlogHTML"></div>
  </div> 
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "BlogPreview",
  computed: {
    ...mapGetters([
      'getBlogTitle', 
      'getBlogPhotoFileURL', 
      'getBlogHTML'
    ])
  }
};
</script>

<style lang="scss" scoped>
.post-view {
  min-height: 100%;
  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }
  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }
  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
