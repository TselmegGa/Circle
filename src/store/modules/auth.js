//store/modules/auth.js

import axios from 'axios';
import sha256 from 'crypto-js/sha256'
import fs from 'fs';

function checkHash(data, hashItem){
    if(sha256(data).toString() === hashItem){
        console.log('Hash valid');
        return true;
    }
    console.log('Hash invalid');
    return false;
}

const state = {
    user: null,
    forum: null,
    forums: null,
    token: null,
    key: null
};

const getters = {
    isAuthenticated: state => !!state.user,    
    StateForum: state => state.forum,
    StateUser: state => state.user,
    StateForums: state => state.forums,
    StateToken: state => state.token
};

const actions = {
    async Register({dispatch, commit}, form) {
        
        
        let response = await axios.post('auth/register', form);
        await commit('setKey', response.data.model.privKey);
        console.log(response);
        
            const data = JSON.stringify(response.data.model.privKey);
            try { fs.writeFileSync('myfile.txt', data, 'utf-8'); }
            catch(e) { console.log(e);}
        
        await dispatch('LogIn', form);
    },
    
    async LogIn({commit}, user) {
        let response = await axios.post('auth/login', user);
        if(checkHash(response.data.model, response.data.hash)){
            await commit('setUser', response.data.model);
            await commit('setToken', response.data.jwt);
        }else{
            throw new Error('No Integrity');
        }
    },
    
    async CreatePost({dispatch}, post) {
        await axios.post('post', {post: post, hash: sha256(post).toString()});
        await dispatch('GetForum', post.ForumId);
    },
    
    async EditPost({dispatch}, post) {
        await axios.put('post/' + post.id, post);
        await dispatch('GetForum', post.ForumId);
    },
    
    async GetForum({ commit }, id){
        let response = await axios.get('view/forum/' + id);
        await commit('setForum', response.data.model);
    },
    
    async CreateForum({dispatch}, forum) {
        await axios.post('forum', forum);
        await dispatch('GetForums');
    },
    
    async EditForum({dispatch}, forum) {
        await axios.put('forum/' + forum.id, forum);
        await dispatch('GetForum',forum.id);
    },
    
    async GetForums({ commit }){
        let response = await axios.get('view/forum');
        await commit('setForums', response.data.model);
    },
    
    async LogOut({commit}){
        let user = null;
        await commit('LogOut', user);
    }
};
const mutations = {
    setUser(state, user){
        state.user = user;
    },
    
    setForum(state, forum){
        state.forum = forum;
    },
    
    setForums(state, forums){
        state.forums = forums;
    },
    
    setToken(state, token){
        state.token = token;
    },
    
    setKey(state, key){
        state.key = key;
    },
    
    getKey(state){
        return state.key;
    },
    
    LogOut(state){
        state.user = null;
        state.token = null;
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};
