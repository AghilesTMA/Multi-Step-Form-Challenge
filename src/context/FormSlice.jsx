import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  monthly: true,
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step++;
    },
    prevStep: (state) => {
      state.step--;
    },
    toggleBilling: (state)=>{
      state.monthly = !state.monthly;
    }
  },
});

export const {nextStep,prevStep,toggleBilling} = FormSlice.actions;
export default FormSlice.reducer;
