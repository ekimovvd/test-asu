<template>
  <div class="result">
    <h1 class="result__title">
      Результат аудита АСУ.
    </h1>

    <p class="result__label">
      По результатам проведенного аудита на соответствие критериям Информационной Безопасности согласно методике оценки показателя состояния технической защиты информации и обеспечения безопасности значимых объектов критической информационной инфраструктуры Российской Федерации утвержденной ФСТЭК РФ 02 мая 2024 года сделан следующий вывод:

      <br />

      <span class="result__span" :class="displayedClass">
        {{ displayedResult }}
      </span>
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

const KZI = {
  0: 0.1,
  1: 0.25,
  2: 0.35,
  3: 0.3
}

const RESULT = {
  green: 1,
  orange: 0.75
}

export default defineComponent({
  name: "result",
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayedKzi() {
      return Object.keys(KZI).map((key) => {
        return this.test.questions
          .filter((question) => question.kzi === parseInt(key))
          .reduce((prev, current) => {
            if (current.answer) {
              prev += current.kji;
            }

            return prev;
          }, 0) * KZI[key];
      }).reduce((prev, current) => {
        prev += current;

        return prev;
      }, 0);
    },

    isGreen() {
      return this.displayedKzi === RESULT.green;
    },

    isOrange() {
      return this.displayedKzi > RESULT.orange && this.displayedKzi < RESULT.green;
    },

    displayedResult() {
      if (this.isGreen) {
        return "Обеспечивается минимальный уровень защиты от типовых актуальных угроз безопасности информации. Уровень состояния защищенности характеризуется как минимальный базовый («зеленый»).";
      } else if (this.isOrange) {
        return "Минимальный уровень защиты от актуальных угроз безопасности информации не обеспечивается, имеются предпосылки реализации актуальных угроз безопасности информации. Уровень состояния защищенности характеризуется как низкий («оранжевый»).";
      }

      return "Минимальный уровень защиты от актуальных угроз безопасности информации не обеспечивается, имеется реальная возможность реализации актуальных угроз безопасности информации. Уровень состояния защищенности характеризуется как критический («красный»).";
    },

    displayedClass() {
      if (this.isGreen) {
        return "result__span--green";
      } else if (this.isOrange) {
        return "result__span--orange";
      }

      return "result__span--red";
    }
  }
});
</script>

<style>
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 0 50px;
}

.result__title {
  font-size: 56px;
  line-height: 60px;
  color: rgb(60, 60, 67);
}

.result__label {
  font-size: 20px;
  line-height: 24px;
  color: rgba(60, 60, 67, .78);
  margin-top: 12px;
}

.result__span--green {
  color: #3dd68c;
}

.result__span--orange {
  color: #f9b44e;
}

.result__span--red {
  color: #f14158;
}
</style>