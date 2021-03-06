<template>

  <div class="q-pa-md">
    <q-toolbar class="text-dark shadow-2">

      <div class="q-px-lg q pt-x1 q-mb-md">
        <div class="text-h3">To Do</div>
        <div class="text-subtitle1">{{todaysDate}}</div>

      </div>
      <q-img src="../static/fondo.jpg"
      class="header-image absolute-top" />

    </q-toolbar>

    <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
          <p>hola mundo</p>
        </q-card-section>

        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="primary" icon="check" />
          <q-btn flat round color="accent" icon="edit" />
          <q-btn flat round color="red" icon="delete" />
        </q-card-actions>

        </q-card-section>

      </q-card>

  </div>

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
    background-size: contain, cover;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    filter: grayscale(50%);
  }
</style>
