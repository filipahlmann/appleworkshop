<template>
<v-container grid-list-lg>
<v-layout row class="info_box">
<v-flex xs12 sm4 md4 lg4 >
<v-sheet rounded="lg">
     <div class="ma-4 pa-2" id="info">
  <h1 >
    Købt brugt elektronik med 2 årsgaranti
  </h1>
  <div>
    <p>
Vi giver altid 2 års garanti, når du køber brugt elektronik hos os. Det er nemlig vigtigt for os, at du føler dig i trygge hænder
    </p>
  </div>
</div>
</v-sheet>

</v-flex>
  <v-flex xs12 sm8 md8 lg8>
    <v-sheet rounded="lg">

   <div class="ma-4 pa-2" id="info">
   <h1>
        Refurbished iPhones 
        </h1>
      <div >
      <v-img src="./../assets/iPhoneSE.png" max-width="500" alt=""></v-img>
      </div>
             </div>
      </v-sheet>
       
  </v-flex>


</v-layout>
</v-container>











</template>

<script>
  export default {
    
  
  }
</script>

<style lang="scss">
 .info_box .flex h1 {
    @include infobox_mixin(0px, map-get($colorz, secondary), 10px, 5px, map-get($colorz, secondary));
    font-weight: bold;
    text-transform: uppercase;
    font-size: 16px;
    text-align: center;

  }

  .layout:first-child {
    height: 40vh;
  }

    .layout:last-child {
    height: 40vh;
  }
</style>