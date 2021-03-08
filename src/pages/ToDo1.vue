<template>
  <q-page class="column bg-blue-1">
    <div class="row q-pa-sm bg-blue-grey-5">
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
    </div>
    <q-list class="bg-white" separator bordered>
      <!--tarea-->
      <q-item
        class="item"
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="taskDone(index)"
        :class="{ done: task.state }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
            :value="task.state == true"
            class="no-pointer-events"
            color="green-6"
            ref="checkbox"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.contenido }}</q-item-label>
        </q-item-section>
        <!--Boton eliminar-->
        <q-item-section side>
          <q-btn
            push
            color="white"
            text-color="red"
            round
            icon="delete"
            dense
            @click.stop="deleteTask(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <div class="text-h5 text-primary text-center">
        No existen tareas pendientes
      </div>
    </div>
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('tasks', ['tasks']),
    ...mapActions('tasks', ['getTasks']),
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
  },
};
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.input-task {
  height: 100px;
}
.no-tasks {
  opacity: 0.5;
}
</style>
