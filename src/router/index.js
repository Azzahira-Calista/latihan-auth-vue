import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from "../views/home/MainView.vue";

const routes = [
  {
    path: '/',
    name: 'main page',
    component: MainView,
  },
  {
    path: '/login',
    name: 'login page',
    component: () => import('../views/auth/LoginView.vue')  
  },
  {
    path: '/register',
    name: 'register page',
    component: () => import('../views/auth/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'profile page',
    component: () => import('../views/profile/ProfileView.vue')  
  },
  {
    path: '/edit-profile',
    name: 'edit profile page',
    component: () => import('../views/profile/EditProfileView.vue')  
  },
  {
   path: '/reset-password',
   name:  'reset password page',
   component: () => import('../views/passwords/ResetPasswordView.vue')
  },
  {
    path: '/email-reset-password',
    name:  'kirim email reset password page',
    component: () => import('../views/passwords/EmailResetPassword.vue')
   },
  {
    path: '/otp',
    name: 'otp page',
    component: () => import('../views/auth/OTPView.vue')
  },
  {
    path: '/otp-reset-password',
    name: 'otp reset password page',
    component: () => import('../views/passwords/OTPResetPassword.vue')
  },
  {
    path: '/change-password',
    name: 'change password page',
    component: () => import('../views/profile/ChangePassword.vue')
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await checkAuthentication();

  // Allow access to public routes such as login, register, main page, and OTP page
  if (to.name === 'login page' || to.name === 'register page' || to.name === 'main page' || to.name === 'otp page' || to.name === 'kirim email reset password page' || to.name === 'otp reset password page' || to.name === 'reset password page') {
    if (isAuthenticated && (to.name === 'login page' || to.name === 'register page')) {
      next({ name: 'main page' });
    } else {
      next();
    }
  } else {
    // For other routes, check if the user is authenticated
    if (!isAuthenticated && to.name !== 'login page') {
      next({ name: 'login page' });
    } else {
      next(); 
    }
  }
});

async function checkAuthentication() {
  const token = localStorage.getItem('token'); 

  if (token) {
    return true;
  }
  return false;
}

export default router;