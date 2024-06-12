<template>
  <div class="result-security">
    <h1 class="result-security__title">
      Результат аудита АСУ.
    </h1>

    <p class="result-security__label">
      По результатам проведенного аудита на соответствие требованиям информационной безопасности для АСУ согласно приказу ФСТЕК от 14 марта 2014 г. №31 ваша АСУ {{ displayedCorrect }} классу защищенности.
    </p>

    <div class="result-security__buttons">
      <button class="result-security__button result-security__button--exit" @click="handleExit">
        Вернуться на главную
      </button>

      <button class="result-security__button" @click="handleDocument">
        Скачать полный отчет
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { CLASS_NAME } from '../../static/data';
import { COMPONENT } from '../../App.vue';

import { downloadTest2 } from '../../utils/functions';

export default defineComponent({
  name: "result-security",
  props: {
    test: {
      type: Object,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    asuName: {
      type: String,
      required: true,
    },
  },
  emits: {
    "update:component": null,
  },
  computed: {
    displayedCorrect() {
      return this.displayedErrors.length
        ? `не соответствует ${CLASS_NAME[this.displayedClass]}`
        : `соответствует ${CLASS_NAME[this.displayedClass]}`;
    },

    displayedClass() {
      return this.test.security.find((item) => item.answer === true).class;
    },

    displayedErrors() {
      return this.test.questions.map((question) => {
        const classValue = question.classes[this.displayedClass];

        if (classValue) {
          if (!question.answer) {
            return question.name;
          }
        }

        return null;
      }).filter((question) => question !== null);
    }
  },
  methods: {
    handleDocument() {
      downloadTest2({
        data: this.displayedErrors,
        organizationName: this.organizationName,
        asuName: this.asuName,
        result: `В ходе проведения аудита автоматизированной системы управления "${this.asuName}" ей был присвоен класс защищенности ${CLASS_NAME[this.displayedClass]}, и его результатом является следующий вывод: ${this.displayedCorrect} классу защищенности согласно требованиям указанным в приказе ФСТЕК от 14 марта 2014 г. №31`
      })
    },

    handleExit() {
      this.$emit("update:component", COMPONENT.introduction);
    }
  },
});
</script>

<style>
.result-security {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 50px;
}

.result-security__title {
  font-size: 56px;
  line-height: 60px;
  color: rgb(60, 60, 67);
}

.result-security__label {
  font-size: 20px;
  line-height: 24px;
  color: rgba(60, 60, 67, .78);
  margin-top: 12px;
}

.result-security__buttons {
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.result-security__button {
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
  margin-top: 24px;
}

.result-security__button--exit {
  color: rgb(60, 60, 67);
  background: #ebebef;
}
</style>