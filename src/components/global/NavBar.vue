<template>
  <div
    class="flex flex-row items-center justify-between poppins-regular font-semibold mx-6 my-3"
  >
    <div class="flex space-x-2 flex-row items-center weight">
      <img :src="icons.logo" alt="logo" style="width: 40px; height: auto" />
      <router-link to="/"
        >{{ item.title
        }}<span class="text-secondary">{{ item.title2 }}</span></router-link
      >
    </div>
    <div>
      <template v-if="isLoggedIn">
        <template v-if="isProfileRoute">
          <button
            @click="confirmLogout"
            class="flex items-center text-red-500"
            text
          >
            <img class="mr-2" :src="icons.logout" alt="" />
            Logout
          </button>
        </template>
        <template v-else>
          <router-link to="/profile">Profile</router-link>
        </template>
      </template>
      <template v-else>
        <template v-if="isAuthRoute"> </template>
        <template v-else>
          <router-link to="/login">Sign In / Sign Up</router-link>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";

// Reactive variable to track login status based on token presence
const isLoggedIn = ref(localStorage.getItem("token") !== null);

// Check if the token exists and update `isLoggedIn`
function checkLoginStatus() {
  isLoggedIn.value = localStorage.getItem("token") !== null;
}

// Initialize the reactive variables and data
const item = {
  title: "Project",
  title2: "ku.",
};
const icons = {
  logo: "https://svgshare.com/i/1BWs.svg",
  logout: "https://svgshare.com/i/1BZw.svg",
};

// Get the current route
const router = useRouter();
const route = useRoute();

// Reactive flags to track the current route
const isProfileRoute = ref(route.path === "/profile");
const isAuthRoute = ref(
  route.path === "/login" ||
    route.path === "/register" ||
    route.path === "/email-reset-password" ||
    route.path === "/reset-password" ||
    route.path === "/otp" ||
    route.path === "/otp-reset-password"
);

// Watch for route changes to update route-based flags
watch(
  () => route.path,
  (newPath) => {
    isProfileRoute.value = newPath === "/profile";
    isAuthRoute.value =
      newPath === "/login" ||
      newPath === "/register" ||
      newPath === "/email-reset-password" ||
      newPath === "/reset-password" ||
      newPath === "/otp" ||
      newPath === "/otp-reset-password";
  }
);

// Logout function to clear token and user data from localStorage
async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  const token = localStorage.getItem("token");

  try {
    await axiosInstance.post("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Logout failed",
    //   text: "Failed to logout. Please try again!",
    // });
  }

  checkLoginStatus();
  router.push("/");
}

// Show confirmation dialog for logging out
function confirmLogout() {
  Swal.fire({
    title: "Apakah anda yakin ingin keluar?",
    text: "Anda akan keluar dari akun ini!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Batal",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#E88A1B",
    confirmButtonText: "Iya, Keluarkan saya!",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
      Swal.fire({
        title: "Keluar!",
        text: "Anda telah keluar dari akun ini. Terima kasih telah menggunakan layanan kami!",
        icon: "success",
        confirmButtonColor: "#E88A1B",
      });
    } else {
      Swal.fire({
        title: "Batal",
        text: "Anda telah membatalkan keluar dari akun ini!",
        icon: "error",
        confirmButtonColor: "#E88A1B",
      });
    }
  });
}

onMounted(() => {
  checkLoginStatus();
});
</script>
