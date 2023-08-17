<template>
  <div class="home">
    <BlogPost v-show="!getUser" :post="welcomeScreen"/>
    <BlogPost v-for="(post, index) in getBlogPostsFeed" :key="index" :post="post"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="post in getBlogPostsCard" :post="post" :key="post.id"/>
        </div>
      </div>
    </div>
    <div v-show="!getUser" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for Firebog <InlineSvg :src="arrow" class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost';
import BlogCard from '../components/BlogCard';
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      arrow: require('../assets/Icons/arrow-right-light.svg'),
      welcomeScreen: {
        id: '1',
        title: "Welcome!",
        blogPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post",
        welcomeScreen: true,
        photo: "coding"
      },
    }
  },
  computed: {
    ...mapGetters(['allBlogCards', 'getUser', 'getBlogPostsCard', 'getBlogPostsFeed'])
  }
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    };
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media(min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style> 
