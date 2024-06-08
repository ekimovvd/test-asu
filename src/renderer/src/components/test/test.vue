<template>
  <div class="test">
    <TestNavigation
      class="test__navigation"
      :test="test"
      v-model:questionIndex="questionIndex"
    />

    <div class="test__group">
      <TestQuestion
        class="test__question"
        :question="displayedQuestion"
        @question="handleQuestion"
      />

      <div class="test__buttons">
        <button
          class="test__button test__button--next"
          :disabled="isNextQuestionDisabled"
          @click="handleNextQuestion"
        >
          Продолжить
        </button>

        <button
          class="test__button test__button--complete"
          :disabled="isCompleteDisabled"
          @click="handleComplete"
        >
          Завершить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import TestNavigation from "./navigation.vue";
import TestQuestion from "./question.vue";

export default defineComponent({
  name: "test",
  components: {
    TestNavigation,
    TestQuestion
  },
  props: {
    test: {
      type: Array,
      default: () => []
    },
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
    question: null,
  },
  data() {
    return {
      questionIndex: 0
    };
  },
  computed: {
    displayedQuestion() {
      return this.test[this.questionIndex];
    },

    isNextQuestionDisabled() {
      return this.displayedQuestion.answer === null || this.questionIndex === this.test.length - 1;
    },

    isCompleteDisabled() {
      return this.test.some((question) => question.answer === null);
    }
  },
  methods: {
    handleQuestion(question) {
      this.$emit("question", question);
    },

    handleNextQuestion() {
      this.questionIndex += 1;
    },

    handleComplete() {
      this.$emit("update:isTest", false);
      this.$emit("update:isResult", true);
    }
  }
});
</script>

<style>
.test {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  min-height: 100vh;
}

.test__navigation {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.test__group {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  margin: auto 0;
}

.test__question {
  margin: auto 0;
}

.test__buttons {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.test__button {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  color: rgba(255, 255, 245, .86);
  background-color: #32363f;
  cursor: pointer;
}

.test__button--complete {
  color: #0d121b;
  background-color: #f7d336;
}

.test__button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>