import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// @ts-ignore
import io from 'socket.io-client';
const socketConnexion = io.connect('http://localhost:3000');

Vue.config.productionTip = false;

Vue.directive("feature", (el, binding, vnode) => {
  const feature = binding.value.feature;
  el.style.display = 'none';

  if (document.location.href.indexOf('showfeatures') > -1) {
    socketConnexion.emit('get-toggle', binding.value.feature);
    if (feature === 'change background to red') {
      el.style.backgroundColor = 'red';
    }
    socketConnexion.on('toggle-state', (data: { id: number; feature: string; state: number }) => {
      if (data.feature === feature) {
        if (data.state === 1) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
