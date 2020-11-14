<template>
    <v-content>
        <v-navigation-drawer clipped fixed permanent app>
            <v-menu origin="top left" transition="scale-transition" :offset-x="true">
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item two-line link v-bind="attrs" v-on="on">
                        <v-list-item-avatar v-if="$store.state.profileImage!=null">
                            <img :src="'http://3.23.131.0:3002'+$store.state.profileImage" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else color="green">
                            <span class="white--text headline" v-if="$store.state.userInformation.names!=null">{{initialNames($store.state.userInformation.names)}}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{$store.state.userInformation.names}}</v-list-item-title>
                            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <v-list>
                    <v-list-item link @click.stop="pushConfig()">
                        <v-list-item-icon>
                            <v-icon>fas fa-cogs</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Configuración</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>fas fa-sign-out-alt</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Salir</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-divider></v-divider>
            <v-list>
                <router-link :to="{ name: 'photo' }">
                    <v-list-item link :to="{ name: 'photo' }">Fotos</v-list-item>
                </router-link>
                <router-link :to="{ name: 'find' }">
                    <v-list-item link :to="{ name: 'find' }">Encontrar</v-list-item>
                </router-link>
                <router-link :to="{ name: 'message' }">
                    <v-list-item link :to="{ name: 'message' }">Mensajes</v-list-item>
                </router-link>
                <v-list-item link>Matchs</v-list-item>
                <router-link :to="{ name: 'like' }">
                    <v-list-item link :to="{ name: 'like' }">Likes</v-list-item>
                </router-link>
                <v-list-item link>Visitors</v-list-item>
            </v-list>
            <template v-slot:append>
                <v-divider></v-divider>
                <div class="pa-2 my-2 d-flex justify-end">
                    <v-menu top origin="top top" transition="scale-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge :content="$store.state.historyNotification.length" :value="$store.state.historyNotification.length" color="green" overlap>
                                <v-btn color="primary" dark icon v-bind="attrs" v-on="on">
                                    <v-icon>fas fa-bell</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>
                        <v-list dense>
                            <v-list-item v-for="(alert,index) in $store.state.historyNotification" :key="index" link>
                                <v-list-item-icon>
                                    <v-icon v-if="alert.kind==='super'">fas fa-heart</v-icon>
                                    <v-icon v-else-if="alert.kind==='like'">fab fa-gratipay</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="alert.message"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-btn icon @click.stop="changeMode()">
                        <v-icon v-if="JSON.parse($vuetify.theme.options.themeCache.get('darkMode'))">
                            fas fa-cloud-moon
                        </v-icon>
                        <v-icon v-else>
                            fas fa-sun
                        </v-icon>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <router-view></router-view>

        <v-snackbar v-model="snackbar" color="green"> Bienvenido de nuevo!! </v-snackbar>
        <div class="alertsAplication">
            <div v-for="(alert,index) in $store.state.newNotification" :key="index">
                <v-alert icon="fas fa-heart" dark color="blue" text dense elevation="8" v-if="alert.kind==='super'">
                    {{alert.message}}
                </v-alert>
                <v-alert icon="fab fa-gratipay" dark color="red" text dense elevation="8" v-else-if="alert.kind==='like'">
                    {{alert.message}}
                </v-alert>
            </div>
        </div>
    </v-content>
</template>
<script>
import axios from 'axios'
import {globalFunction} from '../../globalFunction.js'

export default {
    data: ()=>({
        snackbar : true,
    }),
    created:function(){
        document.addEventListener('beforeunload', this.handlerClose)
    },
    beforeCreate: function(){
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
                axios({
                    method:'get',
                    url: "http://3.23.131.0:3002/api/getProfileImg/"+idUser,
                }).then((res)=>{
                    if(res.data.status=="success"){
                        this.$store.commit('saveProfileImage', res.data.message)
                    }
                })
            }
        }).catch((error)=>{
            console.log(error);
        })
        this.$socket.emit('ID_USER_CONNECTED',idUser)
    },
    beforeDestroy:function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        this.$socket.emit('DISCONNECT',idUser)
    },
    sockets:{
        connect: function () {},
        disconnect:function(){}
    },
    mixins:[globalFunction],
    methods: {
        pushConfig(){
            if (this.$route.name!="configuration") {
                this.$router.push({ name: 'configuration'})
            }
        },
        changeMode(){
            var isDarkMode = JSON.parse(this.$vuetify.theme.options.themeCache.get('darkMode'))
            isDarkMode = !isDarkMode
            this.$vuetify.theme.options.themeCache.set('darkMode',isDarkMode)
            this.$vuetify.theme.dark = isDarkMode
        }
    }
}
</script>

<style scoped>
    .alertsAplication{
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .my-menu {
        margin-top: 40px;
        contain: initial;
        overflow: visible;
    }

    .my-menu::before {
        position: absolute;
        content: "";
        top: 0;
        right: 10px;
        transform: translateY(-100%);
        width: 10px; 
        height: 13px; 
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 13px solid #fff;
    }
</style>