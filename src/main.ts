import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { md3 } from 'vuetify/blueprints'

const firebaseConfig = {

  apiKey: "AIzaSyAHBnEfXzOlGPRhwFXtd6AFxANXWzbUwuk",

  authDomain: "mybudgeteasybackend.firebaseapp.com",

  projectId: "mybudgeteasybackend",

  storageBucket: "mybudgeteasybackend.appspot.com",

  messagingSenderId: "616720153121",

  appId: "1:616720153121:web:6a62334dc970a329548160"

};
  
const firebaseApp = initializeApp(firebaseConfig)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    },
    blueprint: md3,
})

const app = createApp(App)
app.use(router).use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
}).use(vuetify).use(pinia)

app.mount('#app')
