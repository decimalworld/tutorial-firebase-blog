<template>
  <div class="blog-wrapper no-user">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.blogTitle }}</h2>
        <p v-if="post.welcomeScreen">{{  post.blogPost }}</p>
        <p v-else class="content-preview" v-html="post.blogHTML"></p>
        <router-link v-if="post.welcomeScreen" class="link link-light" to="/">
          Login/Register<InlineSvg :src="arrow" class="arrow arrow-light" />
        </router-link>
        <router-link v-else class="link" :to="{ name: 'ViewBlog', params: { blogId: post.id }}">
          View The Post<InlineSvg :src="arrow" class="arrow"/>
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt=""/>
      <img v-else :src="post.blogCoverPhoto" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  data(){
    return {
      arrow: require('../assets/Icons/arrow-right-light.svg')
    };
  },
  props: {
    post: Object
  }
}
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media(min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media(min-width: 700px) {
      order: 1;
    };
    @media(min-width: 800px) {
      flex: 3;
    };
    div {
      max-width: 375px;
      padding: 72px 24px;
      @media(min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        @media(min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 3000;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        widtH: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media(min-width: 700px) {
      order: 2;
    };

    @media(min-width: 700px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #333;
    color: #fff;
  }
}
</style>
