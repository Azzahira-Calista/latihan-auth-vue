<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/global/NavBar.vue";
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
}
</style>
