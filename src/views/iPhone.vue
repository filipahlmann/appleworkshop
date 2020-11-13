<template>
<v-container grid-list-lg>
<v-layout row class="info_box">
<v-flex xs12 sm12 md12 lg2 >
<v-sheet rounded="lg">
     <div class="ma-4" id="info">
  <h1 class="ma-2">
  Kategorier
  </h1>   
   
<v-list  >
  <router-link to="/iPhone" class="text-decoration-none" >
  <v-list-item   >
   
  iPhone
 
  </v-list-item>
 </router-link>
                <v-divider class="my-2"></v-divider>

  <router-link to="/iPad" class="text-decoration-none">
  
    <v-list-item>
  iPad
  </v-list-item></router-link>

                  <v-divider class="my-2"></v-divider>

  <router-link to="/Mac" class="text-decoration-none">
  <v-list-item>
  Mac
  </v-list-item></router-link>
</v-list>
</div>
</v-sheet>

</v-flex>
  <v-flex  xs12  sm12 md12  lg6>
    <v-sheet rounded="lg">

   <div class="ma-4" id="info">
  <h1 class="ma-2">
  Brugte iPhones
  </h1>        
  <v-simple-table id="menu_table">

    <template v-slot:default>

      <tbody>
        <tr v-for="item in iPhoneItems" :key="item.name" height="100px">
            
          <td id="td_menuitem_img">
            <v-img v-bind:src="item.image"></v-img>
          </td>
          <td>{{ item.name }}</td> 
          <td><b>{{ item.price}}</b></td>

          <td><v-btn class="pa-1"  @click="addToBasket(item)"> <v-icon>shopping_basket</v-icon> Køb</v-btn></td>

  

        </tr>
      </tbody>
    </template>
  </v-simple-table>
             </div>
      </v-sheet>
       
  </v-flex>

  <v-flex md12 sm12 lg4 xs12 >
    <v-sheet rounded="lg">
   <div class="ma-4" id="info">
  <h1 class="ma-2" id="info">
  Dine Vare
  </h1> 

  <v-row>
   <v-col> <div class="ma-0" id="info">
           <v-simple-table id="menu_table" v-if="basket.length > 0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"> Antal</th>
          <th class="text-left"> iPhone</th>
          <th class="text-left"> Tilføj til kurv</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in basket" :key="item.name">
          <td><v-icon color="blue" @click="increaseQtn(item)">add_box</v-icon>
          {{ item.quantity }}
          <v-icon color="blue" @click="decreaseQtn(item)">indeterminate_check_box</v-icon></td>

            <td>{{ item.name  }}</td>
                        <td>{{ item.price  }}</td>

           

        </tr>
      </tbody>
    </template>

  </v-simple-table> 
  <v-simple-table v-else>
       
  </v-simple-table>

       <v-row  id="basket_checkout" class="mt-4" style="margin:0;">
                    <v-col>
                        <p>Subtotal</p>
                        <p>Levering</p>
                        <p>Total</p>
                    </v-col>
                   
                    <v-col class="text-right">
                        <p>{{ subTotal }} DKK</p>
                        <p>10 DKK</p>
                        <p><b>{{ total }} DKK</b></p>
                    </v-col>
                </v-row>
                <v-row style="margin:0;">
                        <v-spacer></v-spacer>
  <div>
    <v-btn
      light
      color="blue"
      @click="snackbar = true, addCheckoutItem()"
    >
      Checkout
    </v-btn>

    <v-snackbar 
      v-model="snackbar"
      :timeout="timeout"
   color="blue"
    centered
    size="100"
    >
      {{ text }}

  
    </v-snackbar>
  </div>
                
                </v-row>
  

  </div>
  </v-col>
  
    </v-row>

</div>
         

   </v-sheet>

    </v-flex>
</v-layout>
</v-container>


</template>



<script>
/* eslint-disable */


import { dbiPhoneAdd } from '../../firebase'

  export default {
    data () {
      return {
        basketDump: [],
        dialog: false,
        snackbar: false,
        text: 'Tak for dit køb.',
        timeout: 1500,
      }
     
    },
     beforeCreate() {
      this.$store.dispatch('setiPhoneItems')
    },
    methods: {
      addCheckoutItem() {
        this.$store.dispatch('setCheckoutItem')
      },
      addToBasket(item) {
        /* if(this.basket.find(itemInArray => item.name === itemInArray.name)) {
          item = this.basket.find(itemInArray => item.name === itemInArray.name);
          this.increaseQtn(item);
        }
        else {
          this.basket.push({
            name: item.name,
            price: item.price,
            quantity: 1
          })
        } */
         this.basketDump.push({
            name: item.name,
            price: item.price,
            quantity: 1
          });
                
          this.$store.commit('addBasketItems', this.basketDump);
          this.basketDump = [];
      },
      increaseQtn(item) {
        item.quantity++
      },
      decreaseQtn(item) {
        item.quantity--;
        if (item.quantity === 0) {
          this.basket.splice(this.basket.indexOf(item), 1)
        }
      
      },
    },
    computed: {
      basket() {
        return this.$store.getters.getBasketItems
      },
      iPhoneItems () {
        return this.$store.getters.getiPhoneItems
      },
      subTotal () {
        var subCost = 0;
        for(var items in this.basket) {
          var individualItem = this.basket[items];
          subCost += individualItem.quantity * individualItem.price;
        }
        return subCost
      },
      total () {
        var deliveryPrice = 10;
        var totalCost = this.subTotal
        return totalCost + deliveryPrice
      },
     

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



#menu_item_description {
    font-weight: 300;
    font-style: italic;
    color: map-get($colorz, darkgrey );
    font-size: 13px;
}

#td_menuitem_img {
  max-width: 50px;
  max-height: 50px;
  padding: 0;
}
#td_menuitem_img2 {
  max-width: 300px;
  max-height: 300px;
  padding: 0;
}

#Basket_checkout {
    font-size: 13px;
}
#basket_checkout p:first-child {
    line-height: 2px;
}

.v-snack__content {
  justify-content: center;
}

.v-layout {
background-color: lightgray;
}

.v-list-item[data-v-12b4929f] {
text-decoration: none;
}

</style>