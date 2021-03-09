<template>
  <q-page class="column bg-blue-1">
      <inputTask />
    <q-list class="bg-white" separator bordered>
      <!--tarea-->
      <tasks />
    </q-list>
    <noTaskMessage />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import tasks from 'components/Tasks';
import inputTask from 'src/components/Input.vue';
// import noTaskMessage from 'components/NoTaskMessage';

export default {
  components: {
    tasks,
    // noTaskMessage,
    inputTask,
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

.input-task {
  height: 100px;
}

</style>
