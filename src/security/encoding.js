//store/modules/auth.js

import crypto from 'crypto';
import store from '../store';

export const encodeWithPrivate = (hash) => {
    if(store.state.key === null){
        return false;
    }
    return crypto.privateEncrypt(store.state.key, hash);
};

export const decodeWithPrivate = (hash) => {
    if(store.state.key === null){
        return false;
    }
    return crypto.privateDecrypt(store.state.key, hash);
};
