<template>
  <div class="column">
    <h2 class="label">Register 🔑Account</h2>
    <Form @submit="register" :validation-schema="registerValidationSchema">
      <div class="field">
        <div class="control">
          <Field name="name" class="input" type="text" placeholder="Name" />
          <ErrorMessage name="name" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <Field name="email" class="input" type="email" placeholder="Email" />
          <ErrorMessage name="email" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <Field name="password" class="input" type="password" placeholder="Password" />
          <ErrorMessage name="password" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <Field name="password_confirmation" class="input" type="password" placeholder="Password" />
          <ErrorMessage name="password_confirmation" />
        </div>
      </div>
      <br><br>
      <Button class="button is-black mx-2">Register</Button>
      <Button type="button" @click="$router.push({ name: 'login' })">Login</Button>
    </Form>
  </div>
</template>


<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import registerValidationSchema from "../validation_schemas/register"
</script>

<script>
import Button from '../../Common/components/Button.vue';
import { USER_REGISTERED } from "../../Analytics/event-types"
import { logAnalytic } from "../../Analytics/service.js"
export default {
  components: { Button },
  name: 'Register',
  data() {
    return {

    }
  },
  methods: {
    register(values) {
      this.$store.dispatch("auth/register", {
        body: {
          ...values
        },
        options: {
          loader: true,
          hideSuccessMsg: true
        },
      }).then((res) => {
        if (res && !res?.error) {
          logAnalytic(res?.id, USER_REGISTERED)
          this.$router.push({ name: 'login' });
        }
      })
    },
  }
}
</script>