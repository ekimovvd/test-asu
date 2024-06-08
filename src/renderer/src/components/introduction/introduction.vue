<template>
  <div class="introduction">
    <h1 class="introduction__title">
      Аудит АСУ на соответствие требованиям информационной безопасности.
    </h1>

    <p class="introduction__label">
      Данное приложение используется для проведения аудита АСУ для определения ее уровня защищенности по критериям Информационной Безопасности согласно методике оценки показателя состояния технической защиты информации и обеспечения безопасности значимых объектов критической информационной инфраструктуры Российской Федерации утвержденной ФСТЭК РФ 02 мая 2024 года.
    </p>

    <button class="introduction__button" @click="handleTest">
      Начать тестирование
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "introduction",
  props: {
    isTest: {
      type: Boolean,
      default: false
    },
    isResult: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    "update:isTest": null,
    "update:isResult": null,
  },
  methods: {
    handleTest() {
      this.$emit("update:isTest", true);
      this.$emit("update:isResult", false);
    }
  }
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
}

.introduction__label {
  font-size: 20px;
  line-height: 24px;
  color: #7a7a7a;
  margin-top: 8px;
}

.introduction__button {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  color: #0d121b;
  background-color: #f7d336;
  cursor: pointer;
  margin-top: 24px;
}
</style>