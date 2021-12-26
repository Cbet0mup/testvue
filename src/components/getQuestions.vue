<template>
  <div class="container">
  <h1 style="margin-left: 50px">{{ subject.title }}</h1>
  <!-- Индекс используется для проверки текущего индекса вопроса -->
  <div v-for="(question, index) in subject.questions">
    <!-- Скрыть все вопросы, показывать только один вопрос с текущим индексом -->
    <div v-show="index === questionIndex">
      <h3 style="margin: 5px">{{ question.text }}</h3>
      <ol>
        <li class="responses" v-for="response in question.responses">
          <label>
            <!-- Радио-кнопка имеет 3 директивы -->
            <!-- v-bind:value устанавливает "value" в значение "true" если ответ правильный -->
            <!-- v-bind:name устанавливает "name" в значение индекса вопроса для группировки ответов по вопросу -->
            <!-- v-model создает связь с userResponses -->
            <input class="custom-radio" type="radio"
                   v-bind:value="response.correct"
                   v-bind:name="index"
                   v-model="userResponses[index]">
            {{ response.text }}
          </label>
        </li>
      </ol>
      <!-- Кнопки навигации -->
      <!-- Заметка: Кнопка "Предыдущий" должна быть скрыта для первого вопроса -->
      <button class="button" v-if="questionIndex > 0" v-on:click="prev">
        prev
      </button>
      <button class="button" v-on:click="next">
        next
      </button>
    </div>
  </div>
  <div v-show="questionIndex === subject.questions.length">
    <h2 style="margin: 10px">
      Тест окончен
    </h2>
    <p style="margin: 5px">
      Ваш результат: {{ score() }} из {{ subject.questions.length }} - {{ score()*100/subject.questions.length }}%
    </p>
  </div>
  </div>
</template>

<script>
import {HTTP} from "../api/instance.js";

export default {
  name: "getQuestions",
  data() {
    return {
      //тело вопросов
      subject: {
        title: '',
        questions: [
          {
            text: "",
            responses: [
              {text: '', correct: false},
              {text: '', correct: false},
            ]
          }
        ]
      },

      // текущий индекс вопроса
      questionIndex: 0,

      // ответы: правильно/неправильно
      userResponses: [],
      urlApi: 'questions/',
    }
  },
  mounted() {
    // массив проинициализированный значениями "false" для каждого вопроса
    this.getData();
    this.userResponses = Array(this.subject.questions.length).fill(false);
  },
  methods: {
    async getData() {
      await HTTP.get(this.urlApi + 1)  //переменная
          .then(response => {
            this.subject = response.data;
          })
          .catch(e => {
            this.errors.push(e);
          })
    },
    // Go to next question
    next() {
      this.questionIndex++;
    },
    // Go to previous question
    prev() {
      this.questionIndex--;
    },
    // Возвращает количесво "true" в userResponses
    score() {
      return this.userResponses.filter(val => val===true).length;
    }
  }
}
</script>

<style scoped>
.button {
  background: #175b04;
  border-radius: 4px;
  display: inline-block;
  border: none;
  padding: 0.75rem 1rem;
  margin: 20px 10px 0 0;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.container {
  margin: 50px;
  display: block;

}
.responses {
  margin: 5px;
}
.custom-radio{
  margin-right: 10px;
}

</style>
