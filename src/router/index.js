import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home';
import Blogs from '../views/Blogs';
import Login from '../views/Login';
import Register from '../views/Register';
import Admin from '../views/Admin';
import Profile from '../views/Profile';
import CreatePost from '../views/CreatePost';
import BlogPreview from '../views/BlogPreview';
import ViewBlog from '../views/ViewBlog';
import EditBlog from '../views/EditBlog';
import ForgotPassword from '../views/ForgotPassword';
import { auth } from '../firebase/firebaseInit';
import { getIdTokenResult } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
    meta: {
      title: "Blogs",
      requiresAuth: false,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: "ForgotPassword",
      requiresAuth: false,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: "CreatePost",
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/blog-preview',
    name: 'BlogPreview',
    component: BlogPreview,
    meta: {
      title: 'BlogPreview',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  {
    path: '/view-blog/:blogId',
    name: 'ViewBlog',
    component: ViewBlog,
    meta: {
      title: 'ViewBlog',
      requiresAuth: false,
    }
  },
  {
    path: '/edit-blog/:blogId',
    name: 'EditBlog',
    component: EditBlog,
    meta: {
      title: 'EditBlog',
      requiresAuth: true,
      requiresAdmin: true,
    }
  },
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Firebog`;
  next();
})

router.beforeEach(async (to, from, next) => {
  let user = auth.currentUser;
  let admin = null;
  if (user) {
    let token = await getIdTokenResult(user);
    admin = token.claims.admin;
  };
  if (to.matched.some(res => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some(res => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" })
      }
      return next();
    }
    return next({ name: "Home" });
  } 
  return next();
})

export default router
