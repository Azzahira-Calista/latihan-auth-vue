<template>
  <div v-if="userData.name" class="flex flex-col items-center space-y-10 mt-10">
    <div class="font-semibold w-40 text-center">
      {{ title }}
    </div>
    <!-- <h1>{{ userData.username }}</h1>
      <h1>{{ userData.name }}</h1>
      <h1>{{ userData.address }}</h1>
      <h1>{{ userData.email }}</h1>
      <h1>{{ userData.gender }}null</h1>
      <h1>{{ userData.school_name }} </h1> -->

    <div class="formfield flex flex-col">
      <TextField
        placeholder="Enter your name"
        v-model="userData.name"
        :iconUrl="icons.user"
        :readonly="true"
      />

      <TextField
        placeholder="Enter your username"
        v-model="userData.username"
        :iconUrl="icons.user"
        :readonly="true"
      />
      <TextField
        type="email"
        placeholder="Enter your email"
        v-model="userData.email"
        :iconUrl="icons.email"
        :readonly="true"
      />

      <TextField
        placeholder="Enter your Gender"
        v-model="userData.gender"
        :iconUrl="icons.gender"
        :readonly="true"
      />
      <TextField
        placeholder="Enter your location"
        v-model="userData.address"
        :iconUrl="icons.location"
        :readonly="true"
      />
      <TextField
        placeholder="Enter your school name"
        v-model="userData.school_name"
        :iconUrl="icons.location"
        :readonly="true"
      />
    </div>
    <div class="buttons">
      <router-link
        to="/edit-profile"
        class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
      >
        {{ button }}
      </router-link>

      <div class="mt-36">
        <router-link
          to="/change-password"
          class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
        >
          {{ button_change_password }}
        </router-link>

        <button
          @click="confirmDeleteAcc"
          class="flex bg-red-500 text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
        >
          {{ button_delete }}
        </button>
      </div>
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TextField from "../../components/global/TextField.vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";

const router = useRouter();
const button = "Edit Profile";
const title = "Profile";
const button_delete = "Delete Account";
const button_change_password = "Change Password";

const userData = ref({
  name: "",
  username: "",
  email: "",
  gender: "",
  address: "",
});

//   const gender = userData.gender ? userData.gender : 'Not specified';

const icons = {
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  gender: "https://svgshare.com/i/1BY6.svg",
};

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

    console.log("API Response:", response.data);

    // Force reactivity by creating a new object
    userData.value = { ...response.data };
    console.log("Updated userData:", userData.value);
  } catch (error) {
    console.error(error);
  }
};

async function deleteAcc() {
  const token = localStorage.getItem("token");
  // const token = response.data.token;

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    // const response = await axiosInstance.post("/auth/delete", {

    //   Authorization: `Bearer ${token}`,
    // });

    const response = await axiosInstance.post(
      "/auth/delete",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response:", response.data);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    userData.value = { ...response.data };
    console.log("Updated userData:", userData.value);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: "Failed to delete account, please try again",
    });
  }

  router.push("/");
}

const confirmDeleteAcc = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAcc();
      Swal.fire("Deleted!", "Your account has been deleted.", "success");
    } else {
      Swal.fire("Cancelled", "Your account is safe :)", "error");
    }
  });
};

onMounted(() => {
  getData();
  console.log(localStorage.getItem("token"));
});
</script>

<style></style>
