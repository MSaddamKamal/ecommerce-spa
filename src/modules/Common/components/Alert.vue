<template>
    <div class="column is-flex is-justify-content-center" id="result" v-if="alertMsg">
        <div class="notification" :class="alertMsg?.error ? 'is-danger' : 'is-primary'">
            {{ alertMsg?.msg }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState('common', ['alertMsg']),
    },
    watch: {
        alertMsg(newResult) {
            if (newResult) {
                this.$nextTick().then(() => document.querySelector('#result')?.scrollIntoView());
            }
        }
    },
}
</script>