<template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex flex-col items-center space-y-10">
      <div class="font-semibold w-40 text-center">
        {{ title }}
      </div>
      <div class="formfield flex flex-col">
        <TextField
          placeholder="Enter your name"
          v-model="userData.name"
          :iconUrl="icons.user"
        />
        <TextField
          placeholder="Enter your username"
          v-model="userData.username"
          :iconUrl="icons.user"
        />
        <DropDown
          v-model="userData.gender"
          :options="genderOptions"
          :defaultOption="genderValue"
          @change="handleGenderSelect"
        />
        <TextField
          placeholder="Enter your location"
          v-model="userData.address"
          :iconUrl="icons.location"
        />
        <TextField
          placeholder="Enter your school name"
          v-model="userData.school_name"
          :iconUrl="icons.location"
        />
      </div>
      <button
        @click="updateData"
        class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
      >
        {{ button }}
      </button>
    </div>

    <!-- <button @click="tesEdit" class="w-10 h-10 bg-primary text-white mt-14">
      tes
    </button> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import TextField from "@/components/global/TextField.vue";
import DropDown from "../../components/global/DropDown.vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";

const button = "Simpan Perubahan";
const title = "Edit Profile";
const router = useRouter();

const userData = ref({
  name: "",
  username: "",
  email: "",
  gender: "",
  address: "",
  school_name: "",
});

const icons = {
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  genderMale: "https://svgshare.com/i/1BWg.svg",
  genderFemale: "https://svgshare.com/i/1BYn.svg",
  password: "https://svgshare.com/i/1BYx.svg",
};

const genderOptions = ref([{ text: "male" }, { text: "female" }]);

const handleGenderSelect = (selectedGender) => {
  userData.value.gender = selectedGender;
  console.log("Selected gender:", userData.value.gender);
};

const genderValue = computed(() => {
  return userData.value.gender !== "" ? userData.value.gender : "Not specified";
});

const screenSize = ref(window.innerWidth);

window.addEventListener("resize", () => {
  screenSize.value = window.innerWidth;
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

    console.log("API Response Gender:", response.data.gender);

    userData.value = {
      ...response.data,
      gender: response.data.gender || "Not specified",
    };
  } catch (error) {
    console.error(error);
  }
};

const updateData = async () => {
  if (
    !userData.value.name ||
    !userData.value.username ||
    !userData.value.address ||
    !userData.value.school_name
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all fields!",
    });
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/edit", userData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire("Profile updated successfully!", "", "success");
    router.push("/profile");
  } catch (error) {
    Swal.fire("Error updating profile", error.message, "error");
  }
};

// const tesEdit = () => {
//   console.log(userData.value);
// };

onMounted(() => {
  getData();
});
</script>

<style></style>
