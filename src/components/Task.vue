<template>

  <q-item>

    <q-item-section avatar>
      <q-checkbox
        :value="state == true"
        class="no-pointer-events task-checkbox"
        color="green-6"
        ref="checkbox"
      />
    </q-item-section>

      <q-item-section clikeable
      @click="updateTask({ id: index, updates: {
      state: !state
    }})">
        <q-item-label >{{ contenido }}</q-item-label>
      </q-item-section>

          <!--Boton eliminar-->
    <q-item-section side>
      <q-btn
       class="tasks-delete"
        push color="white"
        text-color="red"
        dense
        round icon="delete"
        @click="deleteTask"/>
    </q-item-section>
  </q-item>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'task',
  props: {
    contenido: String,
    state: Boolean,
    index: Number,
    id: Number,
  },
  computed: {
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
  },

};
</script>

<style lang="sass" scoped>
</style>
