<template>
<v-container grid-list-lg>

    <v-layout row class="info_box">
  <v-flex xs12 sm12 md8 lg8>
    <v-sheet rounded="lg">
   <div class="ma-4 pa-2" id="info">
            <h1 class="ma-2">Ordre</h1>
            <div class="ma-5" id="info">
                <v-row class="ma-0">
                    <v-col cols="12" md="1" class="pa-2">
                        <p class="font-weight-bold body-1 pl-1 darkgrey--text">
                            INFO:
                        </p>
                    </v-col>
                    <v-col cols="12" md="5" class="pa-2 pl-5">
                    
                    <v-row align="center">
                        <div id="status_box" class="blue">COMPLETED</div>
                        <span class="font-weight-light caption pl-1"> Done </span>
                    </v-row>

                    <v-row align="center">
                        <div id="status_box" class="orange">IN-PROGRESS</div>
                        <span class="font-weight-light caption pl-1"> Somebody is working on it </span>
                    </v-row>

                    <v-row align="center">
                        <div id="status_box" class="red">NOT STARTED</div>
                        <span class="font-weight-light caption pl-1"> Not started yet </span>
                    </v-row>

                    </v-col>    
                     <v-col cols="12" md="6" class="pa-2">
                        <v-row>
                        <div id="status_box" class="blue">COMPLETED</div>
                        <div id="status_box" class="orange">IN-PROGRESS</div>
                        <div id="status_box" class="red">NOT STARTED</div>
                        </v-row>
                        <v-row>
                        <p class="font-weight-light caption pl-1">
                            <b>Enkelt</b> For gå videre til næste stadie <br>
                            <b>Dobbelt-click</b> For at genstarte
                        </p>
                        <span class="font-weight-light caption pl-1">
                            <v-icon color="grey">
                      archives</v-icon>
                            Archieve to hide
                        </span>
                        </v-row>



                    </v-col>  
                </v-row>   
         



            </div>
            <!-- Orders list area -->
    <div class="ma-5 mt-1" id="info">
      
    <p class="font-weight-bold body-1 pl-1 darkgrey--text">
    ORDRE:
    </p>
    <v-simple-table id="menu_table">

      <thead>
        <tr>
          <th class="text-left" style="width:10%" > Order nr.</th>
          <th class="text-left" style="width:10%" > QTY</th>
          <th class="text-left" style="width:40%" > Item</th>
          <th class="text-left" style="width:10%" > Price</th>
          <th class="text-left" style="width:10%" > Status</th>
          <th class="text-left" style="width:10%" > Archieve Item</th>
          <th class="text-left" style="width:10%" > Remove</th>
        </tr>
      </thead>
      <tbody class="font-weight-light">


        <tr v-for="item in orderItems" :key="item.name" >
            
          <td>{{ item.orderNumber }}</td>
          <td class="py-3"><p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id"> {{ subitem.quantity }}</p></td>
          <td class="py-3"><p style="margin:0;" v-for="subitem in  item.orderLines" :key="subitem.id">{{ subitem.name }}</p></td>
          <td class="py-3"><p style="margin:0;" v-for="subitem in item.orderLines" :key="subitem.id" >{{ subitem.price }}</p></td>
          <td>
            <div id="status_box" class="orange" v-bind:class="item.status" @click="switchStage(item.id)">
                {{ item.status }}</div>
          </td>
           <td> 
              <v-btn small text @click="archiveOrderItem(item.id)"><v-icon color="blue">archive</v-icon></v-btn>
          </td>
           <td>
              <v-btn small text @click="deleteOrderItem(item.id)"><v-icon color="blue">delete</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
  </v-simple-table>
             </div>
                      









             </div>
      </v-sheet>
  </v-flex>
<v-flex xs12 sm12 md4 lg4 >
<v-sheet rounded="lg">
     <div class="ma-4 pa-2" id="info">
                   <h1 class="ma-2">Omsætning</h1>

 
  <div id="revenueList" v-for="item in orderItems" :key="item.name">
    
    <p>ordreNumber:
    {{ item.orderNumber }}
    <v-btn small text @click="deleteOrderItem(item.id)">
      <v-icon color="incomplete">delete</v-icon>
    </v-btn>
    </p>
  </div>

  <div class="pa-2 mt-1" id="info">
    <div id="totalRevenue">
      <p id="totalRevenueText">
        Total Omsætning: <span id="totalRevenueTextTotal">{{ revenueTotal }} DKK</span>
      </p>

    </div>
  </div>
  


</div>
</v-sheet>

</v-flex>

</v-layout>
</v-container>
</template>







<script>
/* eslint-disable */


import { dbOrders } from '../../firebase'
  export default {
    data () {
      return {
        basketDump: [],

      }
    },
     beforeCreate() {
      this.$store.dispatch('setOrderItems')
    },
    methods: {
      switchStage() {
          let selectedOrderItem = this.orderItems
          .filter(item => item.id === id)[0];

            if(selectedOrderItem.status === "inprogress") {
                dbOrders.doc(id).update({status: "complete"})
                .then(() => {

                })
            }
            else if(selectedOrderItem.status === "incomplete") {
                dbOrders.doc(id).update({status: "inprogress"})
                .then(() => {
                    
                })
            }
             else if(selectedOrderItem.status === "complete") {
                dbOrders.doc(id).update({status: "incomplete"})
                .then(() => {
                    
                })
            }
      },
      archiveOrderItem(id) {
          dbOrders.doc(id).update({
              archive: true, storeOrder: true})
              .then(() => {})
      },
      deleteOrderItem(id) {
        dbOrders.doc(id).delete().then(() => {
            console.log("stuff is deleted");
        }).catch((error) => {

        })
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
      }
    },
    computed: {
      basket() {
        return this.$store.getters.getBasketItems
      },
      orderItems () {
        return this.$store.getters.getOrderItems
      },
      revenueTotal() {
        var revenueIncome = 0;
        
        this.orderItems.forEach(element => {
          if(element.archive == true) {
            element.orderLines.forEach(elem => {
              revenueIncome += elem.price * elem.quantity
            })
          }
        });
        return revenueIncome
      }
    }
  }
</script>



<style lang="scss" scoped >

#status_box {
    display:flex;
    justify-content: center;
    align-content: center;
    height: 35px;
    width: 90px;
    font-size: 12px;
    border-radius: 2px;
    margin: 5px 0;
    color: map-get($colorz, white  );
    text-shadow: 1px 1px 1px "#aaa";
}

#totalRevenue {
  padding: 20px 10px 20px 0px;
  display: flex;
}

#totalRevenueText {
display: flex;
margin: 0;
justify-content: space-between;
font-style: italic;
width: 100%;
}

#totalRevenueTextTotal {
  text-decoration: underline;
  border-bottom: 1px solid #000;
  font-weight: bold;
  font-style: 100 ;
}


</style>