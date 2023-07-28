import { configureStore } from "@reduxjs/toolkit";
import Form from "./FormSlice";

const Store = configureStore({
  reducer: {
    form: Form,
  },
});

export default Store;
