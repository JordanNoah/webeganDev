<template>
    <v-content class="fill-height pa-0">
        <v-container fluid fill-height class="pa-0">
            <router-view></router-view>
        </v-container>
        <v-navigation-drawer right fixed app mini-variant mini-variant-width="100" permanent clipped>
            <v-list>
                <p class="text-center">Friends</p>
                <v-list-item v-for="item in friends" :key="item.title" :to="{ name: 'privateMessage', params: { idUser: item.One!=null?item.One.idUser:item.Two.idUser }}" class="my-1">
                    <v-list-item-content>
                        <v-list-item-avatar v-if="item.One!=null">
                            <img :src="'http://3.23.131.0:3002'+item.One.user_images[0].route" />
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <img :src="'http://3.23.131.0:3002'+item.Two.user_images[0].route" />
                        </v-list-item-avatar>
                        <v-list-item-subtitle class="text-center" v-if="item.One!=null">{{item.One.names}}</v-list-item-subtitle>
                        <v-list-item-subtitle class="text-center" v-else>{{item.Two.names}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-content>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            friends: [],
        }
    },
    beforeCreate:function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        axios({
            method:'get',
            url: "http://3.23.131.0:3002/api/getFriends/"+idUser
        }).then((res)=>{
            console.log(res);
            this.friends=res.data
        })
    }
}
</script>