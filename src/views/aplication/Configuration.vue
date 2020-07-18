<template>
    <v-container fluid py-0>
        <v-row>
            <v-col cols="5">
                <v-row>
                    <v-col cols="12">
                        <p>Tu informacion</p>
                        <v-divider></v-divider>
                        <v-row no-gutters class="mt-2">
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Nombres</p>
                                <v-text-field outlined dense v-model="nombres"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Apellidos</p>
                                <v-text-field outlined dense v-model="apellidos"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Fecha de nacimiento</p>
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
                            <v-col cols="12" class="d-flex align-center mb-3">
                                <p class="caption mr-4 mb-0">Género</p>
                                <v-row class="d-flex justify-center">
                                    <v-btn-toggle v-model="gender" rounded mandatory>
                                        <v-btn value="hombre">
                                            <v-icon class="mr-2">fas fa-male</v-icon>
                                            Hombre
                                        </v-btn>
                                        <v-btn value="mujer">
                                            <v-icon class="mr-2">fas fa-female</v-icon>
                                            Mujer
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Pais</p>
                                <v-select v-model="country" placeholder="Seleccione .." :items="countries" item-text="name" outlined dense/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Tu cuenta</p>
                        <v-divider></v-divider>
                        <v-row no-gutters class="mt-2">
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Email</p>
                                <v-text-field outlined dense v-model="email"></v-text-field>
                            </v-col>
                            <v-row no-gutters>
                                <v-col cols="12" class="d-flex align-center" v-if="!changePassword" @click.stop="dialogsPassword=true">
                                    <p class="caption mr-4">Contraseña</p>
                                    <v-text-field outlined dense value="thisisapassword" type="password" readonly></v-text-field>
                                </v-col>
                                <v-col cols="12" class="mb-3" v-else>
                                    <div>
                                        <div class="d-flex align-center mb-3">
                                            <p class="caption mb-0 mr-4">Contraseña</p>
                                            <v-text-field dense v-model="password" type="password" :rules="passwordRules" outlined hide-details="flase"></v-text-field>
                                        </div>
                                        <div class="d-flex align-center">
                                            <p class="caption mb-0 mr-4">Confirmar contraseña</p>
                                            <v-text-field dense v-model="repeatPassword" type="password" :rules="passwordRepeatRules" outlined hide-details="flase"></v-text-field>
                                        </div>
                                    </div>
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
                            </v-row>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Tus intereses</p>
                        <v-autocomplete v-model="interests" :items="interest" filled chips color="blue-grey lighten-2" label="Select" multiple outlined dense>
                            <template v-slot:selection="data">
                                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="removeInterest(data.item)">
                                    {{ data.item }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Información personal</p>
                        <v-col cols="12" class="d-flex align-center">
                            <p class="caption mr-4">Cuentanos algo sobre ti</p>
                            <v-textarea v-model="description" auto-grow outlined dense placeholder="Escribelo aqui ..."></v-textarea>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center">
                            <p class="caption mr-4">Relación</p>
                            <v-select v-model="relationship" outlined dense :items="relationshipItems" placeholder="Seleccione..."></v-select>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center">
                            <p class="caption mr-4">Trabajo</p>
                            <v-text-field v-model="job" outlined dense></v-text-field>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Lenguaje</p>
                        <v-autocomplete v-model="language" :items="languajesExist" item-text="language" filled chips color="blue-grey lighten-2" label="Select" multiple outlined dense>
                            <template v-slot:selection="data">
                                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="removeLanguage(data.item.language)">
                                    {{ data.item.language }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Otros perfiles</p>
                        <v-row no-gutters class="mt-2">
                            <v-col>
                                <v-list two-line subheader>
                                    <v-list-item v-for="profile in otherProfiles" :key="profile.title" link>
                                        <v-list-item-avatar>
                                            <img :src="require('../../assets/images/'+profile.icons)"/>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{profile.title}}</v-list-item-title>
                                            <v-list-item-subtitle>{{profile.subTitle}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn depressed v-if="profile.link.length!=0">
                                                unLink
                                            </v-btn>
                                            <v-btn depressed v-else>
                                                Link
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="7">
                <div>
                    <v-card class="mx-auto" max-width="70%" height="500px" v-if="!showAllInformation">
                        <v-carousel hide-delimiter-background hide-delimiters show-arrows-on-hover progress height="100%">
                            <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                        <v-btn icon color="pink" class="showEverything" @click.stop="showAllInformation= !showAllInformation">
                            <v-icon>fas fa-info-circle</v-icon>
                        </v-btn>
                        <v-container class="someInfoUser">
                            <v-card-title class="white--text">
                                {{this.$store.state.userInformation.names}}
                                {{this.$store.state.userInformation.surnames}}
                            </v-card-title>
                            <v-card-text class="text--primary">
                                <div class="white--text">
                                    {{this.$store.state.userInformation.description}}
                                </div>
                            </v-card-text>
                        </v-container>
                    </v-card>
                    <v-card class="mx-auto overflow-y-auto" max-width="70%" height="500px" v-else-if="showAllInformation">
                        <v-container>
                            <v-btn icon color="pink" class="showEverything" @click.stop="showAllInformation= !showAllInformation">
                                <v-icon>fas fa-circle-notch</v-icon>
                            </v-btn>
                            <div class="basicInformation">
                                <v-card-title>
                                    {{this.$store.state.userInformation.names}}
                                    {{this.$store.state.userInformation.surnames}},
                                    {{(this.age)}}
                                </v-card-title>
                                <v-card-subtitle class="py-1">
                                    <v-icon class="mr-1" v-if="this.$store.state.userInformation.gender=='hombre'">
                                        fas fa-male
                                    </v-icon>
                                    <v-icon class="mr-1" v-else>
                                        fas fa-female
                                    </v-icon>
                                    {{this.$store.state.userInformation.gender}}
                                </v-card-subtitle>
                                <v-card-subtitle class="py-1">
                                    <v-icon class="mr-1">
                                        fas fa-map-marker-alt
                                    </v-icon>
                                    {{this.$store.state.userInformation.country}}
                                </v-card-subtitle>
                            </div>
                            <div class="descriptionUser" v-if="this.$store.state.userInformation.description!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Conoce algo sobre mi
                                </v-card-title>
                                <v-card-subtitle class="py-1">
                                    {{this.$store.state.userInformation.description}}
                                </v-card-subtitle>
                            </div>
                            <div class="otherSocialNetwork">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Mis otras redes
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(profile, i) in otherProfiles" :key="i">
                                        <SocialNetworkInfo :title="profile.title" :link="profile.link" :icon="profile.icons" :color="profile.color"/>
                                    </div>
                                </v-card-text>
                            </div>
                            <div>
                                <v-divider></v-divider>
                                <v-card-title>
                                    Mis intereses
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(interest, i) in interests" :key="i">
                                        <v-chip outlined>{{interest}}</v-chip>
                                    </div>
                                </v-card-text>
                            </div>
                            <div>
                                <v-divider></v-divider>
                                <v-card-title>
                                    Idiomas
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(language, i) in language" :key="i">
                                        <v-chip outlined>{{language}}</v-chip>
                                    </div>
                                </v-card-text>
                            </div>
                        </v-container>
                    </v-card>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogsPassword" max-width="400">
            <v-card>
                <v-card-title class="headline">¿Deseas cambiar la contraseña?</v-card-title>
                <v-card-text>
                    Recuerda que hacer esto cerrara todas tus cuentas para mayor seguridad
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialogsPassword = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialogsPassword = false;changePassword=true;">
                        Cambiar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-expand-x-transition>
            <v-bottom-navigation v-show="expandSave" class="d-flex justify-end" style="position:sticky" color="white" v-if="hasChange">
                <v-btn text color="error"><span class="red--text">Cancelar</span></v-btn>
                <v-btn text color="success"><span class="green--text">Guardar</span></v-btn>
            </v-bottom-navigation>
        </v-expand-x-transition>
    </v-container>
</template>

<script>
import SocialNetworkInfo from '@/components/SocialNetworkInfo.vue'

const getAge = require('age-by-birthdate')
const countryList = require('country-list')
const interests = require('interest-list')()
const languages = require('language-list')()

export default {
    data:()=>({
        hasChange:false,
        expandSave:true,
        nombres:'',
        apellidos:'',
        description:'',
        modalDate:false,
        dateBorn:'',
        slides: [
            'http://3.23.131.0:3002/api/resource/web/session/9e9a6680ec341363a7a405cf2b96fd78.jpg',
            'http://3.23.131.0:3002/api/resource/web/session/343910bbb828a2a85ee08d85977b00bd.jpg',
            'http://3.23.131.0:3002/api/resource/web/session/53ee5b7a6874924c3c537f86469d1ee1.jpg'
        ],
        dateBornRules:[
            v => getAge(v) > 18 || 'Debes ser mayor de edad' 
        ],
        gender:'',
        country:'',
        countries : countryList.getData(),
        email:'',
        changePassword:false,
        dialogsPassword:false,
        interests:'',
        relationship:'',
        job:'',
        password:'',
        repeatPassword:'',
        language:'',
        passwordRepeatRules:[
            v => !!v || 'Password es requerido'
        ],
        passwordRules:[
            v => !!v || 'Password es requerido',
            v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Password',
        ],
        passwordVlt1:false,
        passwordVlt2:false,
        passwordVlt3:false,
        passwordVlt4:false,
        otherProfiles:[
            {icons:'facebook.jpg',title:'Facebook',subTitle:'Jan 9, 2014',link:'a',color:'background:#3b5998;'},
            {icons:'instagram.jpg',title:'Instagram',subTitle:'Jan 9, 2014',link:'',color:'background: linear-gradient(90deg, rgba(221,42,123,1) 0%, rgba(129,52,175,1) 50%, rgba(81,91,212,1) 100%);'},
            {icons:'google.jpg',title:'Google',subTitle:'Jan 9, 2014',link:'a',color:'background:#ff4a35;'},
            {icons:'twitter.jpg',title:'Twitter',subTitle:'Jan 9, 2014',link:'a',color:'background:#1DA1F2;'},
            {icons:'youtube.jpg',title:'Youtube',subTitle:'Jan 9, 2014',link:'a',color:'background:#FF0000;'},
            {icons:'whatsapp.jpg',title:'Whatsapp',subTitle:'Jan 9, 2014',link:'a',color:'background:#00bb2d;'},
        ],
        showAllInformation:false,
        menu: false,
        age:'',
        relationshipItems:[
            'En una relación',
            'Soltero'
        ],
        interest:interests.getData(),
        languajesExist:languages.getData()
    }),
    components:{
        SocialNetworkInfo
    },
    created: function(){
        var userInfo = this.$store.state.userInformation
        this.nombres=userInfo.names
        this.apellidos=userInfo.surnames
        this.dateBorn=userInfo.bornDate
        this.gender=userInfo.gender
        this.country=userInfo.country
        this.email=userInfo.email
        this.age=getAge(this.dateBorn).toString()
        this.description=userInfo.description
        this.job=userInfo.job
    },
    watch:{
        nombres:function(){
            this.hasBeingChange()
        },
        apellidos:function(){
            this.hasBeingChange()
        },
        dateBorn:function(){
            this.hasBeingChange()
        },
        gender:function(){
            this.hasBeingChange()
        },
        country:function(){
            this.hasBeingChange()
        },
        email:function() {
            this.hasBeingChange()
        },
        repeatPassword:function(){
            this.hasBeingChange()
        },
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
            this.hasBeingChange()
        }
    },
    methods:{
        hasBeingChange(){
            var userInfo = this.$store.state.userInformation
            if(this.nombres!=userInfo.names || this.apellidos!=userInfo.surnames || this.dateBorn!=userInfo.bornDate || this.gender!=userInfo.gender || this.country!=userInfo.country || this.email!=userInfo.email || (this.repeatPassword!="" && this.password!="")){
                this.hasChange=true
            }else{
                this.hasChange=false
            }
        },
        change(){
            console.log("asd");
        },
        removeInterest (item) {
            const index = this.interests.indexOf(item)
            if (index >= 0) this.interests.splice(index, 1)
        },
        removeLanguage (item) {
            const index = this.language.indexOf(item)
            if (index >= 0) this.language.splice(index, 1)
        }
    }
}
</script>
<style>
    .v-input__slot{
        margin: 0px!important;
    }
    .v-text-field__details{
        margin: 0px!important;
    }
    .v-carousel__progress {
        margin: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
    }
    .someInfoUser{
        margin: 0;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .showEverything{
        margin: 10px;
        position: absolute;
        right: 0;
        top: 0;
    }
</style>