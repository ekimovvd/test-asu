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
        v-for="answer in displayedAnswers"
        :key="answer.id"
        :class="answer.class"
        @click="handleAnswer(answer.value)"
      >
        {{ answer.label }}
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
    displayedAnswers() {
      return [
        {
          id: 0,
          label: "Да",
          class: "test-question__answer--yes",
          value: true,
        },
        {
          id: 1,
          label: "Нет",
          class: "",
          value: false,
        },
      ];
    },
  },
  methods: {
    handleAnswer(answer) {
      this.$emit("question", {
        ...this.question,
        answer
      });
    },
  },
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
  color: rgb(60, 60, 67);
}

.test-question__name {
  font-size: 20px;
  line-height: 24px;
  color: rgba(60, 60, 67, .78);
  max-width: 700px;
}

.test-question__answers {
  display: flex;
  align-items: center;
  column-gap: 24px;
}

.test-question__answer {
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
  color: rgb(60, 60, 67);
  background: #ebebef;
  border-radius: 20px;
}

.test-question__answer--yes {
  background: #646cff;
  color: #ffffff;
}
</style>
