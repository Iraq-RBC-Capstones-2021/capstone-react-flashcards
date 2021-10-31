import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const tempMineSets = [
  { setId: "8d2DhGMvepnuX1X0YeSE", title: "VLAN" },
  { setId: "M4GvLlfPz0ooNsgYsv4R", title: "IP Address" },
];

const initialState = {
  data: {
    mine: [...tempMineSets],
    popular: [],
    suggested: [],
    recent: [],
    cards: [],
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
      const imageRef = storageRef.child(`${Date.now()}${image.size}`);
      await imageRef.put(image);

      imageUrl = await imageRef.getDownloadURL();
    }

    const currentUser = firebase.auth().currentUser;

    const timeStamp = firestore.FieldValue.serverTimestamp;

    const data = {
      title: newSet.title,
      description: newSet.description,
      tags: newSet.categories,
      imageUrl,
      userName: currentUser.displayName,
      userId: currentUser.uid,
      avatar: currentUser.photoURL,
      createdAt: timeStamp(),
      cardCount: 0,
    };

    const doc = await firestore.add({ collection: "sets" }, data);

    return {
      ...data,
      setId: doc.id,
    };
  }
);

const uploadFilesArray = async (files, setId, storageRef) => {
  if (files.length <= 0) return null;

  return await Promise.all(
    files.map(async (file, index) => {
      const fileName = `${setId}${Date.now()}${file.size}${index}`;
      const fileRef = storageRef.child(fileName);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();

      return url;
    })
  );
};

export const createNewCard = createAsyncThunk(
  "sets/createNewCard",
  async ({ front, back, setId }, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storageRef = firebase.storage().ref();

    const data = {
      front: {
        text: front.text,
        images: await uploadFilesArray(front.images, setId, storageRef),
        audio: await uploadFilesArray(front.audio, setId, storageRef),
      },
      back: {
        text: back.text,
        images: await uploadFilesArray(back.images, setId, storageRef),
        audio: await uploadFilesArray(back.audio, setId, storageRef),
      },
      setId,
    };

    const doc = await firestore.add({ collection: "cards" }, data);

    await firestore
      .collection("sets")
      .doc(setId)
      .set(
        {
          cardCount: firestore.FieldValue.increment(1),
        },
        { merge: true }
      );

    return {
      ...data,
      cardId: doc.id,
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

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewSet.pending]: (state) => {
      state.status = "loading";
    },
    [createNewSet.fulfilled]: (state, action) => {
      state.data.mine.push(action.payload);
      state.status = "idle";
    },
    [createNewSet.rejected]: (state) => {
      state.status = "error";
    },
    [createNewCard.pending]: (state) => {
      state.status = "loading";
    },
    [createNewCard.fulfilled]: (state, action) => {
      state.data.cards.push(action.payload);
      state.status = "idle";
    },
    [createNewCard.rejected]: (state) => {
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
  },
});

export const {} = setsSlice.actions;

export default setsSlice;
