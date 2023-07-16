<template>
    <Logout />
    <div id="cart">
        <h2 class="label">🛒 Cart <span class="tag is-black is-circle">{{ totalAddedProducts }}</span></h2>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="th in TABLE_HEADER">{{ th }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="item.id">
                    <td>
                        <button class="button is-small" title="Remove" @click="onRemoveItem(index)">🗑️</button>
                    </td>
                    <td>{{ item.product.name }}</td>
                    <td>x {{ item.quantity }}</td>
                    <td>€{{ item.product.price * item.quantity }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tax</td>
                    <td>{{ Tax }}%</td>
                    <td>€{{ parseFloat(tax).toFixed(3) }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <b>€{{ totalSum }}</b>
                    </td>
                </tr>
            </tbody>
        </table>
        <div title="Show this if logged in">Hey {{ user?.name }}👋</div>
        <div v-if="purchaseMsg == ''">
            <button class="button is-black" @click="checkout">Checkout</button>
            <div>and never pay!</div>
        </div>
        <p v-else>{{ purchaseMsg }}</p>
    </div>
</template>
<script>
import Logout from "../../Common/components/Logout.vue"
import { ITEM_PURCHASED } from "../../Analytics/event-types"
import { logAnalytic } from "../../Analytics/service.js"

const TABLE_HEADER = ['', 'Item', 'Qt', 'Amount'];
const Tax = 19;
import { mapState } from 'vuex';
export default {
    components: { Logout },
    data() {
        return {
            list: [],
            TABLE_HEADER,
            Tax,
            purchaseMsg: ''
        }
    },
    mounted() {
        this.getCartItems()
    },
    computed: {
        totalSum() {
            return this.list.reduce((acc, item) => (acc + (item.product.price * item.quantity)), 0);
        },
        totalAddedProducts() {
            return this.list.length;
        },
        tax() {
            return this.totalSum * (Tax / 100);
        },
        ...mapState('cart', ['cartItems', 'cartId']),
        ...mapState('auth', ['user']),
    },
    methods: {
        getCartItems() {
            let payload = {}

            if (this.cartId && !this.user) {
                payload.cart_id = this.cartId
            }
            this.$store.dispatch("cart/fetchCartItems", {
                body: payload,
                options: {
                    loader: true,
                    userLoggedIn: this.user ? true : false
                },
            })
        },
        onRemoveItem(index) {
            let cartItem = this.list[index]

            this.$store.dispatch("cart/removeCartItem", {
                body: {
                    id: cartItem?.id
                },
                options: {
                    userLoggedIn: this.user ? true : false
                },
            }).then((res) => {
                if (cartItem.quantity > 1) {
                    this.list = this.list.map((item, idx) => {
                        return index == idx ? {
                            ...item,
                            quantity: item.quantity - 1
                        } : item
                    })
                } else {
                    this.list.splice(index, 1);
                }

            })

        },
        async checkout() {

            for (let item in this.list) {
                logAnalytic(this.list[item]?.product?.id, ITEM_PURCHASED)
            }
            this.purchaseMsg = 'Thanks For Purchasing'
        }
    },
    watch: {
        cartItems(val) {
            this.list = val
        }
    }
}
</script>