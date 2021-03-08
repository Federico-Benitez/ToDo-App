import axios from 'axios';
/* eslint-disable */ 
const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

const state = {
  newTask: '',
  lastTaskIndex: 0,
  tasks: [],
};
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  // metodos para manipular estado
  // no async
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },

  DELETE_TASK(state, index){
    state.tasks.splice(index,1)
  }
};

const actions = {
  // pueden ser async
  // manipular state
  getTasks({ commit }) {
    axiosInstance.get('https://sv-todo-app.herokuapp.com/').then((response) => {
      commit('SET_TASKS', response.data);
    });
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
    axiosInstance
      .put(`https://sv-todo-app.herokuapp.com/${id}`, nota)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  },
  deleteTask(index) {
    // Preguntamos si realmente desea eliminar
    // si es que la tarea no estaba hecha
    commit('DELETE_TASK',index)
    if (this.tasks[index].state === false) {
      this.$q
        .dialog({
          title: 'Alerta',
          message: 'Estas seguro que deseas eliminar la tarea?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
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
      axiosInstance
        .post('https://sv-todo-app.herokuapp.com/', nota)
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
};

const getters = {
  tasks: state => state.tasks
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
