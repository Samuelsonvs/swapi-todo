import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import swapiReducer from '../slice/swipeSlice'

export const store = configureStore({
  reducer: {
    swapiNames: swapiReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;