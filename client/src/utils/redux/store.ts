import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice";
import settingsReducer from "./settingsSlice";
import pdfReducer from "./pdfSlice";

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    settings: settingsReducer,
    pdf: pdfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
