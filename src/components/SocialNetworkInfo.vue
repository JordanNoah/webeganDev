<template>
    <v-menu link v-model="menu" bottom right transition="scale-transition" origin="top left">
        <template v-slot:activator="{ on }">
            <v-chip pill v-on="on" class="ma-1 white--text" :style="color">
                <v-avatar left>
                    <v-img :src="require('../assets/images/'+icon)"/>
                </v-avatar>
                {{title}}
            </v-chip>
        </template>
        <v-card width="300">
            <v-list :style="color">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">John Leiderasd</v-list-item-title>
                        <v-list-item-subtitle class="white--text">{{title}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="menu = false" color="white">
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-list>
                <v-list-item @click="() => {}">
                    <v-list-item-subtitle v-if="link.length!=0">{{link}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-else>No posees ninguna cuenta asociada</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: 'SocialNetworkInfo',
    props:{
        icon:String,
        title:String,
        socialNetwork:String,
        link:String,
        color:String
    },
    data() {
        return {
            menu:false
        }
    },
}
</script>