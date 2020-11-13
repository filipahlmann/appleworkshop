import Vue from 'vue'
import Vuex from 'vuex'
import { dbOrders } from '../firebase'
import { dbiPhoneAdd, dbMacAdd, dbiPadAdd } from '../firebase'





//import firebase from 'firebase'

import 'firebase/firestore'



Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    counter: 0,
    basketItems: [

    ],
    iPhoneItems:[],
    MacItems:[],
    iPadItems:[],
    orderItems:[],
    currentUser: null
  },
  mutations: {
    addCheckoutItem: /* eslint-disable */
    (state, basketItems ) => {
      dbOrders.add({ 
        archive: false,
        storeOrder: false,
        orderNumber: state.counter++,
        status: "incomplete",
        orderLines: state.basketItems
      })
    },
    addBasketItems: (state, basketItems) => {
      if(basketItems instanceof Array) {
        basketItems.forEach(item => {
          if(state.basketItems.find(itemInArray => item.name === itemInArray.name)) {
            item = state.basketItems.find(itemInArray => item.name === itemInArray.name);
            item.quantity++
          }
          else {
            state.basketItems.push({
              name: item.name,
              price: item.price,
              quantity: 1
            })
          }
        })
      } 
    },
  userStatus (state, user) {
    if(user) {
      state.currentUser = user
    }
    else {
      state.currentUser = null
    }
  },
  setiPhoneItems: state => {
    let iPhoneItems = []

    dbiPhoneAdd.onSnapshot((snapshotItems) => {
      iPhoneItems = []
      snapshotItems.forEach((doc) => {
        var iPhoneItemData = doc.data();
        iPhoneItems.push({
          ...iPhoneItemData,
          id: doc.id
        })
      })
      state.iPhoneItems = iPhoneItems
    
    })
  },
  setiPadItems: state => {
    let iPadItems = []

    dbiPadAdd.onSnapshot((snapshotItems) => {
      iPadItems = []
      snapshotItems.forEach((doc) => {
        var iPadItemData = doc.data();
        iPadItems.push({
          ...iPadItemData,
          id: doc.id
        })
      })
      state.iPadItems = iPadItems
    
    })
  },
  setMacItems: state => {
    let MacItems = []

    dbMacAdd.onSnapshot((snapshotItems) => {
      MacItems = []
      snapshotItems.forEach((doc) => {
        var MacItemData = doc.data();
        MacItems.push({
          ...MacItemData,
          id: doc.id
        })
      })
      state.MacItems = MacItems
    
    })
  },
  setOrderItems: state => {
    let orderItems = []

    dbOrders.onSnapshot((snapshotItems) => {
      orderItems = []
      snapshotItems.forEach((doc) => {
        var orderItemData = doc.data();
        orderItems.push({
          ...orderItemData,
          id: doc.id
        })
      })
      state.orderItems = orderItems
    })
  }
  },
  actions: {
  setCheckoutItem(context) {
  context.commit('addCheckoutItem')
  },
    setUser(context, user) {  
  //  setUser({ commit }, user) {
    context.commit('userStatus', user)
      // commit('userStatus', user)
    },
    setiPhoneItems: context => {
      context.commit('setiPhoneItems')
    },
    setiPadItems: context => {
      context.commit('setiPadItems')
    },
    setMacItems: context => {
      context.commit('setMacItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    }
  },
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getiPhoneItems: state => state.iPhoneItems,
    getMacItems: state => state.MacItems,
    getiPadItems: state => state.iPadItems,
    getOrderItems: state => state.orderItems
  }
})