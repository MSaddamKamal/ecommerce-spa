import { createStore } from 'vuex'
import auth from "../modules/Auth/store"




const store = createStore({
  modules: {
    auth,
 
  },
});

export default store;