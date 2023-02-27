import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth'
import categoriePostReducer from './categoriePost'


const store = configureStore({
    reducer: {        
        auth: authReducer,
        categoriePost: categoriePostReducer,
    },
});

export default store;