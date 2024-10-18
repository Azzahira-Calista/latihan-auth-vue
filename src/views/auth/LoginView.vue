<!-- <template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex items-center space-x-72">
      <img
        v-if="showImage"
        :src="icons.img"
        alt="logo"
        style="width: 500px; height: auto"
      />
      <div class="flex flex-col items-center space-y-10">
        <div class="font-semibold w-48 text-center">
          {{ text.title }}<span class="text-secondary">{{ text.title2 }}</span>
        </div>
        <form @submit="handleLogin" class="formfield flex flex-col">
          <TextField
            v-model="email"
            placeholder="Enter your email or username"
            :iconUrl="icons.email"
          />
          <TextField
            type="password"
            v-model="password"
            placeholder="Enter your password"
            :iconUrl="icons.password"
          />
          <router-link to="/email-reset-password">
            <div class="text-primary mt-2">Forgot Password?</div>
          </router-link>
          <button
            type="submit"
            class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-10 p-2 rounded-2xl"
          >
            {{ text.button }}
          </button>
        </form>

        <div class="">
          {{ text.registerText
          }}<router-link to="/register" class="font-semibold ml-2">{{
            text.register
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import TextField from "@/components/global/TextField.vue";
import Swal from "sweetalert2";
import axiosInstance from "../axios";

const email = ref("");
const password = ref("");

const router = useRouter();
const isLoggedIn = ref(localStorage.getItem("token") !== null);

const text = {
  button: "Login",
  registerText: "Belum Memiliki Akun?",
  register: "Register",
  title: "Selamat Datang Kembali di Project",
  title2: "ku.",
};

const icons = {
  img: "https://svgshare.com/i/1BWf.svg",
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  genderMale: "https://svgshare.com/i/1BWg.svg",
  genderFemale: "https://svgshare.com/i/1BYn.svg",
  password: "https://svgshare.com/i/1BYx.svg",
};

const screenSize = ref(window.innerWidth);

const showImage = computed(() => {
  return screenSize.value >= 768;
});

window.addEventListener("resize", () => {
  screenSize.value = window.innerWidth;
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Email and password are required",
    });
  }

  try {
    const response = await axiosInstance.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    console.log("Login successful:", response.data);

    if (response.status === 200 && response.data && response.data.token) {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  router.push("/");
} else {
  Swal.fire({
    icon: "error",
    title: "Login failed",
    text: "No token received from the server",
  });
}

    Swal.fire({
      icon: "success",
      title: "Login successful",
      text: "You will be redirected to the dashboard",
    });

    router.push("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Please check your email and password",
    });
    console.error("Login failed:", error);
    console.error("Login failedddddd:", error.response ? error.response.data : error);

  }
};

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});
</script>

<style></style> -->

<template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex items-center space-x-72">
      <img
        v-if="showImage"
        :src="icons.img"
        alt="logo"
        style="width: 500px; height: auto"
      />
      <div class="flex flex-col items-center space-y-10">
        <div class="font-semibold w-48 text-center">
          {{ text.title }}<span class="text-secondary">{{ text.title2 }}</span>
        </div>
        <form @submit="handleLogin" class="formfield flex flex-col">
          <TextField
            v-model="email"
            placeholder="Enter your email or username"
            :iconUrl="icons.email"
          />

          <!-- Password input with visibility toggle -->
          <div class="relative">
            <TextField
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              :iconUrl="icons.password"
            />
            <!-- Eye icon button to toggle password visibility -->
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-3 flex items-center px-2"
            >
              <img
                :src="showPassword ? icons.eyeOpen : icons.eyeClosed"
                alt="toggle visibility"
                class="h-6 w-6"
              />
            </button>
          </div>

          <router-link to="/email-reset-password">
            <div class="text-primary mt-2">Forgot Password?</div>
          </router-link>

          <button
            type="submit"
            class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-10 p-2 rounded-2xl"
          >
            {{ text.button }}
          </button>
        </form>

        <div class="">
          {{ text.registerText
          }}<router-link to="/register" class="font-semibold ml-2">{{
            text.register
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import TextField from "@/components/global/TextField.vue";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";

const email = ref("");
const password = ref("");
const showPassword = ref(false); // Add a state to control password visibility

const router = useRouter();
const isLoggedIn = ref(localStorage.getItem("token") !== null);

const text = {
  button: "Login",
  registerText: "Belum Memiliki Akun?",
  register: "Register",
  title: "Selamat Datang Kembali di Project",
  title2: "ku.",
};

const icons = {
  img: "https://svgshare.com/i/1BWf.svg",
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  genderMale: "https://svgshare.com/i/1BWg.svg",
  genderFemale: "https://svgshare.com/i/1BYn.svg",
  password: "https://svgshare.com/i/1BYx.svg",
  eyeOpen: "https://svgshare.com/i/1Bc5.svg",
  eyeClosed: "https://svgshare.com/i/1Be1.svg",
};

const screenSize = ref(window.innerWidth);
const showImage = computed(() => screenSize.value >= 768);

window.addEventListener("resize", () => {
  screenSize.value = window.innerWidth;
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Email and password are required",
    });
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200 && response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/");
      Swal.fire({
        icon: "success",
        title: "Login successful",
        text: "You will be redirected to the dashboard",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "No token received from the server",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Please check your email and password",
    });
    console.error("Login failed:", error.response?.data || error);
  }
};

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});
</script>

<style></style>
