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
        <div class="font-semibold w-40 text-center">
          {{ texts.title
          }}<span class="text-secondary">{{ texts.title2 }}</span>
        </div>
        <form @submit.prevent="handleRegister" class="formfield flex flex-col">
          <TextField
            v-model="userData.name"
            placeholder="Enter your name"
            :iconUrl="icons.user"
          />
          <TextField
            v-model="userData.username"
            placeholder="Enter your username"
            :iconUrl="icons.user"
          />
          <TextField
            v-model="userData.email"
            type="email"
            placeholder="Enter your email"
            :iconUrl="icons.email"
          />
          <DropDown
            v-model="userData.gender"
            :options="genderOptions"
            :defaultOption="genderOptions[0].text"
            @select="handleGenderSelect"
          />

          <TextField
            v-model="userData.school_name"
            placeholder="Enter your school name"
            :iconUrl="icons.location"
          />
          <TextField
            v-model="userData.location"
            placeholder="Enter your location"
            :iconUrl="icons.location"
          />
          <TextField
            type="password"
            v-model="userData.password"
            placeholder="Enter your password"
            :iconUrl="icons.password"
          />
          <TextField
            type="password"
            v-model="userData.confirmPassword"
            placeholder="Confirm your password"
            :iconUrl="icons.password"
          />
          <button
            type="submit"
            class="flex mt-10 bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] p-2 rounded-2xl"
          >
            {{ texts.button }}
          </button>
        </form>

        <div>
          {{ texts.loginText }}
          <router-link to="" class="font-semibold ml-2">
            {{ texts.login }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import TextField from "@/components/global/TextField.vue";
import DropDown from "../../components/global/DropDown.vue";

const userData = ref({
  name: "",
  username: "",
  location: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  school_name: "",
});

const router = useRouter();

const texts = {
  button: "Register",
  loginText: "Sudah Memiliki Akun?",
  login: "Login",
  title: "Selamat Datang di Project",
  title2: "ku.",
};

const icons = {
  img: "https://svgshare.com/i/1BXa.svg",
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  password: "https://svgshare.com/i/1BYx.svg",
};

const genderOptions = ref([{ text: "male" }, { text: "female" }]);

const handleGenderSelect = (selectedGender) => {
  userData.value.gender = selectedGender.text;
  console.log("Selected gender:", userData.value.gender);
};

const screenSize = ref(window.innerWidth);

const showImage = computed(() => {
  return screenSize.value >= 768;
});

const handleRegister = async () => {
  if (
    !userData.value.name ||
    !userData.value.username ||
    !userData.value.email ||
    !userData.value.password ||
    !userData.value.confirmPassword ||
    !userData.value.location ||
    !userData.value.school_name
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required!",
    });
    return;
  }

  if (userData.value.password !== userData.value.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password and confirm password must be the same!",
    });
    return;
  }

  const registrationData = {
    name: userData.value.name,
    username: userData.value.username,
    email: userData.value.email,
    gender: userData.value.gender,
    address: userData.value.location,
    school_name: userData.value.school_name,
    password: userData.value.password,
  };

  try {
    const response = await axiosInstance.post(
      "auth/register",
      registrationData
    );

    console.log("Registration successful:", response.data);

    localStorage.setItem("username", userData.value.username);
    localStorage.setItem("email", userData.value.email);

    const otpRequestData = { email: userData.value.email };
    await axiosInstance.post("auth/send-otp", otpRequestData);

    console.log("OTP sent to email:", userData.value.email);

    router.push("/otp");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error.response?.data?.message ||
        "Something went wrong while registering!",
    });
  }
};

window.addEventListener("resize", () => {
  screenSize.value = window.innerWidth;
});
</script>

<style></style>
