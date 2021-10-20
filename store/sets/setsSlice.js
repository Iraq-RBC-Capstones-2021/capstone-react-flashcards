import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    mine: [],
    popular: [],
    suggested: [],
    recent: [],
  },
  status: "idle",
};

export const createNewSet = createAsyncThunk(
  "sets/createNewSet",
  async (newSet, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firebase = getFirebase();
    const firestore = getFirestore();

    const image = newSet.cover[0];
    let imageUrl = null;

    if (image) {
      const image = newSet.cover[0];
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);

      imageUrl = await imageRef.getDownloadURL();
    }

    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.displayName;

    const tags = newSet.categories.map((category) => category.name);

    const data = {
      title: newSet.name,
      description: newSet.description,
      tags,
      imageUrl,
      userName,
      userId,
    };

    firestore.add({ collection: "sets" }, data);

    return data;
  }
);

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewSet.pending]: (state) => {
      state.status = "loading";
    },
    [createNewSet.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.mine.push(action.payload);
    },
    [createNewSet.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const {} = setsSlice.actions;

export default setsSlice;
