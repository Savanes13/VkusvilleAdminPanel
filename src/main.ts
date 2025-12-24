import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {globalDirectives} from "@/directives/directives";
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

Object.entries(globalDirectives).forEach(([name, directive]) => {
  app.directive(name, directive);
});

app.use(createPinia())
app.use(VCalendar)
app.use(router)

app.mount('#app')
