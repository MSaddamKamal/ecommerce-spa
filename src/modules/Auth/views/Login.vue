<template>
  <div class="column">
    <h2 class="label">Login 🔑Account</h2>

    <Form @submit="login" :validation-schema="loginValidationSchema" >
      <div class="field">
        <div class="control">
          <Field name="email" class="input" type="email" placeholder="Email"  autocomplete="off" />
                    <ErrorMessage name="email"/>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <Field name="password" class="input" type="password" placeholder="Password"  />
                    <ErrorMessage name="password"/>
        </div>
      </div>

      <!-- <label class="checkbox">
           <input type="checkbox"> Remember me for 2 weeks on this device
         </label> -->
      <br><br>


      <Button class="is-black mx-2">Login</Button>
      <Button @click="$router.push({name:'register'})">Register</Button>

    </Form>
  </div>
  <div class="column is-flex is-justify-content-center">
    <button type="button " @click="$router.push('/')" class="button mt-5 is-black ">View as guest</button>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import loginValidationSchema from "../validation_schemas/login"

</script>
 
<script>
import Button from '../../Common/components/Button.vue';
import { mapState } from 'vuex';

export default {
  components: { Button },
  name: 'Login',
  computed: {
        ...mapState('cart', ['cartId']),
    },
  data() {
    return {
    }
  },
  methods: {
     async login(values) {
      this.$store.dispatch("auth/login", {
        body: {
          ...values
        },
        options: {
          loader:true,
          hideSuccessMsg:true
        },
      }).then(async (res) => {
        if (res  && !res?.error) {  
          if(this.cartId){
            await  this.$store.dispatch("cart/mergeGuestCartWithUser", {
                body: {cart_id:this.cartId},
                options: {},
            })
            this.$store.dispatch('cart/setCartId',null)
            localStorage.removeItem('cartId')
            
          }
           
           this.$router.push('/');
        }
      })
    },
  }
}
</script>