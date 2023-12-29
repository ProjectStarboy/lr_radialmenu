import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  show: boolean;
}

const initialState: InitialState = {
  show: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleShow(state) {
      state.show = !state.show;
    },
  },
});

export const { toggleShow } = mainSlice.actions;

export default mainSlice;
