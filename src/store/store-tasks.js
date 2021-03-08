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
  tasks: [{
    id: 1,
    contenido: 'hola mundo',
  }],
};
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const mutations = {
  // metodos para manipular estado
  // no async
  SET_TASKS(state, tasksAction) {
    state.tasks = tasksAction;
  },

  prueba(){
    console.log('hola mundo');
  },

  DELETE_TASK(state, index){
    state.tasks.splice(index,1)
  }
};

const actions = {
  // pueden ser async
  // manipular state
  prueba({commit}){
    commit('pueba')
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
