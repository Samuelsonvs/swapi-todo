import {
    createAsyncThunk,
    createSlice,
    PayloadAction
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import type { RootState } from '../store';
  import { NAME_API } from '../endpoints';
  import { App } from "@/interface/app"
  
  const initialState: App.SwapiState = {
    data: null,
    pending: false,
    error: false,
    todos: null,
  };
  
  export const getSwapiNames = createAsyncThunk('people/?page=5', async () => {
    const { data } = await axios.get(NAME_API);
    const { results } = data
  
    return results;
  });
  
  export const swapiSlice = createSlice({
    name: 'swapi',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<App.ToDo>) => {
            state.todos = action.payload;
        },
    },
    extraReducers: builder => {
      builder
        .addCase(getSwapiNames.pending, state => {
          state.pending = true;
        })
        .addCase(getSwapiNames.fulfilled, (state, { payload }) => {
          state.pending = false;
          state.data = payload;
        })
        .addCase(getSwapiNames.rejected, state => {
          state.pending = false;
          state.error = true;
        });
    },
  });

  export const {
    addTodo
  } = swapiSlice.actions;
  
  export const selectSwapi = (state: RootState) => state.swapiNames;
  
  export default swapiSlice.reducer;