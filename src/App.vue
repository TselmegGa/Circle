<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<template>
  <div id="app">
    <NavBar />
     <main>
    <RouterView/>
    </main>
  </div>
</template>

<style>
@import "@/assets/base.css";
  main {
    padding:30px; 
  }
  .form-control {
    margin-bottom: 16px;
  }
  .forum {
    margin-bottom: 60px;
    padding: 20px;
    
  }
  .postbox{
    padding: 20px;
    margin-bottom: 5px;
  }
  .forums {
    margin-top: 20px;
  }
</style> 