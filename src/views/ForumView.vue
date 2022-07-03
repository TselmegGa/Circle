<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Forums',
  components: {
    
  },
  data() {
    return {
      form: {
        name: '',
        details: '',
      }
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetForums()
   
  },
  computed: {
    ...mapGetters({Forums: "StateForums", User: "StateUser", token: "StateToken"}),
    isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
  },
  methods: {
    ...mapActions(["CreateForum", "GetForums"]),
    async submit() {
      try {
        await this.CreateForum({details:this.form.details, name:this.form.name, token:this.token});
      } catch (error) {
        throw "Sorry you can't make a forum now!"
      }
    },  
  }
};
</script>
<template>
  <div class="forums">
      <div v-if="User">
        <p>Hi {{User.name}}</p>
      </div>
      <span v-if="isLoggedIn">
        <div>
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="name">Title:</label>
              <input class="form-control" type="text" name="name" v-model="form.name">
            </div>
            <div class="form-group">
              <textarea class="form-control" name="details" v-model="form.details" placeholder="Write up..."></textarea>
            </div>
            <button type="submit" class="btn bg-danger text-white"> Submit</button>
          </form>
        </div>
      </span>
      <div class="forums" v-if="Forums">
        <div class="list-group">
          <router-link  v-for="forum in Forums" :key="forum.id" class="list-group-item list-group-item-action" :to="{ name: 'forum', params: {id: forum.id } }">
              <div id="post-div">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{forum.name}}</h5>
                  <small class="text-muted">{{forum.date.replace('Z', '').replace('T', ' ')}}</small>
                </div>
                <p class="mb-1">By: {{forum.User.name}}</p>
                <small class="text-muted">{{forum.details}}</small>
              </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        Oh no!!! We have no Forums
      </div>
  </div>
</template>

