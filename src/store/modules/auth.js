//store/modules/auth.js

import axios from 'axios';
import sha256 from 'crypto-js/sha256'
function checkHash(data, hashItem){
    if(sha256(data) == hashItem){
        console.log('Hash valid')
        return true
    }
    return false
}
const state = {
    user: null,
    forum: null,
    forums: null,
    token: null
};
const getters = {
    isAuthenticated: state => !!state.user,    
    StateForum: state => state.forum,
    StateUser: state => state.user,
    StateForums: state => state.forums,
    StateToken: state => state.token,
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('auth/register', form)
        await dispatch('LogIn', form)
    },
    async LogIn({commit}, User) {
        let response = await axios.post('auth/login', User)
        if(checkHash(response.data.model, response.data.hash)){
            await commit('setUser', response.data.model)
            await commit('setToken', response.data.jwt)
        }else{
            throw new Error('No Integrity');
        }
    },
    async CreatePost({dispatch}, post) {
        await axios.post('post', post)
        await dispatch('GetForum', post.ForumId)
    },
    async EditPost({dispatch}, post) {
        await axios.put('post/' + post.id, post)
        await dispatch('GetForum', post.ForumId)
    },
    async GetForum({ commit }, id){
        
        let response = await axios.get('view/forum/' + id)
        if(checkHash(response.data.model, response.data.hash)){
        commit('setForum', response.data.model)
        }else{
            throw new Error('No Integrity');
        }
    },
    async CreateForum({dispatch}, forum) {
        await axios.post('forum', forum)
        await dispatch('GetForums')
    },
    async EditForum({dispatch}, forum) {
        await axios.put('forum/' + forum.id, forum)
        await dispatch('GetForum',forum.id)
    },
    async GetForums({ commit }){
        let response = await axios.get('view/forum')
        if(checkHash(response.data.model, response.data.hash)){
        commit('setForums', response.data.model)
        }else{
            throw new Error('No Integrity');
        }
    },
    async LogOut({commit}){
        let user = null
        commit('LogOut', user)
    }
};
const mutations = {
    setUser(state, user){
        state.user = user
    },
    setForum(state, forum){
        state.forum = forum
    },
    setForums(state, forums){
        state.forums = forums
    },
    setToken(state, token){
        state.token = token
    },
    LogOut(state){
        state.user = null
        state.token = null
    },
};

export default {
  state,
  getters,
  actions,
  mutations
};
