<template>
  <div>
    <header>
      <nav class="container">
        <div class="branding">
          <router-link class="header" :to="{ name: 'Home' }">Firebog</router-link>
        </div>
        <div class="nav-links">
          <ul v-show="!mobile">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
            <router-link class="link" :to="{ name: 'CreatePost'}" v-if="getProfileAdmin">Create Post</router-link>
            <router-link class="link" :to="{ name: 'Login' }" v-show="!getUser">Login/Register</router-link>
          </ul>
          <div class="profile" ref="profile" @click="toggleProfileMenu" v-show="getUser && !mobile">
            <span>{{ getUserInitials() }}</span>
            <div class="profile-menu" v-show="profileMenu">
              <div class="info">
                <p class="initials">{{ getUserInitials() }}</p>
                <div class="right">
                  <p class="right-info">{{ getUserFirstName() }} {{ getUserLastName() }}</p>
                  <p class="right-info">{{ getUserUsername() }}</p>
                  <p class="right-info">{{ getUserEmail() }}</p>
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <router-link :to="{ name: 'Profile' }" class="option">
                    <InlineSvg class="icon" :src="userIcon"/>
                    <p>Profile</p>
                  </router-link>
                </div>
                <div class="option">
                  <router-link :to="{ name: 'Admin' }" class="option" v-if="getProfileAdmin">
                    <InlineSvg class="icon" :src="adminIcon"/>
                    <p>Admin</p>
                  </router-link>
                </div>
                <div class="option" @click="signOut">
                  <InlineSvg class="icon" :src="signOutIcon"/>
                  <p>Sign out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <InlineSvg 
        @click="toggleMobileNav" 
        v-show="mobile"
        class="menu-icon" 
        :src="require('../assets/Icons/bars-regular.svg')"
      />
      <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
            <router-link class="link" :to="{ name: 'CreatePost'}" v-if="getProfileAdmin">Create Post</router-link>
            <router-link class="link" :to="{ name: 'Login' }" v-show="!getUser">Login/Register</router-link>
          </ul>
      </transition>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '../firebase/firebaseInit';
import { signOut } from 'firebase/auth';

export default {
  name: "Navigation",
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
      userIcon: require("../assets/Icons/user-alt-light.svg"),
      adminIcon: require("../assets/Icons/user-crown-light.svg"),
      signOutIcon: require("../assets/Icons/sign-out-alt-regular.svg"),
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return
    },

    toggleMobileNav () {
      this.mobileNav = !this.mobileNav;
    },

    toggleProfileMenu (event) {
      if (event.target === this.$refs.profile){
        this.profileMenu = !this.profileMenu;
      }
    },

    signOut () {
      signOut(auth);
      window.location.reload();
    },

    ...mapGetters([
      'getUserInitials', 
      'getUserFirstName',
      'getUserLastName',
      'getUserUsername',
      'getUserEmail',
    ]),
  },
  computed: {
    ...mapGetters(['getUser', 'getProfileAdmin'])
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 99;
}
.link {
  font-weight: 500;
  padding: 0 8px;
  transition: .3s color ease;

  &:hover {
    color: #1eb8b8;
  }
}
nav {
  display: flex;
  padding: 25px 0;

  .branding {
    display: flex;
    align-items: center;

    .header{
      font-weight: 600;
      font-size: 24px;
      color: black;
      text-decoration: none;
    }
  }

  .nav-links {
    position: relative;
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: flex-end;

    ul {
      margin-right: 32px;

      .link {
        margin-right: 32px;
      }

      .link:last-child {
        margin-right: 0
      }
    }

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      background-color: #303030;

      span {
        pointer-events: none;
      }

      .profile-menu {
        position: absolute;
        top: 60px;
        right: 0;
        width: 250px;
        background-color: #303030;
        box-shadow: 0 4px 6px -1px rbga(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .info {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #fff;

          .initials {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #303030;
            background-color: #fff;
          }

          .right {
            flex: 1;
            margin-left: 24px;
            width: 150px;

            p:nth-child(1) {
              font-size: 14px;
            }

            p:nth-child(2),
            p:nth-child(3) {
              font-size: 12px;
            }

            p:nth-child(n) {
              overflow: hidden
            }
          }
        }

        .options {
          padding: 15px;
          .option {
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .icon {
              width: 18px;
              height: auto;
            }

            p {
              font-size: 14px;
              margin-left: 12px;
            }

            &:last-child{
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
}
.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0;
    color: #fff;
  }

}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
