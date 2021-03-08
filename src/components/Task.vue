<template>
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
  
</template>

<script>
export default {

};
</script>
