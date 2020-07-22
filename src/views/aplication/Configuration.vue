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
                                <v-select v-model="country" placeholder="Seleccione .." :items="countriesExist" item-text="name" outlined dense/>
                            </v-col>
                            <v-col cols="12" class="d-flex align-center">
                                <p class="caption mr-4">Ciudad</p>
                                <v-select v-model="city" placeholder="Seleccione .." :items="citiesExist" item-text="name" outlined dense/>
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
                        <v-autocomplete v-model="interests" :items="interestList" filled chips color="blue-grey lighten-2" placeholder="Select" multiple outlined dense>
                            <template v-slot:selection="data">
                                <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" class="my-1" @click:close="removeInterest(data.item)">
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
                            <v-select v-model="job" outlined dense :items="jobList" placeholder="Seleccione..."></v-select>
                        </v-col>
                        <v-col cols="12" class="d-flex align-center">
                            <p class="caption mr-4">Estilo de vida</p>
                            <v-select v-model="lifeStile" outlined dense :items="lifeStileExist" placeholder="Seleccione..."></v-select>
                        </v-col>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-divider></v-divider>
                        <p class="mt-4">Lenguaje</p>
                        <v-autocomplete v-model="language" :items="languajesExist" item-text="language" filled chips color="blue-grey lighten-2" placeholder="Select" multiple outlined dense>
                            <template v-slot:selection="data">
                                <v-chip v-bind="data.attrs" :input-value="data.selected" class="my-1" close @click="data.select" @click:close="removeLanguage(data.item.language)">
                                    {{ data.item.language }}
                                </v-chip>
                            </template>
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" v-if="otherProfiles.length!=0">
                        <v-divider></v-divider>
                        <p class="mt-4">Otros perfiles</p>
                        <v-row no-gutters class="mt-2">
                            <v-col>
                                <v-list two-line subheader>
                                    <v-list-item v-for="(profile,index) in otherProfiles" :key="profile.title" link>
                                        <v-list-item-avatar>
                                            <img :src="require('../../assets/images/'+profile.icon)"/>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{profile.title}}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn depressed v-if="profile.link!=null" @click.stop="unLink(index)">
                                                unLink
                                            </v-btn>
                                            <v-btn depressed v-else @click.stop="link(index)">
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
                <div class="showCard">
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
                            <v-btn icon color="pink" class="reportProfile" >
                                <v-icon>fas fa-flag</v-icon>
                            </v-btn>
                            <div class="basicInformation">
                                <v-card-title>
                                    {{this.nombres}}
                                    {{this.apellidos}},
                                    {{(this.age)}}
                                </v-card-title>
                                <v-card-subtitle class="py-1">
                                    <v-icon class="mr-1" v-if="this.gender=='hombre'">
                                        fas fa-male
                                    </v-icon>
                                    <v-icon class="mr-1" v-else>
                                        fas fa-female
                                    </v-icon>
                                    {{this.gender}}
                                </v-card-subtitle>
                                <v-card-subtitle class="py-1">
                                    <v-icon class="mr-1">
                                        fas fa-globe-asia
                                    </v-icon>
                                    {{this.country}}
                                </v-card-subtitle>
                                <v-card-subtitle class="py-1">
                                    <v-icon class="mr-1">
                                        fas fa-city
                                    </v-icon>
                                    {{this.city}}
                                </v-card-subtitle>
                            </div>
                            <div v-if="description!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Algo sobre mi
                                </v-card-title>
                                <v-card-text>
                                    {{description}}
                                </v-card-text>
                            </div>
                            <div v-if="lifeStile!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                   Actualmente soy
                                </v-card-title>
                                <v-card-text>
                                    {{lifeStile}}
                                </v-card-text>
                            </div>
                            <div v-if="relationship!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Estoy actualmente
                                </v-card-title>
                                <v-card-text>
                                    {{relationship}}
                                </v-card-text>
                            </div>
                            <div class="otherSocialNetwork" v-if="otherProfiles.length!=0">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Mis otras redes
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(profile, i) in otherProfiles" :key="i">
                                        <SocialNetworkInfo :title="profile.title" :link="profile.link" :icon="profile.icon" :color="profile.color"/>
                                    </div>
                                </v-card-text>
                            </div>
                            <div v-if="interests!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Mis intereses
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(interest, i) in interests" :key="i" class="ma-1">
                                        <v-chip outlined>{{interest}}</v-chip>
                                    </div>
                                </v-card-text>
                            </div>
                            <div v-if="language!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Idiomas
                                </v-card-title>
                                <v-card-text class="d-flex flex-wrap">
                                    <div v-for="(language, i) in language" :key="i" class="ma-1">
                                        <v-chip outlined>{{language}}</v-chip>
                                    </div>
                                </v-card-text>
                            </div>
                            <div v-if="job!=null">
                                <v-divider></v-divider>
                                <v-card-title>
                                    Trabajo
                                </v-card-title>
                                <v-card-text>
                                    {{job}}
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
        <v-dialog v-model="dialogProfile" max-width="400">
            <v-card :style="otherProfiles[profileChange]['color']" v-if="otherProfiles.length!=0">
                <v-card-title class="headline white--text">{{otherProfiles[profileChange]['title']}}</v-card-title>
                <v-card-text>
                    <v-text-field outlined dense color="white" background-color="white" v-model="linkChange"></v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn color="red" depressed class="white--text" @click.stop="">
                        Cancel
                    </v-btn>
                    <v-btn color="green" depressed class="white--text" @click.stop="saveProfile()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-expand-x-transition>
            <v-bottom-navigation v-show="expandSave" class="d-flex justify-end" style="position:sticky" color="white" v-if="hasChange">
                <v-btn text color="error"><span class="red--text">Cancelar</span></v-btn>
                <v-btn text color="success"><span class="green--text" @click.stop="saveConfig()">Guardar</span></v-btn>
            </v-bottom-navigation>
        </v-expand-x-transition>
    </v-container>
