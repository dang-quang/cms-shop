import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  selectedProducts: any;
}

const initialState: UserState = {
  selectedProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProducts: (state: UserState, { payload }: PayloadAction<any[]>) => {
      state.selectedProducts = payload;
    },
  },
});

export const { setSelectedProducts } = productSlice.actions;

export const productSelector = (state: RootState) => state.product;

export default productSlice.reducer;
