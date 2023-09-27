import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { initializeApp } from 'firebase/app'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const firebaseConfig = {

    apiKey: "AIzaSyAorv0-DXE2CRNbAjNHQfVsyd2JZW3DrnM",
  
    authDomain: "testdb-adcf5.firebaseapp.com",
  
    projectId: "testdb-adcf5",
  
    storageBucket: "testdb-adcf5.appspot.com",
  
    messagingSenderId: "530511048231",
  
    appId: "1:530511048231:web:5d0b49518b48b67f2ba802"
  
  };
  
const firebaseApp = initializeApp(firebaseConfig)

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)
app.use(store).use(router).use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        VueFireAuth(),
    ],
}).use(vuetify)
app.mount('#app')
