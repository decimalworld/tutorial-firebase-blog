<template>
  <div class="blog-card">
    <div v-show="editPost" class="icons">
      <div class="icon" @click="EditBlog">
        <InlineSvg class="edit" :src="edit"/>
      </div>
      <div class="icon" @click="deletePost(post.id)">
        <InlineSvg class="delete" :src="delete"/>
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="" class="image">
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{ new Date(post.date).toLocaleString('en-us', { dateStyle: "long" }) }}</h6>
      <router-link class="link" :to="{ name: 'ViewBlog', params: { blogId: this.post.id}}">
        View the Post <InlineSvg :src="arrow" class="arrow"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "blogCard",
  props: ["post"],
  data() {
    return {
      arrow: require("../assets/Icons/arrow-right-light.svg"),
      edit: require("../assets/Icons/edit-regular.svg"),
      delete: require("../assets/Icons/trash-regular.svg"),
    }
  },
  computed: {
    editPost() { return this.getEditPost() }
  },
  methods: {
    ...mapActions(["deletePost"]),
    ...mapGetters(["getEditPost"]),
    EditBlog() {
      this.$router.push({ name: 'EditBlog', params: { blogId: this.post.id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-card{
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  height: 420px;
  transition: .5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: .5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  };

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  };

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    };

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    };

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: .5s ease all;
    };

    &:hover {
      color: rgba(48, 48, 48, 0.8);
    };

    .arrow {
      width: 10px;
    };
  }
}
</style>
