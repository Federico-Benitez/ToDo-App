<template>
    <q-page class="column bg-blue-1">
        <div class="row q-pa-sm bg-white">
            <q-input
            v-model="newTask"
            @keyup.enter="addTask"
            class="col justify-center input-task"
            color="grey-3"
            bg-color="white"
            label-color="grey"
            outlined
            placeholder="Agregar Tarea">
            <template v-slot:append>
            <q-btn
            @click="addTask"
            round dense flat icon="add"/>
            </template>
        </q-input>
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
            <q-item-label>{{task.texto}}</q-item-label>
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
        <div
            v-if="!tasks.length"
            class="no-tasks absolute-center">
            <div class="text-h5 text-primary text-center">
                No existen tareas
            </div>
        </div>

    </q-page>
</template>

<script>
export default {
  data() {
    // TODO: Obtener de la API
    return {
      newTask: '',
      tasks: [
        {
          texto: 'Study',
          state: false,
        },
        {
          texto: 'Comprar Frutas',
          state: true,
        },
        {
          texto: 'Sacar al perro a pasear',
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
    addTask() {
      // Validación de si la tarea tiene algun contenido
      if (this.newTask !== '') {
        this.tasks.push({
          texto: this.newTask,
          state: false,
        });
        this.newTask = '';
        this.$q.notify('Nueva tarea agregada!');
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
    .input-task{
        height: 100px;

    }
    .no-tasks{
        opacity: 0.5;
    }
</style>
