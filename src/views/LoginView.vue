<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input class="form-control" type="text" name="email" v-model="form.email">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" name="password" v-model="form.password">
        </div>
        <button type="submit" class="btn bg-danger"> Submit</button>
      </form>
      <p v-if="showError" id="error">Email or Password is incorrect</p>
    </div>
  </div>
</template>

 
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      try {
          await this.LogIn(this.form);
          this.$router.push("/");
          this.showError = false
      } catch (error) {
        console.log(error)
        this.showError = true
      }
    },
  },
};
</script>
