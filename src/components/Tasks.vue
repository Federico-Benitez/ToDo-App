<template>
  <q-item
        class="item"
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="taskDone(index)"
        :class="{ done: task.state }"
        clickable
        v-ripple
      >
      <task/>
</q-item>
</template>

<script>
export default {

};
</script>