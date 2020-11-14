<template>
    <v-container fluid py-0>
        <div class="d-flex flex-wrap justify-center my-2">
            <v-card min-width="150" min-height="150" link elevation="0" class="d-flex justify-center" outlined @click.stop="dialogImage=true">
                <div class="my-auto">
                    <v-card-text class="d-flex justify-center">
                        <v-icon>far fa-plus-square</v-icon>
                    </v-card-text>
                    <v-card-subtitle class="d-flex justify-center pt-0">
                        Añadir imagen
                    </v-card-subtitle>
                </div>
            </v-card>
            <v-card link outlined elevation="0" width="150" height="150" v-for="(image,index) in getImages" :key="image.idImage" @click.stop="watchCloser(index)" @mouseover="showByIndex=index">
                <v-img :src="'http://3.23.131.0:3002'+image.route" height="100%">
                    <div class="d-flex justify-end" v-if="showByIndex === index">
                        <v-menu transition="slide-y-transition" bottom right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon color="white">fas fa-ellipsis-v</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item link @click="setImgProfile(index)">
                                    <v-list-item-title>
                                        Perfil
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item link @click="selectedImage(index)">
                                    <v-list-item-title>
                                        Eliminar
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </v-img>
            </v-card>
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
        <v-dialog v-model="showImage" fullscreen>
            <v-card color="rgba(0, 0, 0, 0.7)">
                <div class="d-flex justify-end pa-1">
                    <v-btn icon color="white" @click.stop="closeDialog()"><v-icon>fas fa-times-circle</v-icon> </v-btn>
                </div>
                <v-carousel hide-delimiters hide-delimiter-background :show-arrows="false">
                    <v-carousel-item v-for="(image,index) in getImages" :key="index" reverse-transition="fade-transition" transition="fade-transition">
                        <v-img :src="'http://3.23.131.0:3002'+getImages[indexLooking].route" height="100%" width="100%" contain v-if="indexLooking!=null"/>
                        <v-img :src="'http://3.23.131.0:3002'+getImages[index].route" height="100%" width="100%" contain v-else/>
                    </v-carousel-item>
                </v-carousel>
                <v-slide-group mandatory>
                    <v-slide-item v-for="(image,index) in getImages" :key="index" v-slot:default="{ active, toggle }">
                        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="mx-1 my-3" height="75" width="75" @click="toggle" @click.stop="newImageIndex(index)">
                            <v-row class="fill-height" align="center" justify="center">
                                <v-scale-transition>
                                    <img :src="'http://3.23.131.0:3002'+getImages[index].route" height="auto" width="100%" style="position: absolute;"/>
                                </v-scale-transition>
                            </v-row>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-card>
        </v-dialog>
        <v-dialog v-model="removeImagen" persistent max-width="370">
            <v-card>
                <v-card-title class="headline">¿Desea eliminar esta imagen?</v-card-title>
                <v-card-text>Esta accion es irreversible</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">Cancelar</v-btn>
                <v-btn color="green darken-1" text @click="acceptRemove()">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="colorSnackbar">
            {{ textSnakcbar }}
        </v-snackbar>
    </v-container>
</template>
<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import {globalFunction} from '../../globalFunction.js'
import axios from 'axios'

export default {
    data:()=>({
        images:[],
        getImages:[],
        clear:false,
        dialogImage:false,
        showByIndex: null,
        showImage:false,
        indexLooking:null,
        removeImagen:false,
        imageWating:null,
        colorSnackbar:"error",
        textSnakcbar:"",
        snackbar:false
    }),
    beforeCreate:function(){
        var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
        axios({
            method:"get",
            url:"http://3.23.131.0:3002/api/userImages/"+idUser
        }).then((res)=>{
            this.getImages = res.data.images
        })
    },
    mixins:[globalFunction],
    methods:{
        callImages(){
            var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
            axios({
                method:"get",
                url:"http://3.23.131.0:3002/api/userImages/"+idUser
            }).then((res)=>{
                this.getImages = res.data.images
            })
        },
        uploadImageSuccess(formData, index, fileList) {
            this.images = fileList
        },
        saveImage(){
            this.images.forEach(element => {
                const params = new URLSearchParams()
                params.append('idUser',JSON.parse(localStorage.getItem('sesionInformation'))["id_user"])
                params.append('nameImage',element.name)
                params.append('pathImage',element.path)
                axios({
                    method:"post",
                    url:"http://3.23.131.0:3002/api/uploadImageUser",
                    data:params
                }).then(() => {
                    this.dialogImage=false
                    this.snackbar=true
                    this.colorSnackbar="success"
                    if(this.images.length>1){
                        this.textSnakcbar="imagenes guardadas"
                    }else{
                        this.textSnakcbar="imagen guardada"
                    }
                    this.images=[]
                    this.callImages()
                })
            })
        },
        beforeRemove (index, done, fileList) {
            done()
            this.images = fileList
        },
        watchCloser(index){
            this.indexLooking = index
            this.showImage = true
        },
        newImageIndex(index){
            this.indexLooking = index
            console.log(index);
        },
        closeDialog(){
            this.showImage = false
        },
        selectedImage(index){
            this.removeImagen = true
            this.imageWating = index
        },
        acceptRemove(){
            const params = new URLSearchParams()
            params.append('idUser',JSON.parse(localStorage.getItem('sesionInformation'))["id_user"])
            params.append('idImage',this.getImages[this.imageWating].idImage)

            axios({
                method:"post",
                url:"http://3.23.131.0:3002/api/removeImage",
                data:params
            }).then((res)=>{
                if (res.data.status=="success") {
                    this.callImages()
                    this.removeImagen = false
                }else{
                    this.callImages()
                    this.removeImagen = false
                }
            })
        },
        setImgProfile(index){
            const params = new URLSearchParams()
            var idUser = JSON.parse(localStorage.getItem('sesionInformation'))["id_user"]
            params.append('idUser',idUser)
            params.append('idImage',this.getImages[index].idImage)
            axios({
                method:"post",
                url:"http://3.23.131.0:3002/api/setImgProfile",
                data:params
            }).then((res)=>{
                if (res.data.status=="success") {
                    axios({
                        method:'get',
                        url: "http://3.23.131.0:3002/api/getProfileImg/"+idUser,
                    }).then((res)=>{
                        if(res.data.status=="success"){
                            this.$store.commit('saveProfileImage', res.data.message)
                        }else{
                            console.log("asd");
                        }
                        
                    })
                }
            })
        },
    },
    components:{
        VueUploadMultipleImage
    },
}
</script>