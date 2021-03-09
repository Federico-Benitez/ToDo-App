import axios from 'axios';

/* eslint-disable */ 
const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

const state = { 
  tasks: [
    {
      id: 19,
      state: false,
      contenido: 'hola mundo',
    },
    {
      id: 85,
      state: true,      
      contenido: 'chau mundo',
    },
    {
      id: 32,
      state: true,
      contenido: 'hola de nuevo mundo',
    }
],
};
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  // metodos para manipular estado
  // no async
  
  SET_TASKS(state, tasksAction) {
    state.tasks = tasksAction;
  },

  CREATE_TASK(state, payload){
    console.log('from mutation new task ',payload);
    state.tasks.push(payload);    
  },

  UPDATE_TASK(state, payload){
    // console.log('from mutation payload',payload.id)
    const index = payload.index;
    
    // state.tasks[id].state = playload.updates.state;
    // console.log("nuevo estado", payload.updates.state);
    state.tasks[index].state = payload.updates.state;
  }, 

  DELETE_TASK(state, payload){    
    state.tasks.splice(payload.index,1)
  }
};

const actions = {
  // pueden ser async
  // manipular state  
  createTask({commit}, task) {
    console.log('creando nota en la bd')
    console.log('obteniendo id')
    const payload={
      id:16,
      contenido: task,
      state: false
    }   
    console.log(payload);
    commit('CREATE_TASK', payload)
  },
  updateTask({ commit }, payload){
    console.log('update task');
    //request 

    console.log(payload)
    commit('UPDATE_TASK', payload)
  },
  deleteTask({commit}, payload) {
    console.log('delete task');
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
