<template>
  <div class="test-question">
    <h1 class="test-question__title">
      {{ question.title }}
    </h1>

    <p class="test-question__name">
      {{ question.name }}
    </p>

    <div class="test-question__answers">
      <button
        class="test-question__answer"
        :class="handleAnswerActiveClass(true)"
        @click="handleAnswer(true)"
      >
        Да
      </button>

      <button
        class="test-question__answer"
        :class="handleAnswerActiveClass(false)"
        @click="handleAnswer(false)"
      >
        Нет
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "test-question",
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  emits: {
    question: null,
  },
  computed: {
    displayedAnswerClass() {
      return this.question
    }
  },
  methods: {
    handleAnswer(answer) {
      this.$emit("question", {
        question: this.question,
        answer
      });
    },

    handleAnswerActiveClass(answer) {
      return this.question.answer === answer ? "test-question__answer--active" : "";
    }
  }
});
</script>

<style>
.test-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 24px;
  align-items: center;
  text-align: center;
  padding: 0 50px;
}

.test-question__title {
  font-size: 56px;
  line-height: 60px;
}

.test-question__name {
  font-size: 20px;
  line-height: 24px;
  color: #7a7a7a;
  max-width: 700px;
}

.test-question__answers {
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.test-question__answer {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
  color: #d9e6eb;
}

.test-question__answer--active {
  color: #f7d336;
}
</style>
