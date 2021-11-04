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
      const { getFirebase, getFirestore } = thunkapi.extra;
      const firebase = getFirebase();
      const firestore = getFirestore();
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
      };

      await firestore.set({ collection: "users", doc: currentUser.uid }, data);

      return { ...data, uid: currentUser.uid };
    } catch (e) {
      const { rejectWithValue } = thunkapi;

      return rejectWithValue(e.message);
    }
  }
);

export const signInWithEmailAndPassword = createAsyncThunk(
  "user/signInWithEmailAndPassword",
  async (info, thunkapi) => {
    try {
      const { getFirebase } = thunkapi.extra;
      const firebase = getFirebase();
      const auth = firebase.auth();

      await auth.signInWithEmailAndPassword(info.email, info.password);

      const currentUser = auth.currentUser;

      const data = {
        displayName: currentUser.displayName,
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

export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, thunkapi) => {
    try {
      const { getFirebase, getFirestore } = thunkapi.extra;
      const firebase = getFirebase();
      const firestore = getFirestore();
      const auth = firebase.auth();

      const provider = new firebase.auth.GoogleAuthProvider();
      await provider.setCustomParameters({ prompt: "select_account" });

      await auth.signInWithPopup(provider);

      const currentUser = auth.currentUser;

      const data = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      };

      const userFromCollection = await firestore.get({
        collection: "users",
        doc: currentUser.uid,
      });

      // add user data to collection if user is not found in the collection.
      if (userFromCollection.data() === undefined) {
        await firestore.set(
          { collection: "users", doc: currentUser.uid },
          data
        );
      }

      return { ...data, uid: currentUser.uid };
    } catch (e) {
      const { rejectWithValue } = thunkapi;

      return rejectWithValue(e.message);
    }
  }
);

export const signOut = createAsyncThunk("user/signOut", async (_, thunkapi) => {
  try {
    const { getFirebase } = thunkapi.extra;
    const firebase = getFirebase();
    const auth = firebase.auth();

    await auth.signOut();

    return null;
  } catch (e) {
    const { rejectWithValue } = thunkapi;

    return rejectWithValue(e.message);
  }
});

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    checkCurrentUser: (state, action) => {
      const user = action.payload;
      if (user) {
        state.data = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
        };
      }
    },
  },
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

    [signInWithEmailAndPassword.pending]: (state) => {
      state.status = "loading";
    },
    [signInWithEmailAndPassword.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    },
    [signInWithEmailAndPassword.rejected]: (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload;
    },

    [signOut.pending]: (state) => {
      state.status = "loading";
    },
    [signOut.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    },
    [signOut.rejected]: (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload;
    },

    [signInWithGoogle.pending]: (state) => {
      state.status = "loading";
    },
    [signInWithGoogle.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errorMessage = "";
      state.data = action.payload;
    },
    [signInWithGoogle.rejected]: (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload;
    },
  },
});

export const { checkCurrentUser } = userSlice.actions;

export default userSlice;
