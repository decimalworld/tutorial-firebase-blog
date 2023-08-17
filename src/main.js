import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { VueEditor } from 'vue3-editor';
import InlineSvg from 'vue-inline-svg';

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    createApp(App)
    .component('VueEditor', VueEditor)
    .component('InlineSvg', InlineSvg)
    .use(store)
    .use(router)
    .mount('#app')
  }
})
