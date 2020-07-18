<template>
    <v-container fill-height fluid pa-0>
        <v-container fill-height fluid pa-0 class="carrousel">
            <v-carousel cycle hide-delimiter-background hide-delimiters :show-arrows="false" height="100%" continous>
                <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
            </v-carousel>
        </v-container>
        <v-container fill-height fluid class="d-flex align-start">
            <v-row>
                <v-col cols="6" class="d-flex justify-start" style="padding-top:0px!important;padding-bottom:0px!important">
                    <v-img src="http://3.23.131.0:3002/api/resource/web/icons/avocado.png" position="left" contain></v-img>
                </v-col>
                <v-col cols="6" class="d-flex justify-end">
                    <v-btn depressed color="white" @click.stop="dialog=true">
                        INICIAR SESIÓN
                    </v-btn>
                    <v-btn depressed color="white" class="ml-2" @click="$router.push({ name: 'register' })">
                        REGISTRATE
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="9"  class="text-center mx-auto">
                    <p class="white--text text-h1 font-weight-bold">Conoce gente. Chatea. Sal con alguien</p>
                </v-col>
                <v-col cols="12" md="7" class="text-center mx-auto">
                    <p class="white--text text-subtitle-2 font-weight-medium">Al hacer click en Regístrate, aceptas nuestros Términos. Conoce cómo procesamos tus datos en nuestra Política de privacidad y Política sobre cookies.</p>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialog" width="400">
            <v-card>
                <v-card-title class="justify-center lighten-2" primary-title>
                    <v-img src="http://3.23.131.0:3002/api/resource/web/icons/avocado.png" contain width="100%" height="50"></v-img>
                    Conoce a nuevas personas
                </v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn rounded depressed outlined class="my-2" height="50" width="95%" @click.stop="dialogLogin=true"><v-img src="http://3.23.131.0:3002/api/resource/web/icons/avocadowab.png" contain height="45" width="10"></v-img> INICIAR SESIÓN CON WEVEGAN</v-btn>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn rounded depressed outlined class="my-2" height="50" width="95%"><v-icon class="mx-2">fab fa-google</v-icon> INICIAR SESIÓN CON GOOGLE</v-btn>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn rounded depressed outlined class="my-2" height="50" width="95%"><v-icon class="mx-2">fab fa-facebook</v-icon> INICIAR SESIÓN CON FACEBOOK</v-btn>
                        </v-col>
                        <!-- <v-col cols="12" class="d-flex justify-center">
                            <v-btn rounded depressed outlined class="my-2" height="50" width="95%"><v-icon class="mx-2">fas fa-sms</v-icon> INICIAR SESIÓN CON EL TELÉFONO</v-btn>
                        </v-col> -->
                    </v-row>
                </v-card-text>
                <v-card-text>
                    <router-link to="/foo">
                        <p class="text-center">¿Tienes problemas para iniciar sesión?</p>
                    </router-link>
                    <router-link to="/foo">
                        <p class="text-center">¿Aun no tienes cuenta ven conoce gente?</p>
                    </router-link>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <p class="text-center text-h5 font-weight-bold black--text mt-3">
                        ¡DESCARGA NUESTRA APP!
                    </p>
                    <v-row no-gutters>
                        <v-col cols="6" class="d-flex justify-center">
                            <v-btn rounded depressed outlined min-width="75%" height="50">
                                <v-icon>fab fa-apple</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="d-flex justify-center">
                            <v-btn rounded depressed outlined min-width="75%" height="50">
                                <v-icon>fab fa-google-play</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text class="text-center pa-0">
                    <v-sheet color="text-h6 white--text lighten-2 font-weight-bold" height="40px" class="moreApps">Conoce nuestras otras aplicaciones</v-sheet>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogLogin" width="500">
            <v-card>
                <v-card-title class="justify-center text-h4" primary-title>
                    Login
                </v-card-title>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-card-text class="px-12 pt-3 pb-0">
                        <v-text-field v-model="email" label="Correo electronico" outlined dense :rules="emailRules"></v-text-field>
                        <v-text-field v-model="password" @click:append="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'far fa-eye' : 'far fa-eye-slash'" label="Password" outlined dense :rules="passwordRules"></v-text-field>
                    </v-card-text>
                    <v-divider class="my-2"></v-divider>
                    <v-card-actions class="d-flex justify-center pb-6">
                        <v-btn color="success" outlined width="60%" :disabled="!valid" @click="login">Entrar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="loginSnackbar" :color="colorSnackbar"> {{ textSnakbar }} </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios'
  export default {
    data () {
      return {
        slides: [
          'http://3.23.131.0:3002/api/resource/web/session/9e9a6680ec341363a7a405cf2b96fd78.jpg',
          'http://3.23.131.0:3002/api/resource/web/session/343910bbb828a2a85ee08d85977b00bd.jpg',
          'http://3.23.131.0:3002/api/resource/web/session/53ee5b7a6874924c3c537f86469d1ee1.jpg'
        ],
        dialog: false,
        dialogLogin:false,
        showPassword:false,
        email:'',
        password:'',
        loginSnackbar:false,
        textSnakbar:'',
        colorSnackbar:'',
        valid:false,
        emailRules: [
            v => !!v || 'E-mail es requerido',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules:[
            v => !!v || 'Password es requerido'
        ],
        lazy:true
      }
    },
    methods: {
        login(){
            if(this.$refs.form.validate()){
                const params = new URLSearchParams()
                params.append('email',this.email)
                params.append('password',this.password)
                axios({
                    method:'post',
                    url: "http://3.23.131.0:3002/api/login",
                    data: params
                }).then((res) =>{
                    var response = res.data;                    
                    if(response.status=="success"){
                        this.textSnakbar="Bienvenido"
                        this.colorSnackbar="green"
                        this.loginSnackbar=true
                        localStorage.setItem('sesionInformation',JSON.stringify({
                            email_user:response.email,
                            id_user:response.id_user,
                            api_token:response.api_token
                        }))
                        localStorage.setItem('darkMode',false)
                        if (localStorage.getItem("sesionInformation") != null) {
                            this.$router.push({ name : 'main' })
                        }
                    }
                    if (response.status=="fail") {
                        this.textSnakbar=response.error
                        this.colorSnackbar="red"
                        this.loginSnackbar=true
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
  }
</script>
<style>
    .v-responsive__sizer{
        padding-bottom:0!important;
    }

    .container{
        position: absolute;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
 
    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        box-shadow: 10px;;
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: RGBA(108,179,102,0.4);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        box-shadow: 10px;;
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: RGBA(108,179,102,0.4);
    }
    .moreApps{
        background: linear-gradient(90deg, rgba(255,0,144,1) 0%, rgba(66,182,17,1) 100%);
    }
</style>