<template>
<v-container>
<v-layout justify-center>
    <v-flex xs12 sm12 md10 lg10 >
<v-sheet rounded="lg" height="1000px"> 
    <v-layout justify-center>
     <div class="ma-4 pa-2" id="info">
   <h1 class="ma-2" >
  TILFØJ NYE PRODUKTER
  </h1>   

     <v-row>
         <v-col>
            <div class="pa-2" id="info" >

                 <v-text-field 
                 label="Produktnavn" 
                 required 
                 v-model="name">     
                </v-text-field>

                  <v-text-field 
                  label="Pris" 
                  required 
                  v-model="price">     
                </v-text-field> 
                 
                <v-file-input label="File input" @change="uploadImage"></v-file-input>

                <v-btn color="blue" class="pa-2" 

                @click="addNewiPhoneItem()"
                :disabled="btnDisable"
                > TILFØJ iPhone</v-btn>
                
                <v-btn color="blue" class="pa-2"
                @click="addNewiPadItem()"
                :disabled="btnDisable"
                >TILFØJ iPad</v-btn>   

                <v-btn color="blue" class="pa-2"
                @click="addNewMacItem()"
                :disabled="btnDisable"
                >TILFØJ MAC</v-btn>
    
                <v-btn color="incomplete" class="pa-2">
                    ANNULER
                </v-btn>
            </div>
            </v-col>
       </v-row>

</div>
</v-layout>
</v-sheet>
</v-flex>


</v-layout>


</v-container>
</template>

<script>

import { dbiPhoneAdd, dbiPadAdd, dbMacAdd, fb } from '../../../firebase'



  export default {
    data () {
      return {
        name: '',
        price: '',
        image: null,
      
    
      }
    },
    methods: {
        /* eslint-disable */

           uploadImage (e) {
           let file = e;
           console.log(e);  
           var storageRef = fb.storage().ref('products/'+ file.name);

            let uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', (snapshot) => {
            
            }, (error) => {
            // Handle unsuccessful uploads
            }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.image = downloadURL
                console.log('File available at', downloadURL);
            });
            });
           
       },
      addNewiPhoneItem() {
           dbiPhoneAdd.add({
               name: this.name,
               price: this.price,
               image: this.image
           })
           
       },
        addNewMacItem() {
           dbMacAdd.add({
               name: this.name,
               price: this.price,
               image: this.image
           })
           
       },
        addNewiPadItem() {
           dbiPadAdd.add({
               name: this.name,
               price: this.price,
               image: this.image
           })
           
       }

    }
  }
</script>


<style lang="scss" scoped >

.col:last-child h1{
    text-align: left;
}

#info {
    background-color: white;
}

tr td {
    padding: 10px 10px 10px 16px;
}

#menu_item_description {
    font-weight: 300;
    font-style: italic;
    color: map-get($colorz, darkgrey );
    font-size: 13px;
}

#Basket_checkout {
    font-size: 13px;
}
#basket_checkout p:first-child {
    line-height: 2px;
}


</style>