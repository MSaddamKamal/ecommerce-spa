export default {
    udpateCartId(state, payload) {
        state.cartId = payload
        localStorage.setItem('cartId', payload)
    },
    setCartItems(state, payload) {
        state.cartItems = payload
    },

};