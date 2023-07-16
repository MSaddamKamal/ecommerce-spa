<template>
    <div class="product">
        <figure>
            <img width="150" :src="imageUrl">
        </figure>
        <div><b>{{ name }}</b></div>
        <div class="info mb-5">
            <span class="tag is-black mx-1">€{{ price }}</span>
            <span class="tag is-black" id="quantityLeftPerUser">{{ quantityTemp }} Left</span>
        </div>
        <Button type="button" id="addToCartBtn" :loader="loader" v-if="quantityTemp > 0" @click="addToCart">Add to
            cart</Button>
    </div>
</template>

<script>
import Button from '../../Common/components/Button.vue';
import { ITEM_ADDED } from "../../Analytics/event-types"
import { logAnalytic } from "../../Analytics/service.js"
import { mapState } from 'vuex';

export default {
    components: { Button },
    props: {
        id: Number,
        imageUrl: String,
        name: String,
        price: Number,
        quantity: Number,
        quantityLeftPerUser: Number,
    },
    computed: {
        ...mapState('auth', ['user']),
        ...mapState('cart', ['cartId']),
    },
    data() {
        return {
            quantityTemp: this.quantityLeftPerUser,
            loader: false
        }
    },
    methods: {
        addToCart() {
            this.loader = true
            let payload = {
                product_ids: [this.id],
            }

            if (this.cartId && !this.user) {
                payload.cart_id = this.cartId
            }

            this.$store.dispatch("product/addProductToCart", {
                body: payload,
                options: {
                    userLoggedIn: this.user ? true : false
                },
            }).then((data) => {
                logAnalytic(this.id, ITEM_ADDED)
                this.quantityTemp--
                this.loader = false
                // identify guest if user_id == null
                if (data && !data.user_id && !this.cartId) {
                    // set cart
                    this.$store.dispatch("cart/setCartId", data.id)
                }
            })
        }
    },
    watch: {
        quantityLeftPerUser(val) {
            this.quantityTemp = val
        }

    }
}
</script>

