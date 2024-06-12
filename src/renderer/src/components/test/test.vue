<template>
  <div class="test">
    <TestNavigation
      class="test__navigation"
      :questions="questions"
      v-model:questionIndex="questionIndex"
    />

    <TestQuestion
      v-if="displayedQuestion"
      class="test__question"
      :question="displayedQuestion"
      @question="handleQuestion"
    />

    <button class="test__exit" @click="handleExit">
      Завершить тестирование
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import TestNavigation from "./navigation.vue";
import TestQuestion from "./question.vue";
import { COMPONENT } from "../../App.vue";

export default defineComponent({
  name: "test",
  components: {
    TestNavigation,
    TestQuestion
  },
  props: {
    test: {
      type: Object,
      required: true,
    },
    questions: {
      type: Array,
      default: () => []
    },
    component: {
      type: String,
      required: true,
    },
  },
  emits: {
    "update:component": null,
  },
  data() {
    return {
      questionIndex: 0
    };
  },
  computed: {
    displayedQuestion() {
      return this.questions[this.questionIndex];
    },
  },
  methods: {
    handleQuestion(question) {
      this.$emit("question", question);

      const findQuestionIndex = this.questions.findIndex((item) => item.answer === null);

      if (findQuestionIndex !== -1) {
        if (this.questions[this.questionIndex + 1]) {
          this.questionIndex += 1;
        } else {
          this.questionIndex = findQuestionIndex;
        }
      } else {
        switch (this.component) {
          case COMPONENT.security:
            this.$emit("update:component", COMPONENT.class);

            break;
          case COMPONENT.test:
            switch (this.test.id) {
              case 0:
                this.$emit("update:component", COMPONENT.result);

                break;
              case 1:
                this.$emit("update:component", COMPONENT.resultSecurity);

                break;
              default:
                break;
            }

            break;
          default:
            break;
        }
      }
    },

    handleExit() {
      this.$emit("update:component", COMPONENT.introduction);
    }
  }
});
</script>

<style>
.test {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 100px 0;
}

.test__navigation {
  margin-bottom: 54px;
}

.test__exit {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding: 11px 20px 10px 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  cursor: pointer;
  color: rgb(60, 60, 67);
  background: #ebebef;
  border-radius: 20px;
  max-width: 250px;
  text-align: center;
  margin: auto auto 0 auto;
}
</style>