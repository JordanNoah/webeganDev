<template>
  <div>
    <Tinder ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
      <template slot-scope="scope">
        <CardSocialNetwork :user="actualUsersCards[scope.data.id]"></CardSocialNetwork>
      </template>
      <img class="like-pointer" slot="like" src="@/assets/cards/like-txt.png">
      <img class="nope-pointer" slot="nope" src="@/assets/cards/nope-txt.png">
      <img class="super-pointer" slot="super" src="@/assets/cards/super-txt.png">
      <img class="rewind-pointer" slot="rewind" src="@/assets/cards/rewind-txt.png">
    </Tinder>
    <div class="btns">
      <img v-if="this.history.length!=0" src="@/assets/cards/rewind.png" @click="decide('rewind')">
      <img src="@/assets/cards/nope.png" @click="decide('nope')">
      <img src="@/assets/cards/super-like.png" @click="decide('super')">
      <img src="@/assets/cards/like.png" @click="decide('like')">
    </div>
  </div>
</template>

<script>
import axios from "axios"

import Tinder from "vue-tinder"
import CardSocialNetwork from "@/components/CardSocialNetwork.vue"
export default {
  name: "App",
  components: { Tinder, CardSocialNetwork },
  data: () => ({
    queue: [],
    history: [],
    offset:0,
    actualUsersCards:[]
  }),
  created() {
    this.mock();
  },
  methods: {
    mock() {
      var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
      axios({
        method:"get",
        url:"http://3.23.131.0:3002/api/getUserToCard/"+idUser,
      }).then((res)=>{
        const list = []
        var userToCard = res.data
        this.actualUsersCards = userToCard
        userToCard.forEach(() => {
          list.push({id:this.offset})
          this.offset++
        });
        this.queue = this.queue.concat(list)
      })
    },
    onSubmit({ type, item }) {
      var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
      if(type === "like"){
        this.$socket.emit('LIKE',this.actualUsersCards[item.id].idUser,idUser)
      } else if(type === "super"){
        this.$socket.emit('SUPER',this.actualUsersCards[item.id].idUser,idUser)
      } else if(type === "nope"){
        this.$socket.emit('NOPE', this.actualUsersCards[item.id].idUser,idUser)
      }
        // this.mock();
      this.history.push(item);
    },
    async decide(choice) {
      if (choice === "rewind") {
        if (this.history.length) {
          this.$refs.tinder.rewind([this.history.pop()]);
        }
      } else if (choice === "nope") {
        this.$refs.tinder.decide(choice);
      } else if (choice === "super") {
        this.$refs.tinder.decide(choice);
      } else if (choice === "like"){
        this.$refs.tinder.decide(choice);
      }
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  background-color: #20262e;
  overflow: hidden;
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 300px;
  max-width: 355px;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 64px;
  height: 64px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}
</style>
