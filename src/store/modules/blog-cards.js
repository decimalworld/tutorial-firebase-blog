import { db, storage } from '@/firebase/firebaseInit';
import { getDocs, collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const state = {
  blogCards: [],
  postLoaded: null,
  editPost: null,
}

const mutations = {
  setEditPost: (state, value) => {
    state.editPost = value;
  },
  setBlogCards: (state, blogs) => {
    state.blogCards = blogs
  },
  setPostLoaded: (state, value) => {
    state.postLoaded = value
  },
  deletePost: (state, id) => {
    state.blogCards = state.blogCards.filter(blog => blog.id !== id)
  }
}

const getters = {
  allBlogCards: state => state.blogCards,
  getEditPost: state => state.editPost,
  getPostLoaded: state => state.postLoaded,
  getBlogPostsFeed: state => state.blogCards.slice(0,2),
  getBlogPostsCard: state => state.blogCards.slice(2,6),
  getBlogCard: state => id => state.blogCards.filter(blog => blog.id === id),
}

const actions = {
  setEditPost({ commit }, value) {
    commit('setEditPost', value);
  },
  async fetchBlogCards({ commit }) {
    const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q);
    let blogs = []
    snapshot.forEach(doc => blogs.push({...doc.data(), id: doc.id}))
    commit('setBlogCards', blogs);
    commit('setPostLoaded', true);
  },
  async deletePost({ commit, getters }, id) {
    try {
      const blog = await getters.getBlogCard(id)[0];
      const filePath = blog.blogCoverPhoto
        .replace(new RegExp('https://firebasestorage.googleapis.com/v0/b/dial-in-2345.appspot.com/o/', 'g'), '')
        .replace(new RegExp('%2F','g'), '/')
        .replace(/(\?alt).*/g, '')
      const imageRef = ref(storage, filePath)
      
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'blogPosts', id));

      commit('deletePost', id);
    } catch(err) {
      console.log(err)
    }
  },
  async updatePost({ commit, dispatch }, id) {
    await dispatch("fetchBlogCards")
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