</template>

<script>
import SocialNetworkInfo from '@/components/SocialNetworkInfo.vue'
import axios from 'axios'

const getAge = require ('age-by-birthdate')
const countries = require ('countries-cities')
const jobs = require ('professions')

const interests = require ('interest-list')()
const languages = require ('language-list')()

export default {
    data:()=>({
        hasChange:false,
        expandSave:true,
        nombres:null,
        apellidos:null,
        description:null,
        modalDate:false,
        dateBorn:null,
        slides: [
            'http://3.23.131.0:3002/api/resource/web/session/9e9a6680ec341363a7a405cf2b96fd78.jpg',
            'http://3.23.131.0:3002/api/resource/web/session/343910bbb828a2a85ee08d85977b00bd.jpg',
            'http://3.23.131.0:3002/api/resource/web/session/53ee5b7a6874924c3c537f86469d1ee1.jpg'
        ],
        dateBornRules:[
            v => getAge(v) > 18 || 'Debes ser mayor de edad' 
        ],
        gender:null,
        country:null,
        countriesExist : countries.getCountries(),
        citiesExist: [],
        city:null,
        email:null,
        changePassword:false,
        dialogsPassword:false,
        interests:null,
        relationship:null,
        job:null,
        jobList:[],
        password:null,
        repeatPassword:null,
        language:null,
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
        lifeStile:null,
        lifeStileExist:[
            'Vegano',
            'Vegetariano',
            'En transición'
        ],
        otherProfiles:[],
        showAllInformation:false,
        menu: false,
        age:null,
        relationshipItems:[
            'En una relación',
            'Soltero'
        ],
        interestList:interests.getData(),
        languajesExist:languages.getData(),
        dialogProfile:false,
        profileChange:0,
        linkChange:null
    }),
    components:{
        SocialNetworkInfo
    },
    beforeCreate: function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        axios({
            method:"get",
            url:"http://3.23.131.0:3002/api/otherSocial/"+idUser
        }).then((res)=>{
            this.otherProfiles = res.data.message
        }).catch((error)=>{
            console.log(error);
        })
    },
    created: function(){
        var userInfo = this.$store.state.userInformation
        console.log(userInfo.interests);
        this.nombres=userInfo.names
        this.apellidos=userInfo.surnames
        this.dateBorn=userInfo.bornDate
        this.gender=userInfo.gender
        this.country=userInfo.country
        this.city=userInfo.city
        this.interests=(userInfo.interests).split(",")
        this.relationship=userInfo.relationship
        this.lifeStile=userInfo.lifeStyle
        this.language=(userInfo.language).split(",")
        this.email=userInfo.email
        this.age=getAge(this.dateBorn).toString()
        this.description=userInfo.description
        this.job=userInfo.job
        this.jobList=jobs
    },
    watch:{
        nombres:function(){
            this.hasBeingChange()
        },
        apellidos:function(){
            this.hasBeingChange()
        },
        dateBorn:function(){
            this.age=getAge(this.dateBorn).toString()
            this.hasBeingChange()
        },
        gender:function(){
            this.hasBeingChange()
        },
        country:function(){
            this.hasBeingChange()
            this.citiesExist = countries.getCities(this.country)
        },
        city:function(){
            this.hasBeingChange()
        },
        email:function() {
            this.hasBeingChange()
        },
        repeatPassword:function(){
            this.hasBeingChange()
        },
        interests:function(){
            console.log(this.interests)
            this.hasBeingChange()
        },
        job:function(){
            this.hasBeingChange()
        },
        description:function(){
            if(this.description!=null){
                if(this.description.length==0){
                    this.description=null
                }
            }
            this.hasBeingChange()
        },
        relationship:function () {
            if(this.relationship!=null){
                if(this.relationship.length==0){
                    this.relationship=null
                }
            }
            this.hasBeingChange()
        },
        lifeStile:function(){
            this.hasBeingChange()
        },
        language:function(){
            this.hasBeingChange()
        },
        otherProfiles:{
            deep: true,
            handler(){
                this.hasBeingChange()
            }
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
            if (this.nombres!=userInfo.names || this.apellidos!=userInfo.surnames ||
                this.dateBorn!=userInfo.bornDate || this.gender!=userInfo.gender ||
                this.country!=userInfo.country || this.city != userInfo.city ||
                this.email!=userInfo.email || 
                (this.repeatPassword!=null && this.password!=null && this.repeatPassword==this.password &&
                    this.passwordVlt1 && this.passwordVlt2 && this.passwordVlt3 && this.passwordVlt4) ||
                this.interests != userInfo.interests || this.description != userInfo.description ||
                this.relationship != userInfo.relationship || this.job != userInfo.job || 
                this.lifeStile != userInfo.lifeStyle || this.language != userInfo.language ||
                JSON.stringify(this.otherProfiles)!=JSON.stringify(this.$store.state.otherSocialNetwork)) {
                this.hasChange=true
            } else {
                this.hasChange=false
            }
        },
        removeInterest (item) {
            const index = this.interests.indexOf(item)
            if (index >= 0) this.interests.splice(index, 1)
            if(this.interests.length==0){
                this.interests=null
            }
        },
        removeLanguage (item) {
            const index = this.language.indexOf(item)
            if (index >= 0) this.language.splice(index, 1)
            if(this.language.length==0){
                this.language=null
            }
        },
        link(index){
            this.dialogProfile = true
            this.profileChange = index
            this.linkChange = this.otherProfiles[this.profileChange]["link"]
        },
        unLink(index){
            this.profileChange = index
            this.otherProfiles[this.profileChange]["link"]=null
        },
        saveProfile(){
            this.dialogProfile = false
            this.otherProfiles[this.profileChange]["link"]=this.linkChange
        },
        saveConfig(){
            var socialNetworks = []
            this.otherProfiles.forEach(element => {
                var obj = new Object()
                obj.idSocialNetwork = element.idSocialNetwork
                obj.link = element.link
                socialNetworks.push(obj)
            });
            const params = new URLSearchParams()
            params.append('idUser',JSON.parse(localStorage.getItem('sesionInformation'))["id_user"])
            params.append('nombres',this.nombres)
            params.append('apellidos',this.apellidos)
            params.append('dateBorn',this.dateBorn)
            params.append('gender',this.gender)
            params.append('country',this.country)
            params.append('city',this.city)
            params.append('email',this.email)
            params.append('password',this.repeatPassword)
            params.append('interests',this.interests)
            params.append('job',this.job)
            params.append('description',this.description)
            params.append('relationship',this.relationship)
            params.append('lifeStyle',this.lifeStile)
            params.append('language',this.language)
            params.append('otherProfiles',JSON.stringify(socialNetworks))
            params.append('password',this.password)
            axios({
                method:"post",
                url:"http://3.23.131.0:3002/api/configProfile",
                data:params
            }).then((res) =>{
                var data = res.data
                if(data.status=="success"){
                    this.askForUserData()
                }
            })
        },
        askForUserData(){
            var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
            axios({
                method:'get',
                url: "http://3.23.131.0:3002/api/users/"+idUser,
            }).then((res)=>{
                if(res.data.status=="fail"){
                    this.$store.commit('saveUser',[])
                    localStorage.clear()
                }else{
                    this.$store.commit('saveUser',res.data.user)
                    axios({
                        method:"get",
                        url:"http://3.23.131.0:3002/api/otherSocial/"+idUser
                    }).then((res)=>{
                        this.$store.commit('saveSocialNetwork',res.data.message)
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
            }).catch((error)=>{
                console.log(error);
            })
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
    .showCard{
        display: block;
        position: fixed;
        height: 500px;
        width: 46%;
    }
</style>