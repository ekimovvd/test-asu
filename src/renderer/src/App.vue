<template>
  <div class="app">
    <Introduction
      v-if="isIntroductionShow"
      v-model:isTest="isTest"
      v-model:isResult="isResult"
    />

    <Test
      :test="test"
      v-else-if="isTest"
      v-model:isTest="isTest"
      v-model:isResult="isResult"
      @question="handleQuestion"
    />

    <Result v-else-if="isResult" :test="test" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Introduction from "./components/introduction/introduction.vue";
import Test from "./components/test/test.vue";
import Result from "./components/result/result.vue";

import { TEST } from "./static/data";

export default defineComponent({
  name: "app",
  components: {
    Introduction,
    Test,
    Result
  },
  data() {
    return {
      isTest: false,
      isResult: false,
      test: TEST,
    };
  },
  computed: {
    isIntroductionShow() {
      return !this.isTest && !this.isResult;
    }
  },
  methods: {
    handleQuestion({ question, answer }) {
      this.test[this.test.findIndex((findQuestion) => findQuestion.id === question.id)].answer = answer;
    }
  }
});
</script>

<style>
.app {
  min-height: 100vh;
}
</style>