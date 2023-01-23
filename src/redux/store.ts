import { configureStore } from '@reduxjs/toolkit';

import feeTypeReducer from './slices/feeTypeSlice';


export const store = configureStore({
  reducer: feeTypeReducer
})
 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch