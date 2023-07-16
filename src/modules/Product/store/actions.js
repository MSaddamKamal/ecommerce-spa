// import { request } from "@/mixins/request";
import { globalMixin } from "../../../mixin/global-mixin";

export default {
    async fetchProducList(context, payload) {
        let url = 'api/products'
        let guest = !payload?.options?.userLoggedIn

        // user not logged in
        if (guest) {
            url = 'api/guest/products'
        }

        return await globalMixin.methods.makeRequest('get', url, payload.body, payload.options)
            .then(res => {
                if (res && !res?.error) {
                    const { response: { data: { data } } } = res;
                    context.commit("setProducts", data);
                    const { response: { data: records } } = res;
                    return records
                }
                return null
            });
    },

    async addProductToCart(context, payload) {

        let url = 'api/cart'
        let guest = !payload?.options?.userLoggedIn
        // user not logged in
        if (guest) {
            url = 'api/guest/cart'
        }

        return await globalMixin.methods.makeRequest('post', url, payload.body, payload.options)
            .then(res => {
                if (res && !res?.error) {
                    const { response: { data: { data } } } = res;
                    return data
                }
                return null
            });
    },

};