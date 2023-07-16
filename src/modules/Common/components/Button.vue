<template>
    <div class="column is-flex is-justify-content-center" v-if="loader">
        <span class="cus-loader"></span>
    </div>
    <button :disabled="loader" type="submit" class="button" :class="class" v-else>
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        class: String,
        loader: Boolean
    }
}
</script>