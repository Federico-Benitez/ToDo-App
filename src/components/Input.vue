<template>
  <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col justify-center input-task"
        color="grey-3"
        bg-color="white"
        label-color="grey"
        outlined
        placeholder="Agregar Tarea"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
</template>

<script>
export default {

};
</script>

<style>

</style>