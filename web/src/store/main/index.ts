import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../types';

interface InitialState {
  show: boolean;
  selectedIndex?: number;
  //data
  selectedItem?: IItem;
  color?: number;
  background?: number;
  width?: number;
  radius?: number;
  disableAnimation?: boolean;
  useClick?: boolean;
  items: IItem[];
  key?: string;
}

const initialState: InitialState = {
  show: import.meta.env.DEV ? true : false,
  items: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleShow(state, action) {
      console.log('toggleShow', action.payload);
      state.show = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    setSelectedIndex(state, action) {
      state.selectedIndex = action.payload;
    },
    setMainData(state, action) {
      console.log('setMainData', action.payload);
      state = { ...state, ...action.payload };
      state.selectedIndex = undefined;
      state.selectedItem = undefined;
      return state;
    },
  },
});

export const { toggleShow } = mainSlice.actions;

export default mainSlice;
