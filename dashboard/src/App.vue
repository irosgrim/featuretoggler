<template>
  <div id="app">
    <h1>Feature Toggles</h1>
    <ul>
      <li v-for="toggle in toggles" :key="toggle.id">
        {{toggle.feature}}
        <input
          type="checkbox"
          :checked="toggle.state"
          @click="toggleFeature(toggle.id, toggle.state)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
// @ts-ignore
import io from "socket.io-client";
const socketConnexion = io.connect("http://localhost:3000");

interface toggle {
  id: number;
  feature: string;
  state: 0 | 1;
}

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  public toggles: toggle[] = [];
  public created() {
    this.getAllToggles();
    socketConnexion.on("all-toggles", (data: toggle[]) => {
      this.toggles = data;
    });
  }
  public getAllToggles() {
    socketConnexion.emit("get-all-toggles", { id: "ion" });
  }
  public toggleFeature(id: number, state: number) {
    let reverseState = state === 1 ? 0 : 1;
    socketConnexion.emit("set-toggle", { id, state: reverseState });
    this.getAllToggles();
  }
}
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
