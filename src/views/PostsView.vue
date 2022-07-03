<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Forums',
  props:{
    id:{type: String, required: true}
  },
  components: {
    
  },
  data() {
    return {
      forumEdit: false,
      details: '',
      forumForm: {
        name: '',
        details: '',
      },
      postForm: {
        details: '',
      }
    };
  },
  mounted: function () {
    // a function to call getposts action
    this.GetForum(this.id)
  },
  computed: {
    ...mapGetters({Forum: "StateForum", User: "StateUser", token: "StateToken"}),
    isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
  },
  methods: {
    ...mapActions(["CreatePost", "GetForum", "EditPost", "EditForum"]),
    async createPost() {
      try {
        await this.CreatePost({details:this.details, token:this.token, ForumId:this.id});
      } catch (error) {
        throw "Sorry you can't make a post now!"+ error
      }
    },
    async editPost(id) {
      try {
        await this.EditPost({details:this.postForm.details, ForumId:this.id, token:this.token,id: id});
      } catch (error) {
        throw "Sorry you can't edit a post now!"+ error
      }
    }, 
    async editForum() {
      try {
        await this.EditForum({details:this.forumForm.details, name:this.forumForm.name, token:this.token, id:this.id});
        this.forumEdit = false;
      } catch (error) {
        throw "Sorry you can't edit a forum now!"+ error
      }
    }, 
  }
};
</script>
<template>
      <div v-if="Forum">
        <div class="list-group">
          <div id="post-div" class="forum bg-warning" :key="Forum.id" >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{Forum.name}}</h5>
              <small class="text-muted">{{Forum.date.replace('Z', '').replace('T', ' ')}}</small>
            </div>
            <p class="mb-1">By: {{Forum.User.name}}</p>
            <div class="d-flex w-100 justify-content-between">
              <small class="text-muted">{{Forum.details}}</small>
            <button class="btn bg-danger text-white" v-if="User.id == Forum.User.id" @click="forumEdit=!forumEdit">Edit</button>
            </div>
          </div>
          <form v-if="forumEdit" @submit.prevent="editForum">
            <div class="form-group">
              <label for="name">Title:</label>
              <input class="form-control" type="text" name="name" v-model="forumForm.name">
            </div>
            <div class="form-group">
              <textarea class="form-control" name="details" v-model="forumForm.details" placeholder=""></textarea>
            </div>
            <button type="submit" class="btn bg-danger text-white"> Submit</button>
          </form>
        </div>
        <div class="postbox bg-light" v-for="post in Forum.Posts" :key="post.id" id="post-div">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">{{post.details}}</h6>
            <small class="text-muted">{{post.date.replace('Z', '').replace('T', ' ')}}</small>
          </div>
          <div v-if="User.id == post.User.id">
            <h5>Edit a comment:</h5>
            <form @submit.prevent="editPost(post.id)">
              <div class="form-group">
                <textarea class="form-control" name="details" v-model="postForm.details" placeholder="Write up..."></textarea>
              </div>
              <button type="submit" class="btn bg-danger text-white"> Submit</button>
            </form>
          </div>
        </div>
        <span v-if="isLoggedIn">
          <div>
            <h5>Leave a comment:</h5>
            <form @submit.prevent="createPost">
              <div class="form-group">
                <textarea class="form-control" name="details" v-model="details" placeholder="Write up..."></textarea>
              </div>
              <button type="submit" class="btn bg-danger text-white"> Submit</button>
            </form>
          </div>
        </span>
      </div>
      <div v-else>
        Oh no!!! We have no Forum
      </div>
  
</template>

