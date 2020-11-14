<template>
    <v-container fluid py-0>
        <v-row v-if="$store.state.likesRecived.length!=0">
            <v-col cols="12">
                <div class="text-h5 font-weight-medium">Likes</div>
                <v-divider></v-divider>
            </v-col>
            <v-col v-for="(card, index) in $store.state.likesRecived" :key="index" cols="2">
                <v-card elevation="9">
                    <v-img :src="'http://3.23.131.0:3002'+card.route" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                        <v-card-title>{{card.names}}</v-card-title>
                        <v-btn width="50%" depressed tile> <v-icon>fas fa-heart-broken</v-icon> </v-btn>
                        <v-btn width="50%" depressed tile @click.stop="match(card.idUserGive)"> <v-icon color="red">fas fa-heart</v-icon> </v-btn>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="$store.state.superRecived.length!=0">
            <v-col cols="12">
                <div class="text-h5 font-weight-medium">Super likes</div>
                <v-divider></v-divider>
            </v-col>
            <v-col v-for="(card, index) in $store.state.superRecived" :key="index" cols="2">
                <v-card elevation="9">
                    <v-img :src="'http://3.23.131.0:3002'+card.route" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                        <v-card-title>{{card.names}}</v-card-title>
                        <v-btn width="50%" depressed tile> <v-icon>fas fa-heart-broken</v-icon> </v-btn>
                        <v-btn width="50%" depressed tile @click.stop="match(card.idUserGive)"> <v-icon color="red">fas fa-heart</v-icon> </v-btn>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            items:[
                {idUser:1},
                {idUser:2},
                {idUser:3},
                {idUser:4},
                {idUser:5}
            ]
        }
    },
    beforeCreate:function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        axios({
            method:'get',
            url: "http://3.23.131.0:3002/api/getRecivedLike/"+idUser,
        }).then((res)=>{
            this.$store.commit('saveLikesRecived',res.data)
            console.log(res);
        })
        axios({
            method:'get',
            url: "http://3.23.131.0:3002/api/getRecivedSuper/"+idUser,
        }).then((res)=>{
            this.$store.commit('saveSuperRecived',res.data)
            console.log(res);
        })
    },
    methods:{
        match(idCardStatus){
            var userId = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
            this.$socket.emit('ADD_FRIEND',idCardStatus,userId)
        }
    }
}
</script>