<template>

  <q-item >
    <q-item-section avatar>
      <q-checkbox
        :value="state == true"
        class="no-pointer-events task-checkbox"
        color="green-6"
        ref="checkbox"
      />
    </q-item-section>

      <q-item-section>
        <q-item-label >{{ contenido }}</q-item-label>
      </q-item-section>

          <!--Boton eliminar-->
    <q-item-section side>
      <q-btn
       class="tasks-delete"
        push color="white"
        text-color="red"
        dense
        round icon="delete"/>
    </q-item-section>
  </q-item>

</template>

<script>

export default {
  name: 'task',
  props: {
    contenido: String,
    state: Boolean,
  },
  computed: {
  },

};
</script>

<style lang="sass" scoped>
</style>
