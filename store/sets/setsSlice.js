import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    mine: [],
    popular: [],
    suggested: [],
    recent: [],
    top: [],
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

    const timeStamp = firestore.FieldValue.serverTimestamp;

    const data = {
      title: newSet.name,
      description: newSet.description,
      tags,
      imageUrl,
      userName,
      userId,
      createdAt: timeStamp(),
    };

    const doc = await firestore.add({ collection: "sets" }, data);

    return {
      ...data,
      setId: doc.id,
    };
  }
);

// Recent Sets
export const getRecentSets = createAsyncThunk(
  "sets/getRecentSets",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({
      collection: "sets",
      orderBy: "createdAt",
      limit: 6,
    });

    const sets = [];
    collection.forEach((doc) => {
      const data = doc.data();
      sets.push({ ...data, setId: doc.id });
    });
    return sets;
  }
);
// Suggested Sets
export const getSuggestedSets = createAsyncThunk(
  "sets/getSuggestedSets",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({
      collection: "sets",
      orderBy: ["createdAt", "asc"],
      limit: 6,
    });

    const sets = [];
    collection.forEach((doc) => {
      const data = doc.data();
      sets.push({ ...data, setId: doc.id });
    });
    sets.sort(() => Math.random() - 0.5);
    return sets;
  }
);
// Popular Sets
export const getPopularSets = createAsyncThunk(
  "sets/getPopularSets",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({
      collection: "sets",
      where: ["views", ">=", 0],
      orderBy: ["views", "desc"],
      limit: 6,
    });

    const sets = [];
    collection.forEach((doc) => {
      const data = doc.data();
      sets.push({ ...data, setId: doc.id });
    });
    return sets;
  }
);
// Top Categories Sets
export const getTopCategoriesSets = createAsyncThunk(
  "sets/getTopCategoriesSets",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({
      collection: "sets",
      //  where: ["tags"],
      limit: 3,
    });

    const sets = [];
    collection.forEach((doc) => {
      const data = doc.data();
      sets.push({ ...data, setId: doc.id });
    });
    return sets;
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
    // Recent sets
    [getRecentSets.pending]: (state) => {
      state.status = "loading";
    },
    [getRecentSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.recent = action.payload;
    },
    [getRecentSets.rejected]: (state) => {
      state.status = "error";
    },
    // Suggested Sets
    [getSuggestedSets.pending]: (state) => {
      state.status = "loading";
    },
    [getSuggestedSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.suggested = action.payload;
    },
    [getSuggestedSets.rejected]: (state) => {
      state.status = "error";
    },
    // Popular Sets
    [getPopularSets.pending]: (state) => {
      state.status = "loading";
    },
    [getPopularSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.popular = action.payload;
    },
    [getPopularSets.rejected]: (state) => {
      state.status = "error";
    },
    // Top Categories Sets
    [getTopCategoriesSets.pending]: (state) => {
      state.status = "loading";
    },
    [getTopCategoriesSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.top = action.payload;
    },
    [getTopCategoriesSets.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const {} = setsSlice.actions;

export default setsSlice;
