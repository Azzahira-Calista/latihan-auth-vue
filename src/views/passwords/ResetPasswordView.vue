<template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex items-center space-x-72">
      <div class="flex flex-col items-center space-y-10">
        <div class="font-semibold w-48 text-center">
          {{ title }}<span class="text-secondary">{{ title2 }}</span>
        </div>
        <div class="formfield flex flex-col">
          <TextField
            type="password"
            v-model="password"
            placeholder="Enter your password"
            :iconUrl="icons.password"
          />
          <TextField
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            :iconUrl="icons.password"
          />
        </div>
        <button
          class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
          @click="resetPassword"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextField from "@/components/global/TextField.vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const password = ref("");
const confirmPassword = ref("");
const reset_token = localStorage.getItem("reset_token");
const email = localStorage.getItem("email");

const button = "Reset Password";
const title = "Reset Password Untuk Akses Project";
const title2 = "ku.";

const icons = {
  password: "https://svgshare.com/i/1BYx.svg",
};

const resetPassword = async () => {
  if (!password.value || !confirmPassword.value) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Password is required",
    });
    return;
  }

  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Password and Confirm Password must be the same",
    });
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      token: reset_token,
      email: email,
      password: password.value,
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password has been reset",
      });
      localStorage.removeItem("email");
      localStorage.removeItem("reset_token");

      router.push("/login");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.response?.data?.message || "An error occurred",
    });
  }
};
</script>

<style></style>
