<template>
    <Logout />
    <div class="column mb-2">
        <div title="Show this if logged in">Welcome back {{ user?.email }}!</div>
    </div>
    <div class="columns">
        <div class="column">
            <h2 class="label">🎁 Products</h2>
            <Button type="button" @click="$router.push({ name: 'cart' })" class="button mt-4 ">View Cart 🛒</Button>
        </div>
    </div>
    <div id="products" class="columns is-flex-wrap-wrap">
        <div class="column is-one-third" v-for="(item, index) in products">
            <Product :id="item.id" :imageUrl="item.image_url" :name="item.name" :price="item.price"
                :quantity="item.quantity" :quantityLeftPerUser="item.quantityLeftPerUser" />
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <Button type="button" @click="$router.push({ name: 'cart' })" class="button mt-4">View Cart 🛒</Button>
        </div>
    </div>
    <div class="column is-flex is-justify-content-center">
        <pagination v-model="page" :records="totalRecords" :per-page="10" @paginate="fetchProducList" />
    </div>
</template>

<script>

import Button from '../../Common/components/Button.vue';
import Product from '../components/Product.vue'
import Pagination from 'v-pagination-3';
import Logout from "../../Common/components/Logout.vue"
import { mapState } from 'vuex'

export default {
    components: { Product, Pagination, Button, Logout },
    mounted() {
        this.fetchProducList()
    },
    computed: {
        ...mapState('auth', ['user']),
        ...mapState('product', ['products']),
        ...mapState('cart', ['cartId']),
    },
    data() {
        return {
            list: [],
            page: 1,
            totalRecords: 0
        }
    },
    methods: {
        fetchProducList() {
            let payload = {
                pagination: true,
                page: this.page
            }
            if (this.cartId && !this.user) {
                payload.cart_id = this.cartId
            }
            this.$store.dispatch("product/fetchProducList", {
                body: payload,
                options: {
                    loader: true,
                    userLoggedIn: this.user ? true : false
                },
            }).then((data) => {
                this.totalRecords = data?.pagination?.total
            })
        },

    }
}
</script>