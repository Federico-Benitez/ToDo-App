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
      @click="checkUpdate({ index: index, id: id, updates: {
      state: !state , contenido: contenido
    }})" >
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
        @click="checkDelete({index: index , id: id , state:state })"/>
    </q-item-section>
  </q-item>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'task',
  props: ['state', 'contenido', 'index', 'id'],
  computed: {
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    checkDelete(nota) {
      if (nota.state === 0) {
        this.$q.dialog({
          title: 'Alerta',
          message: 'Estas seguro que deseas eliminar la tarea?',
          cancel: true,
          persistent: true,
        }).onOk(() => {
          this.$q.notify('Tarea eliminada');
          this.deleteTask(nota);
        });
      }
      // la tarea ya estaba marcada como hecha
      this.deleteTask(nota);
      this.$q.notify('Tarea eliminada');
    },
    checkUpdate(notaEditada) {
      if (notaEditada.updates.state) {
        // tarea hecha
        this.$q.notify('Tarea hecha!');
      }
      this.updateTask(notaEditada);
    },
  },

};
</script>

<style lang="sass" scoped>
</style>
