<template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex items-center space-x-72">
      <div class="flex flex-col items-center space-y-10">
        <div class="font-semibold w-56 text-center">
          {{ title }}
        </div>
        <div class="formfield flex flex-col">
          <TextField
            type="password"
            v-model="old_password"
            placeholder="Masukan Passwrord Lama"
            :iconUrl="icons.password"
          />
          <TextField
            type="password"
            v-model="new_password"
            placeholder="Masukan Password Baru"
            :iconUrl="icons.password"
          />
        </div>
        <button
          @click="updatePassword"
          class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TextField from "@/components/global/TextField.vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const button = "Perbarui Password";
const title = "Masukan Password Lama Untuk Perbarui Password";

const old_password = ref("");
const new_password = ref("");

const icons = {
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  genderMale: "https://svgshare.com/i/1BWg.svg",
  genderFemale: "https://svgshare.com/i/1BYn.svg",
  password: "https://svgshare.com/i/1BYx.svg",
};

const updatePassword = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.post(
      "/auth/update-password",
      {
        old_password: old_password.value,
        new_password: new_password.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: response.data.message,
    });
    router.push("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response.data.message,
    });
  }
};

onMounted(() => {
  console.log("Change Password Page");
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("user"));
});
</script>

<style></style>
