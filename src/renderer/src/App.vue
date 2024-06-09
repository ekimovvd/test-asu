<template>
  <div class="app">
    <component
      :is="displayedComponent"
      :questions="test.questions"
      :security="test.security"
      :test="test"
      :tests="tests"
      v-model:component="component"
      @securityQuestion="handleSecurityQuestion"
      @question="handleQuestion"
      @update:test="handleTest"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Introduction from "./components/introduction/introduction.vue";
import Security from "./components/security/security.vue";
import Test from "./components/test/test.vue";
import Class from "./components/class/class.vue";
import Result from "./components/result/result.vue";
import ResultSecurity from "./components/result-security/result-security.vue";

import { TESTS } from "./static/data";

export const COMPONENT = {
  introduction: "introduction",
  security: "security",
  test: "test",
  class: "class",
  result: "result",
  resultSecurity: "result-security",
};

export default defineComponent({
  name: "app",
  components: {
    Introduction,
    Security,
    Test,
    Class,
    Result,
    ResultSecurity,
  },
  data() {
    return {
      component: COMPONENT.introduction,
      test: {},
      tests: TESTS,
    };
  },
  computed: {
    displayedComponent() {
      switch (this.component) {
        case COMPONENT.introduction:
          return Introduction;
        case COMPONENT.security:
          return Security;
        case COMPONENT.test:
          return Test;
        case COMPONENT.class:
          return Class;
        case COMPONENT.result:
          return Result;
        case COMPONENT.resultSecurity:
          return ResultSecurity;
        default:
          return Introduction;
      }
    },
  },
  methods: {
    handleSecurityQuestion(question) {
      this.test.security[
        this.test.security.findIndex((item) => item.id === question.id)
      ].answer = question.answer;

      if (question.answer) {
        this.component = COMPONENT.class;
      }
    },

    handleQuestion(question) {
      this.test.questions[
        this.test.questions.findIndex((item) => item.id === question.id)
      ].answer = question.answer;
    },

    handleTest(test) {
      this.tests.forEach((test) => {
        test.questions.forEach((question) => {
          question.answer = null;
        });

        if (test.security) {
          test.security.forEach((item) => {
            item.answer = null;
          });
        }
      });

      this.test = test;
    },
  },
});
</script>

<style>
.app {
  min-height: 100vh;
}
</style>