<template>
    <q-page class="column bg-grey-4">
    <div class="row q-pa-sm bg-primary">

    </div>
    <q-list class="bg-white"
    separator
    bordered>
        <!--tarea-->
      <q-item
      v-for="(task,index) in tasks"
      :key="task.title"
      @click="task.state = !task.state"
      :class="{'done' :task.state}"
      clickable
       v-ripple>
        <q-item-section avatar>
          <q-checkbox
           v-model="task.state"
           class="no-pointer-events"
           color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>
        <!--Boton eliminar-->
        <q-item-section
            side>
            <q-btn
            push color="white"
             text-color="red"
             round icon="delete"
             dense
             @click.stop="deleteTask(index)"
             />
        </q-item-section>

      </q-item>

    </q-list>

    </q-page>
</template>

<script>
export default {
  data() {
    // TODO: Obtener de la API
    return {
      tasks: [
        {
          title: 'Study',
          state: false,
        },
        {
          title: 'Comprar Frutas',
          state: true,
        },
        {
          title: 'Sacar al perro a pasear',
          state: false,
        },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      if (this.tasks[index].state === false) {
        this.$q.dialog({
          title: 'Alerta',
          message: 'Estas seguro que deseas eliminar la tarea?',
          cancel: true,
          persistent: true,
        }).onOk(() => {
          this.tasks.splice(index, 1);
          this.$q.notify('Tarea eliminada');
        });
      } else {
        this.tasks.splice(index, 1);
        this.$q.notify('Tarea eliminada');
      }
    },
  },
};
</script>

<style lang="scss">
    .done{
        .q-item__label{
            text-decoration: line-through;
            color: #bbb
        }
    }
</style>
