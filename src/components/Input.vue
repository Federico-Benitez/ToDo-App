<template>
    <div class="row q-pa-sm bg-blue-grey-4">
            <q-input
            @keyup.enter="createTask"
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
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['tasks']),
  },
  methods: {
    ...mapActions('tasks', ['createTask']),
    // addTasks() {
    //   console.log('agregado');
    // },
  },

};
</script>
