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
</style>