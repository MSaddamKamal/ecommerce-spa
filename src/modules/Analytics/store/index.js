import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
    // Important consideration

    namespaced: true,

    state() {
        return {

        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
};