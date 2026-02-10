import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import nftsReducer from "./features/nftsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    nfts: nftsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
