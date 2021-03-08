<template>
  <q-page class="column bg-blue-1">
    <div class="row q-pa-sm bg-blue-grey-5">

      <!-- <inputTask /> -->
      <button @click="pruebas">
        obtener tareas
      </button>
      <ul v-for="task of tasks" :key="task.title">
        <li>
          {{task.contenido}}
        </li>
      </ul>
    </div>
    <q-list class="bg-white" separator bordered>
      <!--tarea-->
      <tasks />
    </q-list>
    <noTaskMessage />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import tasks from 'components/Tasks';
// import inputTask from 'src/components/Input.vue';
// import noTaskMessage from 'components/NoTaskMessage';

export default {
  components: {
    // tasks,
    // noTaskMessage,
    // inputTask,
  },
  computed: {
    ...mapState(['tasks']),
  },
  mounted() {

  },
  methods: {
    ...mapActions(['pruebas']),
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
