<template>
    <div v-if="this.user" class="column is-flex is-justify-content-end">
        <Button type="button" class="button is-black" @click="logout">Logout</Button>
    </div>
    <div class="column is-flex is-justify-content-end" v-else>
        <Button type="button" class="button is-black mx-2" @click="$router.push({ name: 'register' })">Register</Button>
        <Button type="button" class="button is-black" @click="$router.push({ name: 'login' })">Login</Button>
    </div>
</template>

<script>
import Button from "../../Common/components/Button.vue"
import { mapState } from "vuex"
export default {
    computed: {
        ...mapState('auth', ['user']),
    },
    methods: {
        logout() {
            this.$store.dispatch("auth/logout", {
                body: {},
                options: {
                    loader: true,
                },
            }).then((data) => {
                this.$store.dispatch('cart/setCartId', null)
                this.$router.push({ name: 'login' })

            })
        }
    }
}
</script>