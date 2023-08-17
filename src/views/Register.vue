<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
      </p>
      <h2>Create Your Firebog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName"/>
          <InlineSvg :src="user" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName"/>
          <InlineSvg :src="user" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username"/>
          <InlineSvg :src="user" class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email"/>
          <InlineSvg :src="envelop" class="icon"/>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password"/>
          <InlineSvg :src="lock" class="icon"/>
        </div>
        <div class="error" v-show="error">
          {{ this.errorMsg }}
        </div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/firebaseInit";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Register",
  data() {
    return {
      envelop: require('../assets/Icons/envelope-regular.svg'),
      lock: require('../assets/Icons/lock-alt-solid.svg'),
      user: require('../assets/Icons/user-alt-light.svg'),
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: '',
      errorMsg: '',
    }
  },
  methods: {
    async register() {
      if (this.email && this.password && this.username && this.firstName && this.lastName) {
        this.error = false;
        this.errorMsg = "";
        const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
        const result = await createUser;
        const docRef = doc(db, "users", result.user.uid);
        const database = await setDoc(docRef, {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });
        this.$router.push({ name: "Home" })
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields";
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
