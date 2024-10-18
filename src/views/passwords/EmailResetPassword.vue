<template>
  <div class="flex flex-col items-center justify-center h-full mt-10">
    <div class="flex items-center space-x-72">
      <div class="flex flex-col items-center space-y-10">
        <div class="font-semibold w-48 text-center">
          {{ title }}
        </div>
        <div class="formfield flex flex-col">
          <TextField
            type="email"
            v-model="email"
            placeholder="Masukan Email"
            :iconUrl="icons.email"
          />
        </div>
        <button
          @click="confirmEmail"
          class="flex bg-primary text-white font-semibold items-center justify-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 rounded-2xl"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TextField from "@/components/global/TextField.vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const button = "Kirim Email";
const title = "Masukan Email Untuk Reset Password";

const email = ref("");

const icons = {
  user: "https://svgshare.com/i/1BYm.svg",
  email: "https://svgshare.com/i/1BXN.svg",
  location: "https://svgshare.com/i/1BYc.svg",
  genderMale: "https://svgshare.com/i/1BWg.svg",
  genderFemale: "https://svgshare.com/i/1BYn.svg",
  password: "https://svgshare.com/i/1BYx.svg",
};

// async function sendEmail() {
//   if (!email.value) {
//     Swal.fire({
//       icon: "error",
//       title: "Failed",
//       text: "Email is required",
//     });
//   }

//   try {
//     const response = await axiosInstance.post("/auth/send-otp", {
//       email: email.value,
//     });

//     console.log(response.data); // Check what the response contains
//     // if (response.status === 200 && response.data) {
//     //   // Check if response.data has an email property
//     //   localStorage.setItem("email", response.data.email); // Save the email
//     //   router.push("/otp-reset-password");
//     //   console.log(email.value);
//     // }
//     if (response.data && response.data.email) {
//       localStorage.setItem("email", response.data.email);
//       router.push("/otp-reset-password");
//     } else {
//       console.error("Email not present in the response data");
//     }
//   } catch (error) {
//     console.error(error);
//     Swal.fire({
//       icon: "error",
//       title: "Gagal",
//       text: "Email tidak terdaftar: " + error.message,
//     });
//   }
// }

async function sendEmail() {
  if (!email.value) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Email is required",
    });
    return;
  }

  try {
    const response = await axiosInstance.post("/auth/send-otp", {
      email: email.value,
    });

    console.log(response.data);

    if (response.status === 200) {
      localStorage.setItem("email", email.value);
      setTimeout(() => router.push("/otp-reset-password"), 100);
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Email tidak terdaftar: " + error.message,
    });
  }
}

const confirmEmail = async () => {
  if (!email.value) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Email is required",
    });
  } else {
    Swal.fire({
      title: "Is the email correct?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Im not sure",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#E88A1B",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        sendEmail();
        Swal.fire({
          title: "Email Sent",
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
};
</script>

<style></style>
