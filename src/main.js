import { createApp } from 'vue'
import App from './App.vue'
import { defineRule, configure } from "vee-validate";
import rules from '@vee-validate/rules';
import router from './router/index'
import { globalMixin } from './mixin/global-mixin'
import store from './store'

// configure vee validate to validatio on input
configure({
    validateOnInput: true
});

// importing validation rules
Object.keys(rules).forEach(rule => {
    defineRule(rule,rules[rule]);
 
});

// creating app and mounting packages
const app = createApp(App)
            .use(router)
            .use(store)
 
app.mixin(globalMixin)

app.mount('#app')
