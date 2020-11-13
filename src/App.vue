<template>

  <v-app id="inspire">
        <navigation />


    <v-main class="grey lighten-3">
   <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script>

import Navigation from './components/Navigation'

  export default {
components: {
      Navigation
    },
    name: 'App',
    data: () => ({
      
    }),
  }
</script>

<style lang="scss">



.col:last-child h1{
    text-align: left;
}

#info {
    background-color: white;
}

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