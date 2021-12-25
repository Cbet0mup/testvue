<template>
  <div class="app">
    <h1>{{ subject.title }}</h1>
    <!-- Индекс используется для проверки текущего индекса вопроса -->
    <div v-for="(question, index) in subject.questions">
      <!-- Скрыть все вопросы, показывать только один вопрос с текущим индексом -->
      <div v-show="index === questionIndex">
        <h2>{{ question.text }}</h2>
        <ol>
          <li v-for="response in question.responses">
            <label>
              <!-- Радио-кнопка имеет 3 новые директивы -->
              <!-- v-bind:value устанавливает "value" в значение "true" если ответ правильный -->
              <!-- v-bind:name устанавливает "name" в значение индекса вопроса для группировки ответов по вопросу -->
              <!-- v-model создает связь с userResponses -->
              <input type="radio"
                     v-bind:value="response.correct"
                     v-bind:name="index"
                     v-model="userResponses[index]"> {{ response.text }}
            </label>
          </li>
        </ol>
        <!-- Кнопки навигации -->
        <!-- Заметка: Кнопка "Предыдущий" должна быть скрыта для первого вопроса -->
        <button v-if="questionIndex > 0" v-on:click="prev">
          prev
        </button>
        <button v-on:click="next">
          next
        </button>
      </div>
    </div>
    <div v-show="questionIndex === subject.questions.length">
      <h2>
        subject finished
      </h2>
      <p>
        Total score: {{ score() }} / {{ subject.questions.length }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      subject: {
        title: 'My subject',
        questions: [
          {
            text: "Question 1",
            responses: [
              {text: 'Wrong, too bad.', correct: false},
              {text: 'Right!', correct: true},
              {text: 'fgdfgdfgdfgdfg', correct: false},
            ]
          }, {
            text: "Question 2",
            responses: [
              {text: 'Right answer', correct: true},
              {text: 'Wrong answer', correct: false},
            ]
          }
        ]
      },
              // текущий индекс вопроса
      questionIndex: 0,

      // ответы: правильно/неправильно
      userResponses: []
    }
  },

  mounted() {
    // массив проинициализированный значениями "false" для каждого вопроса
    this.userResponses = Array(this.subject.questions.length).fill(false);
  },
  methods: {
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
      return this.userResponses.filter((val) =>{ return val }).length;
    }
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto Thin", sans-serif;
  font-size: 15px;

}
</style>
