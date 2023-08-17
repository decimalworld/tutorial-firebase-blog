import blogCards from './modules/blog-cards';
import users from './modules/users';
import posts from './modules/posts';
import Vuex from 'vuex';

export default new Vuex.Store({
  modules: { 
    blogCards,
    users,
    posts,
  }
})
