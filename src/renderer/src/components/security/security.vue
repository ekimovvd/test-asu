<template>
  <div class="security">
    <Test
      :questions="security"
      :component="component"
      @question="handleQuestion"
      @update:component="handleComponent"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Test from "../test/test.vue";

export default defineComponent({
  name: "Security",
  components: {
    Test,
  },
  props: {
    security: {
      type: Array,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
  },
  emits: {
    securityQuestion: null,
    "update:component": null,
  },
  methods: {
    handleQuestion(question) {
      this.$emit("securityQuestion", question);
    },

    handleComponent(component) {
      this.$emit("update:component", component);
    }
  },
});
</script>