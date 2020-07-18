<template>
    <v-content>
        <v-navigation-drawer clipped fixed permanent app>
            <v-menu origin="top left" transition="scale-transition" :offset-x="true">
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item two-line link v-bind="attrs" v-on="on">
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
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
                <v-list-item link>Fotos</v-list-item>
                <v-list-item link>Encontrar</v-list-item>
                <v-list-item link>Mensajes</v-list-item>
                <v-list-item link>Matchs</v-list-item>
                <v-list-item link>Liked you</v-list-item>
                <v-list-item link>Visitors</v-list-item>
            </v-list>
            <template v-slot:append>
                <v-divider></v-divider>
                <div class="pa-2 my-2 d-flex justify-end">
                    <v-btn icon class="mx-4">
                        <v-badge color="green" content="+99">
                            <v-icon>
                                far fa-bell
                            </v-icon>
                        </v-badge>
                    </v-btn>
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
    </v-content>
</template>
<script>
import axios from 'axios'
export default {
    data: ()=>({
        snackbar : true,
    }),
    beforeCreate: function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        axios({
            method:'get',
            url: "http://3.23.131.0:3002/api/users/"+idUser,
        }).then((res)=>{
            this.$store.commit('saveUser',res.data.user)
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
    },
    methods: {
        pushConfig(){
            console.log();
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