<template>
<div class="post-view" v-if="this.$store.getters.getPostLoaded">
  <div class="container quillWrapper">
    <h2>{{ currentBlog.blogTitle }}</h2>
    <h4>Posted on: {{ new Date(currentBlog.date).toLocaleString(en-us, { dateStyle: "long" }) }}</h4>
    <img :src="currentBlog.blogCoverPhoto" alt="" />
    <div class="post-content ql-editor" v-html="currentBlog.blogHTML"></div>
  </div> 
</div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: {
        blogTitle: null,
        date: null,
        blogCoverPhoto: null,
        blogHTML: null
      },
    }
  },
  async mounted() {
    const blogId = this.$route.params.blogId;
    this.currentBlog = this.$store.getters.allBlogCards.filter(blog => blog.id === blogId)[0];
  }
}
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
