<template>
 <q-layout view="lHh Lpr lFf">
  <q-header>
    <q-toolbar class="text-dark shadow-2">
      <div class="q-px-lg q pt-x1 q-mb-md">
        <div class="text-h3">To Do</div>
        <div class="text-subtitle1">{{todaysDate}}</div>
      </div>

      <q-img src="../static/fondo.jpg"
      class="header-image absolute-top" />
    </q-toolbar>
  </q-header>

    <q-page-container>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </q-page-container>

 </q-layout>
</template>

<script>

import { date } from 'quasar';

export default {
  name: 'MyLayout',
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, 'dddd D MMMM ');
    },
  },

};

</script>

<style lang="scss">

  .header-image{
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(100%);
  }
</style>
