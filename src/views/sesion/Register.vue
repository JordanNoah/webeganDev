<template>
    <v-container fluid pa-0>
        <v-app-bar flat dense color="rgba(108,179,102,0.4)">
            <v-row>
                <v-col cols="1" class="d-flex justify-start my-2" style="padding-top:0px!important;padding-bottom:0px!important">
                    <v-img src="http://3.23.131.0:3002/api/resource/web/icons/avocado.png" position="left" contain @click="$router.push({ name: 'loginRegister' })" style=""></v-img>
                </v-col>
                <v-col class="d-flex justify-end">
                    <p class="white--text mb-0 mr-2 d-flex align-center">¿Tienes cuenta?</p>
                    <v-btn depressed outlined color="white">Ven entra</v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-container fluid fill-height>
            <v-row class="d-flex justify-center">
                <v-col cols="12">
                    <p class="text-center font-weight-bold text-h5">Crea una nueva cuenta GRATIS!!!!</p>
                </v-col>
                <v-col class="col-6 col-md-4">
                    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                        <v-row no-gutters>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Nombres</p>
                                <v-text-field v-model="names" :rules="namesRules" dense outlined hide-details="false" required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Apellidos</p>
                                <v-text-field v-model="surnames" :rules="surnamesRules" dense outlined hide-details="false" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <p class="caption mb-0">Fecha de nacimiento</p>
                                <v-dialog ref="dialog" v-model="modalDate" :return-value.sync="dateBorn" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="dateBorn" :rules="dateBornRules" outlined dense prepend-icon="fas fa-calendar-day" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateBorn" locale="es-MX" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(dateBorn)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Pais</p>
                                <v-select v-model="country" :rules="countryRules" placeholder="Seleccione .." :items="countriesExist" outlined dense hide-details="flase"/>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Ciudad</p>
                                <v-select v-model="city" :rules="cityRules" placeholder="Seleccione .." :items="citiesExist" outlined dense hide-details="flase"/>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Género</p>
                                <v-row class="d-flex justify-center">
                                    <v-btn-toggle v-model="gender" rounded mandatory>
                                        <v-btn class="mx-2" value="hombre">
                                            <v-icon class="mr-2">fas fa-male</v-icon>
                                            Hombre
                                        </v-btn>
                                        <v-btn class="mx-2" value="mujer">
                                            <v-icon class="mr-2">fas fa-female</v-icon>
                                            Mujer
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Correo electrónico</p>
                                <v-text-field dense outlined hide-details="flase" v-model="email" :rules="emailRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="mb-3">
                                <p class="caption mb-0">Contraseña</p>
                                <v-text-field dense v-model="password" type="password" :rules="passwordRules" outlined hide-details="flase"></v-text-field>
                                <div class="my-2">
                                    <div class="d-flex my-1">
                                        <v-icon class="mx-2" v-if="passwordVlt1" color="green">fas fa-check-circle</v-icon>
                                        <v-icon class="mx-2" v-else color="red">fas fa-exclamation-circle</v-icon>
                                        <p class="mb-0">Minimo de ocho caracteres</p>
                                    </div>
                                    <div class="d-flex my-1">
                                        <v-icon class="mx-2" v-if="passwordVlt2" color="green">fas fa-check-circle</v-icon>
                                        <v-icon class="mx-2" v-else color="red">fas fa-exclamation-circle</v-icon>
                                        <p class="mb-0">Una letra mayúscula</p>
                                    </div>
                                    <div class="d-flex my-1">
                                        <v-icon class="mx-2" v-if="passwordVlt3" color="green">fas fa-check-circle</v-icon>
                                        <v-icon class="mx-2" v-else color="red">fas fa-exclamation-circle</v-icon>
                                        <p class="mb-0">Una letra minúscula</p>
                                    </div>
                                    <div class="d-flex">
                                        <v-icon class="mx-2" v-if="passwordVlt4" color="green">fas fa-check-circle</v-icon>
                                        <v-icon class="mx-2" v-else color="red">fas fa-exclamation-circle</v-icon>
                                        <p class="mb-0">Un número</p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <v-btn depressed width="100%" color="green" class="white--text" :disabled="!valid" @click="validate">Crear cuenta!!</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-col class="col-5 col-md-3">
                    <p class="text-subtitle-1 font-weight-bold text-center">O crea una cuenta con otra red social</p>
                    <v-btn class="mb-2" depressed width="100%"><v-icon class="mr-2">fab fa-facebook-f</v-icon> Facebook</v-btn>
                    <v-btn class="mb-2" depressed width="100%"><v-icon class="mr-2">fab fa-google</v-icon> Google</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="registerSnackbar" :color="colorSnackbar"> {{ textSnakbar }} </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios'
