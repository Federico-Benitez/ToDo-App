<template>
    <q-page class="column bg-blue-1">
        <div class="row q-pa-sm bg-blue-grey-5">
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
        class="item"
        v-for="(task,index) in tasks"
        :key="task.title"
        @click="taskDone(index)"
        :class="{'done' :task.state}"
        clickable
        v-ripple>
            <q-item-section avatar>
            <q-checkbox

            :value="task.state == true"
            class="no-pointer-events"
            color="green-6"
            ref="checkbox"/>
            </q-item-section>
            <q-item-section>
            <q-item-label>{{task.contenido}}</q-item-label>
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
import axios from 'axios';

export default {
  data() {
    // TODO: Obtener de la API
    return {
      newTask: '',
      tasks: [],
    };
  },
  mounted() {
    axios.get('https://sv-todo-app.herokuapp.com/')
      .then((response) => {
        this.tasks = response.data;
        console.log(this.tasks);
      });
  },
  methods: {
    taskDone(index) {
      this.tasks[index].state = !this.tasks[index].state;
      const { id, contenido } = this.tasks[index];
      let { state } = this.tasks[index];
      if (state) state = 1;

      const nota = {
        id: index,
        state,
        contenido,
      };

      if (nota.state) {
        this.$q.notify('Tarea hecha!');
      }
      axios.put(`https://sv-todo-app.herokuapp.com/${id}`, nota)
        .then((result) => {
          console.log(result);
        });
    },
    deleteTask(index) {
      // Preguntamos si realmente desea eliminar
      // si es que la tarea no estaba hecha
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
        // La tarea ya estaba marcada como hecha, solamente se elimina
        this.tasks.splice(index, 1);
        this.$q.notify('Tarea eliminada');
      }
    },
    addTask() {
      // Validación de si la tarea tiene algun contenido
      if (this.newTask !== '') {
        this.tasks.push({
          contenido: this.newTask,
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
