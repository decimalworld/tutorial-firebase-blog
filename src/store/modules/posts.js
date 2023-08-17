const state = {
  blogHTML: "Write your blog title here...",
  blogTitle: "",
  blogPhotoName: "",
  blogPhotoFileURL: null,
  blogPhotoPreview: null,
}

const mutations = {
  setBlogTitle: (state, title) => state.blogTitle = title,
  setBlogHTML: (state, html) => state.blogHTML = html,
  fileNameChange: (state, fileName) => state.blogPhotoName = fileName,
  createFileURL: (state, file) => state.blogPhotoFileURL = file,
  togglePhotoPreview: (state) => state.blogPhotoPreview = !state.blogPhotoPreview,
  clearCreatePost: (state) => {
    state.blogHTML = "Write your blog title here..."
    state.blogTitle = ""
    state.blogPhotoName = ""
    state.blogPhotoFileURL = null
    state.blogPhotoPreview = null
  },
  setBlogState: (state, blog) => {
    state.blogHTML = blog.blogHTML;
    state.blogTitle = blog.blogTitle;
    state.blogPhotoFileURL = blog.blogCoverPhoto;
    state.blogPhotoName = blog.blogCoverPhotoName;
  }
}

const getters = {
  getBlogPhotoName: (state) => state.blogPhotoName,
  getBlogPhotoFileURL: (state) => state.blogPhotoFileURL,
  getBlogPhotoPreview: (state) => state.blogPhotoPreview,
  getBlogTitle: (state) => state.blogTitle,
  getBlogHTML: (state) => state.blogHTML,
}

const actions = {
  setBlogTitle: ({ commit }, title) => commit('setBlogTitle', title),
  setBlogHTML: ({ commit }, html) => commit('setBlogHTML', html),
  fileNameChange: ({ commit }, fileName) => commit('fileNameChange', fileName),
  createFileURL: ({ commit }, file) => commit('createFileURL', file),
  togglePhotoPreview: ({ commit }) => commit('togglePhotoPreview'),
  clearCreatePost: ({ commit }) => commit('clearCreatePost'),    
}

export default {
  state,
  mutations,
  getters,
  actions,
}
