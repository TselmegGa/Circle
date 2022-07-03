<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-danger ">
      <div class="container-fluid">
        <router-link class="navbar-brand text-white" to="/">CircleForum</router-link> 
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/forums">Forums</router-link> 
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <span class="d-flex flex-row" v-if="isLoggedIn">
              <li class="nav-item">
                <a class="nav-link text-white" @click="logout">Logout</a>
              </li>
            </span>
            <span class="d-flex flex-row" v-else>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/signup">Register</router-link>
              </li>
              <li class="nav-item">
                 <router-link class="nav-link text-white" to="/login">Login</router-link>
              </li>
            </span>
          </ul>
        </div>        
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isAuthenticated}
    },
    methods: {
      async logout (){
        await this.$store.dispatch('LogOut')
        this.$router.push('/login')
      }
    },
}
</script>

