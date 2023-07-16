import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default
    {
        // Important consideration
        namespace: true,
        namespaced: true,

        state() {
            return {
                user: (typeof (localStorage.getItem('user')) != "undefined" && (localStorage.getItem('user')) != null )? JSON.parse(localStorage.getItem('user')) : null,

            }
        },
        getters: getters,
        mutations: mutations,
        actions: actions,
    };