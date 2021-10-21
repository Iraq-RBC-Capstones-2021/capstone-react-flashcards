import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  errorMessage: "",
};

export const registerWithEmailAndPassword = createAsyncThunk(
  "user/registerWithEmailAndPassword",
  async (info, thunkapi) => {
    try {
      const { getFirebase } = thunkapi.extra;
      const firebase = getFirebase();
      const auth = firebase.auth();

      await auth.createUserWithEmailAndPassword(info.email, info.password);

      const currentUser = auth.currentUser;

      await currentUser.updateProfile({
        displayName: info.name,
      });

      const data = {
        displayName: info.name,
        email: info.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      };

      return data;
    } catch (e) {
      const { rejectWithValue } = thunkapi;

      return rejectWithValue(e.message);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: {
    [registerWithEmailAndPassword.pending]: (state) => {
      state.status = "loading";
    },
    [registerWithEmailAndPassword.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    },
    [registerWithEmailAndPassword.rejected]: (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice;
