<template>
  <div>
    <router-view />
    <PageLoader />
  </div>
</template>

<script>
import PageLoader from "./modules/Common/components/PageLoader.vue"
import Alert from "./modules/Common/components/Alert.vue";
export default {
  components: { PageLoader, Alert },
  name: 'App',
}
</script>
