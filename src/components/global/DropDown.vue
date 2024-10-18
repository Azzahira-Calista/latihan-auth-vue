<template>
  <div class="relative w-full">
    <button
      type="button"
      class="flex items-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 shadow-md rounded-2xl focus:outline-none"
      @click="toggleDropdown"
    >
      <img :src="icon" class="ml-2 mr-3 h-8 w-8" />
      <p>{{ selected }}</p>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full left-0 w-full bg-white shadow-md mt-1 rounded z-30"
    >
      <ul class="text-left border rounded">
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="px-4 py-1 hover:bg-gray-100 border-b cursor-pointer"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props for options, default option, and icon
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "Select an option",
  },
  icon: {
    type: String,
    default: "https://svgshare.com/i/1BY6.svg",
  },
});

// Emit event
const emit = defineEmits(["update:modelValue"]);

// Control dropdown state and selected value
const isOpen = ref(false);
const selected = ref(props.modelValue);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select option and emit value update
const selectOption = (option) => {
  selected.value = option.text;
  isOpen.value = false;
  emit("update:modelValue", option.text); // Emit to update v-model
};

// Watch for changes to modelValue from parent
watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>

<style></style>
