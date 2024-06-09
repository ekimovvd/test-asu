<template>
  <div class="test-navigation">
    <button
      class="test-navigation__question"
      :class="handleQuestionActiveClass(question)"
      v-for="question in questions"
      :key="question.id"
      @click="handleQuestion(question)"
    >
      {{ question.id + 1 }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "test-navigation",
  props: {
    questions: {
      type: Array,
      default: () => []
    },
    questionIndex: {
      type: Number,
      default: 0
    }
  },
  emits: {
    "update:questionIndex": null
  },
  methods: {
    handleQuestionActiveClass({ id, answer }) {
      if (id === this.questionIndex) {
        return "test-navigation__question--selected";
      }

      return answer !== null ? "test-navigation__question--active" : "";
    },

    handleQuestion({ id }) {
      this.$emit("update:questionIndex", id);
    }
  }
});
</script>

<style>
.test-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 50px;
}

.test-navigation__question {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: #ebebef;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  color: rgba(60, 60, 67);
  border-radius: 8px;
}

.test-navigation__question--selected,
.test-navigation__question--active {
  color: #ffffff;
  background: #646cff;
}
</style>