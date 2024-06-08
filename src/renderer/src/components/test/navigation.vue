<template>
  <div class="test-navigation">
    <button
      class="test-navigation__item"
      :class="handleItemActiveClass(item)"
      v-for="item in test"
      :key="item.id"
      @click="handleItem(item)"
    >
      {{ item.id + 1 }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "test-navigation",
  props: {
    test: {
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
    handleItemActiveClass({ id, answer }) {
      if (id === this.questionIndex) {
        return "test-navigation__item--selected";
      }

      return answer !== null ? "test-navigation__item--active" : "";
    },

    handleItem({ id }) {
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

.test-navigation__item {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #32363f;
  background: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  color: #7a7a7a;
}

.test-navigation__item--selected {
  color: #d9e6eb;
}

.test-navigation__item--active {
  color: #f7d336;
}
</style>