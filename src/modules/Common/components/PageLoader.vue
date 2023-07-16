<template>
    <div class="overlay_bg" v-if="pageLoader">
        <div class="loading">
            <div class="container-loader">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                    <circle cx="170" cy="170" r="160" stroke="#ffb900" />
                    <circle cx="170" cy="170" r="135" stroke="white" />
                    <circle cx="170" cy="170" r="110" stroke="#ffb900" />
                    <circle cx="170" cy="170" r="85" stroke="white" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState('common',['pageLoader'],)
    }
}
</script>