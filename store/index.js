import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";

import fb from "../firebase";
import counterSlice from "./counter/counterSlice";
import userSlice from "./user/userSlice";
import setsSlice from "./sets/setsSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [setsSlice.name]: setsSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { getFirebase, getFirestore },
        },
      }),
    enhancers: [reactReduxFirebase(fb.firebase), reduxFirestore(fb.firebase)],
  });

export const wrapper = createWrapper(makeStore);
export const selectCounter = () => (state) => state?.[counterSlice.name]?.value;
