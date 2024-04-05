import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { ToastProps } from './Toast';

interface ToastSliceState {
  toasts: ToastProps[];
}

const initialState: ToastSliceState = {
  toasts: [],
};


export const toastSlice = createAppSlice({
  name: 'toast',
  initialState,
  reducers: create => ({
    addErrorToast: create.reducer(
      (state, action: PayloadAction<string>) => {
        const id = Math.random().toString(36).substring(7);
        state.toasts.push({
          id,
          message: action.payload,
          type: 'error',
        });
      }),
    addSuccessToast: create.reducer(
      (state, action: PayloadAction<string>) => {
        const id = Math.random().toString(36).substring(7);
        state.toasts.push({
          id,
          message: action.payload,
          type: 'success',
        });
      }),
    removeToast: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.toasts = state.toasts.filter(data => data.id !== action.payload);
      }),
  }),
  selectors: {
    getToasts: state => state.toasts,
  }
});

export const { addErrorToast, addSuccessToast, removeToast } = toastSlice.actions;
export const { getToasts } = toastSlice.selectors;