<template>
  <div class="introduction">
    <h1 class="introduction__title">
      Аудит АСУ на соответствие требованиям информационной безопасности.
    </h1>

    <div class="introduction__tests">
      <button
        class="introduction__test"
        v-for="test in tests"
        :key="test.id"
        @click="handleTest(test)"
      >
        <h4 class="introduction__test-title">
          {{ test.title }}
        </h4>

        <p class="introduction__test-label">
          {{ test.label }}
        </p>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { COMPONENT } from "../../App.vue";

export default defineComponent({
  name: "introduction",
  props: {
    component: {
      type: String,
      required: true,
    },
    tests: {
      type: Array,
      required: true,
    },
    test: {
      type: Object,
      required: true,
    },
  },
  emits: {
    "update:component": null,
    "update:test": null,
  },
  methods: {
    handleTest(test) {
      this.$emit("update:test", test);

      switch (test.id) {
        case 0:
          this.$emit("update:component", COMPONENT.test);

          break;
        case 1:
          this.$emit("update:component", COMPONENT.security);

          break;
        default:
          break;
      }
    },
  },
});
</script>

<style>
.introduction {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 50px;
}

.introduction__title {
  font-size: 56px;
  line-height: 60px;
  margin-bottom: 54px;
  color: rgb(60, 60, 67);
}

.introduction__tests {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
}

.introduction__test {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  font-family: "Roboto", sans-serif;
  background: #f6f6f7;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 24px;
  border-radius: 12px;
}

.introduction__test-title {
  font-size: 20px;
  line-height: 24px;
  color: rgb(60, 60, 67);
}

.introduction__test-label {
  font-size: 18px;
  line-height: 22px;
  color: rgba(60, 60, 67, .78);
  text-align: justify;
}
</style>