<template>
  <div id="app">
    <h1>You can always see me</h1>
    <p>To be able to test, add '&showfeatures' in the adress bar at the end of the address</p>
    <div v-feature="{ feature: 'show hello world'}">
      <h2>New feature</h2>
      <h3>HELLO WORLD</h3>
    </div>

    <div v-feature="{ feature: 'show hello world'}">
      <p>I am controlled by a toggle</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, debitis sed. Eum deleniti libero necessitatibus odit quasi fugiat illo earum odio error nihil itaque magnam pariatur, maxime, harum ea porro?</p>
    </div>
    <div v-feature="{ feature: 'change background to red'}">This is a red box</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
