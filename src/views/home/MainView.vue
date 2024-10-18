<template>
  <div class="flex flex-col items-center">
    <div class="MainView flex items-center justify-center h-full">
      {{ greeting }}
      <!-- {{ hasToken }}
    {{ hasUser }} -->
      <template v-if="isLoggedIn">
        <!-- <div class="ml-1">{{ user.username }}</div> -->
        <div class="ml-1">{{ userData.username }}</div>
      </template>
      <template v-else>
        {{ guest }}
      </template>
      !
    </div>
    <template v-if="isLoggedIn">
      <div class="flex flex-col mt-10">
        <!-- <div class="">{{ name }} {{ userData.username }}</div> -->
        {{ token }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosInstance from "../../axios";

const greeting = "Hello,";
const guest = "Guest";
// const name = "Username = ";
// const hasToken = ref(localStorage.getItem("token") !== null);
// const hasUser = ref(localStorage.getItem("user") !== null);
const isLoggedIn = ref(localStorage.getItem("token") !== null);
// const user = JSON.parse(localStorage.getItem("user"));
const token = "token = " + localStorage.getItem("token");

const userData = ref({
  name: "",
  username: "",
});

const getData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axiosInstance.get("/auth/data-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    userData.value = {
      ...response.data,
    };
    console.log("Updated userData:", userData.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("user"));
  console.log(JSON.parse(localStorage.getItem("user")).username);

  getData();
});
</script>

<style></style>
