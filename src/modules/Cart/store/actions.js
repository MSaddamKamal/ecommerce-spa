import { globalMixin } from "../../../mixin/global-mixin";

export default {
    // store cart id
    setCartId(context, payload) {
        context.commit('udpateCartId', payload)
    },

    // fetch all cartitems
    async fetchCartItems(context, payload) {
        let url = 'api/cart-items'
        let guest = !payload?.options?.userLoggedIn

        // user not logged in
        if (guest) {
            url = 'api/guest/cart-items'
        }
        return await globalMixin.methods.makeRequest('get', url, payload.body, payload.options)
            .then(res => {
                if (res && !res?.error) {
                    const { response: { data: { data } } } = res;
                    context.commit("setCartItems", data);
                    return res
                }
                return null
            });
    },

    // remove an item from cart
    async removeCartItem(context, payload) {
        let url = 'api/cart-items'
        let guest = !payload?.options?.userLoggedIn

        // user not logged in
        if (guest) {
            url = 'api/guest/cart-items'
        }

        if (payload.body?.id) {
            url += '/' + payload.body?.id
        }
        return await globalMixin.methods.makeRequest('delete', url, payload.body, payload.options)

    },


    // merge guest Cart with loggedIn user
    async mergeGuestCartWithUser(context, payload) {
        let url = 'api/add-guest-items-to-user-cart'

        return await globalMixin.methods.makeRequest('post', url, payload.body, payload.options)

    },

};