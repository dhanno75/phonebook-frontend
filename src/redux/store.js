import { configureStore } from "@reduxjs/toolkit";
import ContactSlice from "./features/ContactSlice";

export default configureStore({
  reducer: {
    contacts: ContactSlice,
  },
});
