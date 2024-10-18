<template>
  <div :class="containerClass">
    <span :class="iconClass">
      <img v-if="iconUrl" :src="iconUrl" alt="icon" class="w-6 h-6" />
    </span>

    <input
      :readonly="readonly"
      :type="type"
      :placeholder="placeholder"
      :class="inputClass"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const internalValue = ref("");

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Enter your text here",
  },
  type: {
    type: String,
    default: "text",
  },
  containerClass: {
    type: String,
    default:
      "flex items-center xs:w-[20rem] w-[31rem] h-[3.75rem] mt-4 p-2 shadow-md  rounded-2xl",
  },
  iconClass: {
    type: String,
    default: "text-gray-500 p-2",
  },
  inputClass: {
    type: String,
    default: "flex-1 h-full p-2 border-none focus:outline-none",
  },
  iconUrl: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}

watch(
  () => props.modelValue,
  (newValue) => {
    // console.log("modelValue inside TextField:", newValue);
    internalValue.value = newValue;
  }
);
</script>

<style scoped></style>
