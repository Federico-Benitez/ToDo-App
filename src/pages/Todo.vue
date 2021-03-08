<template>
  <q-page class="column bg-blue-1">
    <div class="row q-pa-sm bg-blue-grey-5">
      <input/>
    </div>
    <q-list class="bg-white" separator bordered>
      <!--tarea-->
      <tasks/>
    </q-list>
    <noTaskMessage/>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import tasks from 'components/Tasks'
import input from 'components/Input'
import noTaskMessage from 'components/NoTaskMessage'

export default {
  computed: {
    ...mapGetters('tasks', ['tasks']),
    ...mapActions('tasks', ['getTasks', 'taskDone']),
  },
  mounted() {
    this.$store.dispatch('getTasks');
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
