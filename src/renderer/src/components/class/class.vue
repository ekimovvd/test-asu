<template>
  <div class="class">
    <h1 class="class__title">
      Класс защищенности автоматизированной системы управления
    </h1>

    <p class="class__label">
      {{ displayedClass }}
    </p>

    <button class="class__button" :class="displayedButtonClass" @click="handleButton">
      {{ displayedButtonLabel }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { COMPONENT } from "../../App.vue";
import { TESTS, CLASS_NAME } from "../../static/data";

export default defineComponent({
  name: "Class",
  props: {
    security: {
      type: Array,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    tests: {
      type: Array,
      required: true,
    },
  },
  emits: {
    "update:component": null,
    "update:tests": null,
  },
  computed: {
    class() {
      return this.security.find((item) => item.answer === true);
    },

    displayedClass() {
      return this.class ?
        `Ваша АСУ согласно приказу ФСТЭК от 14 марта 2014 г. №31 соответствует ${CLASS_NAME[this.class.class]} классу защищенности.`
        : "Ваша АСУ не соответствует минимальному классу защищенности.";
    },

    displayedButtonLabel() {
      return this.class ? "Продолжить тестирование для прохождения аудита" : "Завершить тестирование";
    },

    displayedButtonClass() {
      return !this.class ? "class__button--close" : "";
    }
  },
  methods: {
    handleButton() {
      if (this.class) {
        this.$emit("update:component", COMPONENT.test);
      } else {
        this.$emit("update:component", COMPONENT.introduction);

        this.$emit("update:tests", TESTS);
      }
    },
  }
})
</script>

<style>
.class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 50px;
}

.class__title {
  font-size: 56px;
  line-height: 60px;
  margin-bottom: 24px;
  color: rgb(60, 60, 67);
}

.class__label {
  font-size: 20px;
  line-height: 24px;
  color: rgba(60, 60, 67, .78);
  max-width: 700px;
}

.class__button {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding: 11px 20px 10px 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  background: #646cff;
  color: #ffffff;
  border-radius: 20px;
  margin-top: 12px;
}

  .class__button--close {
  color: rgb(60, 60, 67);
  background: #ebebef;
}
</style>