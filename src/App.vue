<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  beforeCreate:function(){    
    if (localStorage.getItem("sesionInformation") != null) {
      if(this.$route.name!='main'){
        this.$router.push({ name : 'main' })
      }
    }else{
      if(this.$route.name!='loginRegister'){
        this.$router.push({ name : 'loginRegister' })
      }
    }
  }
}
</script>