<template>
  <div class="reset-password">
    <Modal v-show="modalActive" :modalMessage="modalMessage" @close-modal="closeModal"/>
    <Loading v-show="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to 
          <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link> 
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email"/>
            <InlineSvg :src="envelop" class="icon"/>
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import { auth } from '../firebase/firebaseInit';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: "ForgotPassword",
  components: {
    Modal,
    Loading,
  },
  data() {
    return {
      envelop: require('../assets/Icons/envelope-regular.svg'),
      modalActive: null,
      email: null,
      modalMessage: '',
      loading: null,
    }
  },
  methods: {
    resetPassword() {
      this.loading = true;
      sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.modalMessage= "If your account exists, you will receive a email";
        this.loading = false;
        this.modalActive = true;
      })
      .catch(err => {
        this.modalMessage = err.message;
        this.loading = false;
        this.modalActive = true;
      })
    },
    closeModal() {
      this.modalActive=false;
      this.email = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
