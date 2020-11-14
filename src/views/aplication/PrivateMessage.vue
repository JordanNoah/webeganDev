<template>
  <div id="container">
    <div id="vertically-static-top">
      <v-app-bar color="deep-purple accent-4" dark>
        <v-avatar class="mr-2">
          <img :src="'http://3.23.131.0:3002'+profileImgFriend" />
        </v-avatar>
        <v-toolbar-title>{{friend.names}} {{friend.surnames}} {{friend.idUser}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>far fa-star</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>far fa-user-circle</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <div id="vertically-resizeable-middle">
      <div v-for="(message, index) in messages" :key="index">
        <div v-if="message.idReciver==$store.state.userInformation.idUser">
          <v-card outlined class="mb-2 mr-16 pa-0" color="red" width="fit-content">
            <v-card-text class="pa-2">
              {{message.message}}
            </v-card-text>
          </v-card>
        </div>
        <div class="d-flex flex-column align-end" v-else>
          <Message :message="message"/>
        </div>
      </div>
      <VEmojiPicker v-if="showEmoticons" showSearch @select="selectEmoji" style="position: absolute;bottom: 0;right: 0;"/>
    </div>
    <div id="vertically-static-bottom">
      <v-app-bar color="deep-purple accent-4 py-2" dark style="height:auto;" dense class="barMessage">
        <v-btn icon class="mr-2">
          <v-icon>far fa-image</v-icon>
        </v-btn>
          <v-textarea v-model="privateMessage" @click:append="clearSearch" ref="infoCompMessage" label="Mensaje" dense :auto-grow="autogrow" :no-resize="noresize" :rows="rows" outlined hide-details append-icon="far fa-grin-alt"></v-textarea>
        <v-btn icon class="ml-2" @click.stop="sendMessage()">
          <v-icon>fa-paper-plane</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <v-dialog v-model="dialogImage" max-width="480">
      <v-card>
        <v-card-text class="pb-0">
          <v-row>
              <v-col cols="12" class="d-flex justify-center">
                  <VueUploadMultipleImage v-model="images" :data-images="images" dragText="Arrastre la imagen" @upload-success="uploadImageSuccess" @before-remove="beforeRemove" browseText="(o) seleccione" primaryText="Principal" markIsPrimaryText="Establecer principal" popupText=""/>
              </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
                Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="saveImage()">
                Enviar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker'
import axios from 'axios'

import Message from '@/components/Message.vue'
export default {
  data() {
      return {
        privateMessage:'',
        rows:1,
        autogrow:false,
        noresize:true,
        showEmoticons:false,
        friend:[],
        profileImgFriend:'',
        messages:[
          {id:'1',message:'hola',statusMessage:'read',type:'text',idSender:'1',idReciver:'6',created:'20/14/19'},
          {id:'2',message:'quidem pariatur.',statusMessage:'read',type:'text',idSender:'6',idReciver:'1',created:'20/14/19'},
          {id:'3',message:'Repellendus ducimus cupiditate rerum officiis consequuntur laborum doloremque quaerat ipsa voluptates, nobis nam quis nulla ullam at corporis, similique ratione quasi illo!',statusMessage:'delivered',type:'text',idSender:'6',idReciver:'1',created:'20/14/19'},
          {id:'4',message:'https://parzibyte.me/blog/wp-content/uploads/2020/08/Conecta-4-Preguntar-si-se-desea-jugar-de-nuevo.png',statusMessage:'sended',type:'image',idSender:'6',idReciver:'1',created:'20/14/19'}
        ]
      }
  },
  sockets: {
    customEmit: function (data) {
      this.messages.push(data)
      this.autoScrollToEnd()
    }
  },
  components: {
    VEmojiPicker,
    Message
  },
  beforeCreate:function(){
    var idFriend = this.$route.params.idUser
    var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
    axios({
      method:'get',
      url: "http://3.23.131.0:3002/api/users/"+idFriend
    }).then((res)=>{
      this.friend=res.data.user
    })
    axios({
      method:'get',
      url: "http://3.23.131.0:3002/api/getProfileImg/"+idFriend
    }).then((res)=>{
      this.profileImgFriend=res.data.message
    })
    axios({
      method:'get',
      url:"http://3.23.131.0:3002/api/getUserMessages/"+idUser+"/"+idFriend
    }).then((res)=>{
      this.messages = res.data
    })
  },
  watch:{
    privateMessage:function(){
      if(this.privateMessage.length >= 150){
        this.rows = 4
        this.autogrow = false
        this.noresize = true
      }else{
        this.rows = 1
        this.autogrow = true
        this.noresize = false
      }
    }
  },
  methods:{
    clearSearch(){
      this.showEmoticons = !this.showEmoticons
    },
    selectEmoji(emoji){
      this.privateMessage= this.privateMessage+(emoji.data)
      console.log(this.privateMessage);
    },
    sendMessage(){
      var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
      var idFriend = this.$route.params.idUser
      this.$socket.emit('SEND_MESSAGE',idUser,idFriend,this.privateMessage,"text")
    },
    autoScrollToEnd(){
      var elem = document.getElementById ( "vertically-resizeable-middle" )
      elem.scrollTop = elem.scrollHeight
      console.log(elem.scrollHeight);
      // container = document.getElementById ( "scroll-target" )
      // container.scrollTop = Math.floor ( elem.offsetHeight )
    }
  }
}
</script>
<style>
.barMessage .v-toolbar__content{
  height: auto!important;
}
</style>

<style>
  #container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical!important;
  -webkit-box-direction: normal!important;
  -ms-flex-direction: column!important;
  flex-direction: column!important;
  height: 100%;
  width: 100%;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
}

#vertically-static-top,
#vertically-static-bottom {
  background-color: #80bdff;
  border-radius: .25rem;
  color: #fff;
}

#vertically-resizeable-middle {
  background-color: #957bbe;
  color: #fff;
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
}
</style>