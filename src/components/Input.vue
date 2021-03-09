<template>
    <div class="row q-pa-sm bg-blue-grey-4">
            <q-input
            v-model="newTask.contenido"
            @keyup.enter="createNewTask"
            class="col justify-center input-task"
            color="grey-5"
            bg-color="white"
            label-color="grey"
            outlined
            placeholder="Agregar Tarea">
            <template v-slot:append>
                <q-btn
                round dense flat icon="add"/>
            </template>
        </q-input>
    </div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newTask: {
        contenido: '',
        state: false,
        id: 0,
      },
    };
  },
  computed: {
  },
  methods: {
    ...mapActions('tasks', ['createTask']),
    createNewTask() {
      if (this.newTask.contenido !== '') {
        this.saveTask(this.newTask.contenido);
      }
    },
    saveTask(contenido) {
      this.newTask.contenido = '';
      this.createTask(contenido);
      this.$q.notify('Nueva tarea agregada!');
    },
  },

};
</script>
