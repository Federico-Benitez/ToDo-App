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
                No existen tareas pendientes
            </div>
        </div>

    </q-page>
</template>

<script>
import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default {
  data() {
    // TODO: Obtener de la API
    return {
      newTask: '',
      tasks: [],
      lastTaskIndex: 0,
    };
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
    getAllTasks() {
      axiosInstance.get('https://sv-todo-app.herokuapp.com/')
        .then((response) => {
          this.tasks = response.data;
          // obtenemos el indice en la bd del ultimo elemento
          if (this.tasks.slice(-1)[0]) {
            this.lastTaskIndex = this.tasks.slice(-1)[0].id;
            console.log('Hay elemento y el ultimo indice es', this.lastTaskIndex);
          } else {
            this.lastTaskIndex = 0;
            console.log('No hay elementos');
          }
        })
        .catch((error) => console.log(error));
    },
    taskDone(index) {
      this.tasks[index].state = !this.tasks[index].state;
      const { id, contenido } = this.tasks[index];
      let { state } = this.tasks[index];
      if (state) state = 1;

      const nota = {
        id,
        state,
        contenido,
      };

      if (nota.state) {
        this.$q.notify('Tarea hecha!');
      }
      axiosInstance.put(`https://sv-todo-app.herokuapp.com/${id}`, nota)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log(error));
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
          this.deleteTaskFromDB(this.tasks[index].id);
          this.tasks.splice(index, 1);
          this.$q.notify('Tarea eliminada');
        });
      } else {
        // La tarea ya estaba marcada como hecha, solamente se elimina
        this.deleteTaskFromDB(this.tasks[index].id);
        this.tasks.splice(index, 1);
        this.$q.notify('Tarea eliminada');
      }
    },
    deleteTaskFromDB(id) {
      axiosInstance.delete(`https://sv-todo-app.herokuapp.com/${id}`);
    },
    addTask() {
      // Validación de si la tarea tiene algun contenido
      if (this.newTask !== '') {
        // obtener id;

        const nota = {
          id: this.lastTaskIndex + 1,
          contenido: this.newTask,
          state: 0,
        };
        axiosInstance.post('https://sv-todo-app.herokuapp.com/', nota)
          .then((result) => console.log(result))
          .catch((error) => console.log(error));

        this.tasks.push({
          contenido: nota.contenido,
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
