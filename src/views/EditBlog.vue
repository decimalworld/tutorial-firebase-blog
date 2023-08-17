<template>
  <div class="create-post">
    <BlogCoverPreview v-show="getBlogPhotoPreview()"/>
    <Loading v-show="loading"/>
    <div class="container">
      <div class="err-message" :class="{'invisible': !error}">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" @change="fileChange"/>
          <button class="preview" :class="{ 'button-inactive' : !getBlogPhotoFileURL }" @click.prevent="openPreview">Preview Photo</button>
          <span>File Chosen: {{ getBlogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <VueEditor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Preview Changes</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import Loading from '../components/Loading';
import BlogCoverPreview from '../components/BlogCoverPreview';
import { mapGetters, mapActions } from 'vuex';
import { db, storage } from '../firebase/firebaseInit';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'CreatePost',
  components: {
    Loading,
    BlogCoverPreview
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      routeID: null,
      currentBlog: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        }
      }
    }
  },
  async mounted() {
    this.routeID = this.$route.params.blogId;
    this.currentBlog =  await this.$store.getters.getBlogCard(this.routeID)
    this.$store.commit('setBlogState', this.currentBlog[0]);
  },
  methods: {
    ...mapGetters(['getBlogTitle', 'getBlogHTML', 'getBlogPhotoPreview', 'getBlogPhotoFileURL']),
    ...mapActions(['setBlogTitle', 'setBlogHTML', 'clearCreatePost', 'fetchBlogCards']),
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.dispatch("fileNameChange", fileName);
      this.$store.dispatch("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.dispatch('togglePhotoPreview')
    },
    async imageHandler(file, Editor, cursorLocation, resetUploader) {
      const childName = `documents/blogPostPhotos/${file.name}`;
      const storageRef = ref(storage, childName);
      try {
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef);
        Editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader()
      } catch (err) {
        console.log(err)
      }
    },
    async updateBlog() {
      const document = doc(db, 'blogPosts', this.routeID);
      if (this.blogTitle.length != 0 && this.blogHTML.length != 0) {
        if (this.file) {
          this.loading = true;
          const docRef = ref(storage, `documents/BlogCoverPhotos/${this.getBlogPhotoFileURL}`)
          try {
            const snapshot = await uploadBytes(docRef, this.file);
            const downloadURL = await getDownloadURL(docRef);
            const result = await updateDoc(
              document,
              {
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.getBlogPhotoName,
                blogTitle: this.blogTitle,
              }
            )
            await this.$store.dispatch('updatePost', this.routeID)
            this.clearCreatePost();
            this.$router.push({ name: 'ViewBlog', params: { blogId: document.id } });
          } catch(err) {
            //
            console.log(err);
          } finally {
            this.loading = false
          };
          return;
        }
        this.loading = true;
        await updateDoc(document, {
          blogHTML: this.blogHTML,
          blogTitle: this.blogTitle,
        });
        await this.$store.dispatch('updatePost', this.routeID)
        this.loading = false;
        this.$router.push({name: "ViewBlog", params: { blogId: document.id }})
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }
  },
  computed: {
    ...mapGetters([
      'getBlogPhotoName', 
      'getBlogPhotoFileURL', 
      'getProfileId'
    ]),
    blogTitle: {
      get() { return this.getBlogTitle() },
      set(title) { this.setBlogTitle(title) }
    },
    blogHTML: {
      get() { return this.getBlogHTML() },
      set(title) { this.setBlogHTML(title) }
    }
  }
}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: .5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    background-color: #303030;
    margin-bottom: 10px;
    opacity: 1;
    transition: .5s ease all;

    p {
      font-size: 14px;
    };

    span {
      font-weight: 600;
    };
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: .5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus{
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;

    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
