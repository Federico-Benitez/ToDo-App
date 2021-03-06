<template>
 <q-layout view="lHr Lpr lfr">

      <q-header>
        <q-toolbar class="text-dark bg-blue-grey-6 shadow-2">
          <q-space/>
          <div class="q-px-lg q pt-x1 q-mb-md">
            <div class="texto-cabecera">
              <div class="text-h3">To Do</div>
              <div class="text-subtitle1">{{todaysDate}}</div>
            </div>
          </div>
          <q-space/>

          <!-- <q-img src="../static/fondo.jpg"
          class="header-image absolute-top" /> -->
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
  .texto-cabecera{
    display: block;
    align-content: center;
    margin-top: 10px;
    padding: 10px;
    .text-h3{
      font-weight: 300;
    }
  }

  .header-image{
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(100%);
  }
</style>
