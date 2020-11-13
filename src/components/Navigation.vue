<template>
  <div>

    <v-app-bar
      app
      flat
      height="70px"
      
    >
      <v-container class="py-0 fill-height"  >
        
     
      <router-link to="/"><v-btn text><v-icon color="blue">home</v-icon> Hjem  </v-btn></router-link>

<div class="text-center">
    <v-menu
      open-on-hover
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          
        ><v-icon>menu</v-icon>
          Produkter
        </v-btn>
      </template>

      <v-list>
            <router-link to="/iPhone">
            <v-list-item>
            iPhone
            </v-list-item></router-link>
            <router-link to="/iPad">
             <v-list-item>
            iPad
            </v-list-item></router-link>
            <router-link to="/Mac">
            <v-list-item>
            Mac
            </v-list-item></router-link>
      </v-list>
    </v-menu>
  </div>






 








<v-layout         justify-start
></v-layout>
  <v-btn 
                depressed
                text
              >
      <router-link to="/login" color="inprogress"><v-icon color="blue">lock</v-icon> Login </router-link>
              </v-btn>
  <div v-if="currentUser" class="mx-5"  >      
         <v-container
         
    fluid
  >
    <v-row justify="center" >
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-small
            v-on="on"
          >
        
              <v-avatar color="blue"  size="35">
      <v-icon  color="white">
        mdi-account-circle
      </v-icon>
    </v-avatar>
          </v-btn>
        </template>
        <v-card >
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
                <v-avatar color="blue">
      <v-icon  color="white">
        mdi-account-circle
      </v-icon>
    </v-avatar>
              <h3>{{ currentUser.email }}</h3>
             
              
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                text
              >
      <router-link v-if="currentUser" to="/orders" class="complete--text" color="complete"><v-icon color="blue">assignment</v-icon> Ordre </router-link>
              </v-btn>
                                          <v-divider class="my-3"></v-divider>

              <v-btn
                depressed
                
                text
              >

      <router-link to="/AddNewItems" color="inprogress"><v-icon color="blue">lock</v-icon> Tilføj produkter</router-link>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>


  </div>
  

       
      </v-container>
    </v-app-bar>


  </div>
</template>

<script>
/* eslint-disable */
import { db } from '../../firebase'

import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store.js'

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUser', user)
} else {
    store.dispatch('setUser', null)
  }
});

export default {
  data: () => ({
    drawer: null,
   

  items: [
        { title: 'iPhone' },
        { title: 'iPad' },
        { title: 'Mac' },

      ],
  }),
  
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    }
  }
}
</script>

<style lang="scss" scoped>

.v-btn {

  list-style-type: none;
  margin: 2px;
  padding: 5px;

  flex-wrap: nowrap;
}

.v-application a {
  text-decoration: none;
}

</style>