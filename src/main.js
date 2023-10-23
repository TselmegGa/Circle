import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router";
import store from './store';
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = `https://localhost:8081/`;
axios.defaults.headers =  {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PUT, POST',
    'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
    'Access-Control-Allow-Credentials':true
  }

app.use(router);
app.use(store);

app.mount("#app");
