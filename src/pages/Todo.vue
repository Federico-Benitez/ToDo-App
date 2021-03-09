<template>
  <q-page class="column bg-blue-1">
      <inputTask />
    <q-list class="bg-white" separator bordered>
      <tasks />
    </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import tasks from 'components/Tasks';
import inputTask from 'src/components/Input.vue';

export default {
  components: {
    tasks,
    inputTask,
  },
  computed: {
    ...mapState(['tasks']),
    ...mapActions('tasks', ['getAllTasks']),
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
  },
};
</script>

<style lang="scss">

.input-task {
  height: 100px;
}

</style>
