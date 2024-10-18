<template>
  <div class="flex flex-col items-center space-y-4">
    <div class="title flex flex-col items-center">
      <div class="font-semibold">{{ title }}</div>
      <p class="text-gray-500">{{ subtitle }}</p>
    </div>

    <div class="flex space-x-2">
      <input
        v-for="(value, index) in otp"
        :key="index"
        type="text"
        maxlength="1"
        v-model="otp[index]"
        @input="moveToNext($event, index)"
        class="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
    </div>

    <button
      :disabled="!isOtpFilled"
      @click="verifyOtp"
      class="w-full max-w-xs bg-primary text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Verifikasi
    </button>

    <button
      @click="resendCode"
      :disabled="!canResend"
      class="w-full max-w-xs py-2 px-4 border border-primary rounded-md text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Resend Code {{ canResend ? "" : `in ${timerMinutes}:${timerSeconds}` }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const otp = ref(["", "", "", ""]);
const isOtpFilled = computed(() => otp.value.every((digit) => digit !== ""));

const title = "Masukkan Kode OTP";
const subtitle = "Kode akan dikirimkan melalui inbox email";

const canResend = ref(false);
const firstResendDone = ref(false); // To track if the first auto-resend has been done
const timer = ref(300);
let interval = null;
const email = ref(localStorage.getItem("email"));

const timerMinutes = computed(() =>
  String(Math.floor(timer.value / 60)).padStart(2, "0")
);
const timerSeconds = computed(() => String(timer.value % 60).padStart(2, "0"));

function moveToNext(event, index) {
  if (event.target.value.length === 1 && index < otp.value.length - 1) {
    event.target.nextElementSibling?.focus();
  }
}

async function verifyOtp() {
  console.log("Verifying OTP: ", otp.value.join(""));
  try {
    const response = await axiosInstance.post("/auth/verify-token", {
      email: email.value,
      otp: otp.value.join(""),
    });
    Swal.fire("OTP verified successfully!", "", "success");

    // console.log("OTP verified successfully:", response);
    // console.log("OTP wkkwk:", response.data);

    localStorage.setItem("reset_token", response.data.reset_token);

    router.push("/reset-password");

    // localStorage.removeItem("email");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Kode OTP tidak valid",
      text: error.response.data.message,
    });
  }
}
const sendOtp = async () => {
  try {
    const response = await axiosInstance.post("/auth/send-otp", {
      email: email.value,
    });
    console.log("OTP sent successfully:", response.data);
    Swal.fire("OTP sent successfully!", "", "success");
  } catch (error) {
    console.error("Error sending OTP:", error);
    Swal.fire("Error sending OTP", error.message, "error");
  }
};

function startResendTimer() {
  timer.value = 300;
  canResend.value = false;
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
      canResend.value = true;

      if (!firstResendDone.value) {
        firstResendDone.value = true;
      }
    }
  }, 1000);
}

function resendCode() {
  if (!firstResendDone.value) {
    console.log("First auto resend done...");
    startResendTimer();
    sendOtp();
  } else {
    if (canResend.value) {
      console.log("Manually resending code...");
      canResend.value = false;
      startResendTimer();
      sendOtp();
    }
  }
}

onMounted(() => {
  startResendTimer();

  console.log("Retrieved email from localStorage:", email.value);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style></style>
