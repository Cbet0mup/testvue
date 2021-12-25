<template>
  <div class="app">
    <get-questions/>
  </div>
</template>

<script>
import GetQuestions from "./components/getQuestions.vue";
export default {
  name: 'App',
  components: {GetQuestions},
  data() {

  },


  methods: {

  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto Thin", sans-serif;
  font-size: 20px;

}
</style>
