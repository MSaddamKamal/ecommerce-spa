import { createStore } from 'vuex'
import auth from "../modules/Auth/store"
import product from "../modules/Product/store"
import cart from "../modules/Cart/store"
import common from "../modules/Common/store"
import analytics from "../modules/Analytics/store"

const store = createStore({
  modules: {
    auth,
    product,
    cart,
    common,
    analytics
  },
});

export default store;