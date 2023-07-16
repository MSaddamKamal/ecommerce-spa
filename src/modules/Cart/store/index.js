import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    // Important consideration

    namespaced: true,

    state() {
        return {
            cartId: (typeof (localStorage.getItem('cartId')) != "undefined" && (localStorage.getItem('cartId')) != null) ? JSON.parse(localStorage.getItem('cartId')) : null,
            cartItems: []
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};