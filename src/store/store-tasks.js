import axios from 'axios';

/* eslint-disable */ 
const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

const state = { 
  tasks: [],
};
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  // metodos para manipular estado
  // no async  
  SET_TASKS(state, tasksAction) {
    state.tasks = tasksAction;
  },
  CREATE_TASK(state, nuevaTask){
    state.tasks.push(nuevaTask);    
  },
  UPDATE_TASK(state, index){    
    state.tasks[index].state = !state.tasks[index].state ;
  }, 

  DELETE_TASK(state, payload){    
    state.tasks.splice(payload.index,1)
  }
};

const actions = {
  // pueden ser async
  // manipular state  
  async getAllTasks({commit}) {
    axiosInstance.get('https://sv-todo-app.herokuapp.com/')
        .then((response) => {          
          commit('SET_TASKS', response.data);         
        })
        .catch((error) => console.log(error));
  },
  async createTask({commit}, task) {
    console.log('creando nota en la bd')
    const nuevaNota = {
      id :0 ,
      contenido: task,
      state: false  
    }

    axiosInstance.post('https://sv-todo-app.herokuapp.com/', nuevaNota)
      .then((result) => {
        nuevaNota.id = result.data;
        commit('CREATE_TASK', nuevaNota)
      })
      .catch((error) => console.log(error));
  },
  updateTask({ commit }, notaEditada){    
    //check state
    let nuevoState = notaEditada.updates.state;
    if(nuevoState) nuevoState = 1; 
    //request 
    const nota = {
      id: notaEditada.id,
      state: nuevoState,
      contenido: notaEditada.updates.contenido,
    }; 
    
    axiosInstance.put(`https://sv-todo-app.herokuapp.com/${nota.id}`, nota)
        .then((result) => {
          
          commit('UPDATE_TASK', notaEditada.index)
        })
        .catch((error) => console.log(error));
    
  },
  deleteTask({commit}, payload) {
    console.log('delete task');
    axiosInstance.delete(`https://sv-todo-app.herokuapp.com/${payload.id}`).then((response) => console.log(response));
    console.log(payload)
    commit('DELETE_TASK',payload)
  }  
};

const getters = {
  tasks: state => state.tasks,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
