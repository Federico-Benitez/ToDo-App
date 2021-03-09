<template>
  <div>
    <q-list>
        <q-item
        class="item"
        v-for="(task) in tasks.tasks"
        :key="task.id"
        :class="{'done' :task.state}"
        clickable
        v-ripple
        >
          <taskItem class="task-item" v-bind:contenido="task.contenido" v-bind:state="task.state" />
      </q-item>
    </q-list>
    <div
      v-if="!tasks.tasks.length"
      class="no-tasks absolute-center">
      <div class="text-h5 text-primary text-center">
          No existen tareas pendientes
      </div>
    </div>

  </div >
</template>

<script>
import { mapState } from 'vuex';
import taskItem from './Task';

export default {
  components: {
    taskItem,
  },
  computed: {
    ...mapState(['tasks']),
  },
};

</script>

<style lang="sass">
</style>