const countries = require ('countries-cities')
const getAge = require('age-by-birthdate')
export default {
    data: () =>({
        countriesExist : countries.getCountries(),
        country:'',
        citiesExist: [],
        city:'',
        modalDate:false,
        names:'',
        surnames:'',
        dateBorn:new Date().toISOString().substr(0, 10),
        email:'',
        gender:'hombre',
        password:'',
        namesRules: [
            v => !!v || 'El nombre es requerido'
        ],
        surnamesRules: [
            v => !!v || 'Los apellidos es requerido'
        ],
        dateBornRules:[
            v => getAge(v) > 18 || 'Debes ser mayor de edad' 
        ],
        countryRules:[
            v => !!v || 'De donde eres'
        ],
        cityRules:[
            v => !!v || 'De donde eres'
        ],
        emailRules: [
            v => !!v || 'E-mail es requerido',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules:[
            v => !!v || 'Password es requerido',
            v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Password',
        ],
        valid:true,
        passwordVlt1:false,
        passwordVlt2:false,
        passwordVlt3:false,
        passwordVlt4:false,
        lazy:true,
        registerSnackbar:false,
        textSnakbar:'',
        colorSnackbar:''
    }),
    beforeCreate: function(){
        if (localStorage.getItem("sesionInformation") != null) {
            this.$router.push({ name : 'main' })
        }
    },
    methods: {
        validate() {
            if(this.$refs.form.validate()){
                const params = new URLSearchParams()
                params.append('names',this.names)
                params.append('surnames',this.surnames)
                params.append('bornDate',this.dateBorn)
                params.append('gender',this.gender)
                params.append('country',this.country)
                params.append('city',this.city)
                params.append('email',this.email)
                params.append('password',this.password)
                axios({
                    method:"post",
                    url:"http://3.23.131.0:3002/api/signup",
                    data:params
                }).then((res) =>{
                    var response = res.data
                    console.log(response);
                    if (response.status=="fail") {
                        this.textSnakbar="Ya existe un usuario con el email "+this.email
                        this.colorSnackbar="red"
                        this.registerSnackbar=true
                    }
                    if (response.status=="success") {
                        this.textSnakbar="Bienvenido"
                        this.colorSnackbar="green"
                        this.registerSnackbar=true
                        localStorage.setItem('sesionInformation',JSON.stringify({
                            email_user:response.email,
                            id_user:response.id_user,
                            api_token:response.api_token
                        }))
                        if (localStorage.getItem("sesionInformation") != null) {
                            this.$router.push({ name : 'main' })
                        }
                    } 
                }).catch((error) =>{
                    console.log(error)
                })
            }
        }
    },
    watch:{
        password: function(){
            if(this.password.length>=8){
                this.passwordVlt1 = true
            }else{
                this.passwordVlt1 = false
            }
            var hasOneUpperCase = false
            var hasOneLowerCase = false
            var hasNumber = false
            var passToList = this.password.split('')
            for (const index in passToList) {
                if (!(/\d/.test(passToList[index]))) {
                    if (passToList[index]==passToList[index].toUpperCase()) {
                        hasOneUpperCase = true
                    }
                    if (passToList[index]==passToList[index].toLowerCase()) {
                        hasOneLowerCase = true
                    }
                }else{
                    hasNumber = true
                }
            }
            if (hasOneUpperCase) {
                this.passwordVlt2 = true
            } else {
                this.passwordVlt2 = false
            }
            if (hasOneLowerCase) {
                this.passwordVlt3 = true
            } else {
                this.passwordVlt3 = false
            }
            if (hasNumber) {
                this.passwordVlt4 = true
            } else {
                this.passwordVlt4 = false
            }
        },
        country:function(){
            this.citiesExist = countries.getCities(this.country)
        }
    }
}
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 10px;
    }
 
    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        box-shadow: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: RGBA(108,179,102,0.4);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        box-shadow: 10px;
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: RGBA(108,179,102,0.4);
    }
</style>