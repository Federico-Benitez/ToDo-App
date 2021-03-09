<template>
  <div>
    <q-list separator bordered>
        <q-item
        class="item"
        v-for="(task,index) in tasks.tasks"
        :key="task.id"
        :class="{'done' :task.state}"
        clickable

        v-ripple
        >
          <taskItem class="task-item"
          v-bind:id="task.id"
          v-bind:contenido="task.contenido"
          v-bind:state="task.state"
          v-bind:index="index"
          />
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
  methods: {
  },
};

</script>

<style lang="sass">
</style>
