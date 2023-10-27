<template>
 <div class="register">
      <div>
          <form @submit.prevent="submit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input class="form-control" type="text" name="email" v-model="form.email">
        </div>
        <div class="form-group">
          <label for="name">Fullname:</label>
          <input class="form-control" type="text" name="name" v-model="form.name">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" name="password" v-model="form.password">
        </div>
        <button type="submit" class="btn bg-danger"> Submit</button>
      </form>
      </div>
      <p v-if="showError" id="error">Username already exists</p>
  </div>
</template>
 
<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: "",
        name: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submit() {
      try {
        await this.Register(this.form);
        this.$router.push("/");
        this.showError = false
      } catch (error) {
        console.log(error);
        this.showError = true
      }
    },
  },
};
</script>