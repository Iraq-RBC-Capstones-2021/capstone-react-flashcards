import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    mine: [],
    popular: [],
    suggested: [],
    recent: [],
    cards: [],
    libraryInfoIds: [],
    setDetails: {
      set: {},
      cards: [],
    },
    total: [],
    profile: {
      userInfo: null,
      sets: [],
    },
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

export const addSetToLibrary = createAsyncThunk(
  "sets/addSetToLibrary",
  async (setId, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;

    const data = {
      setId,
      addedAt: Date.now(),
    };

    await firestore
      .collection("library")
      .doc(uid)
      .set(
        {
          data: firestore.FieldValue.arrayUnion(data),
        },
        { merge: true }
      );

    return data;
  }
);

export const removeSetFromLibrary = createAsyncThunk(
  "sets/removeSetFromLibrary",
  async (setId, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;
    const libraryInfoIds = thunkapi.getState().sets.data.libraryInfoIds;

    const setInfo = libraryInfoIds.find((set) => set.setId === setId);

    await firestore
      .collection("library")
      .doc(uid)
      .set(
        {
          data: firestore.FieldValue.arrayRemove(setInfo),
        },
        { merge: true }
      );

    return setInfo;
  }
);

export const getLibraryInfoIds = createAsyncThunk(
  "sets/getLibraryInfoIds",
  async (_, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;

    const doc = await firestore.get({
      collection: "library",
      doc: uid,
    });

    return doc.data().data;
  }
);

export const getProfileSets = createAsyncThunk(
  "sets/getUserProfileSets",
  async (userId, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const setDocs = await firestore.get({
      collection: "sets",
      where: ["userId", "==", userId],
    });

    let sets = [];

    setDocs.forEach((doc) => {
      sets.push({ ...doc.data(), setId: doc.id });
    });

    const user = await firestore.get({ collection: "users", doc: userId });

    return {
      sets,
      userInfo: user.data(),
    };
  }
);

export const getTotalSets = createAsyncThunk(
  "sets/getTotalSets",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({ collection: "sets" });

    let sets = [];

    collection.forEach((doc) => {
      sets.push({ ...doc.data(), setId: doc.id });
    });

    return sets;
  }
);

export const getCards = createAsyncThunk(
  "sets/getCards",
  async (_, thunkapi) => {
    const { getFirestore } = thunkapi.extra;
    const firestore = getFirestore();

    const collection = await firestore.get({
      collection: "cards",
    });

    const cards = [];

    collection.forEach((doc) => {
      const data = doc.data();
      cards.push({ ...data, cardId: doc.id });
    });

    return cards;
  }
);

const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    getMineSets(state, action) {
      const totalSets = state.data.total;
      const libraryInfoIds = state.data.libraryInfoIds;
      const userId = action.payload;

      const library = totalSets.filter((set) =>
        libraryInfoIds.some((librarySet) => librarySet.setId === set.setId)
      );

      const setsCreatedByUser = totalSets.filter(
        (set) => set.userId === userId
      );

      state.data.mine = [...library, ...setsCreatedByUser];
    },
    getSetDetails(state, action) {
      const totalSets = state.data.total;
      const totalCards = state.data.cards;
      const setId = action.payload;

      state.status = "loading";
      state.data.setDetails.set = totalSets.find((set) => set.setId === setId);
      state.data.setDetails.cards = totalCards.filter(
        (card) => card.setId === setId
      );
      state.status = "idle";
    },
  },
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

    [addSetToLibrary.pending]: (state) => {
      state.status = "loading";
    },
    [addSetToLibrary.fulfilled]: (state, action) => {
      state.data.libraryInfoIds.push(action.payload);
      state.status = "idle";
    },
    [addSetToLibrary.rejected]: (state) => {
      state.status = "error";
    },
    [removeSetFromLibrary.pending]: (state) => {
      state.status = "loading";
    },
    [removeSetFromLibrary.fulfilled]: (state, action) => {
      const newLibrary = state.data.libraryInfoIds.filter(
        (set) => set.setId !== action.payload.setId
      );

      state.data.libraryInfoIds = newLibrary;

      state.status = "idle";
    },
    [removeSetFromLibrary.rejected]: (state) => {
      state.status = "error";
    },
    [getLibraryInfoIds.pending]: (state) => {
      state.status = "loading";
    },
    [getLibraryInfoIds.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.libraryInfoIds = action.payload;
    },
    [getLibraryInfoIds.rejected]: (state) => {
      state.status = "error";
    },
    [getProfileSets.pending]: (state) => {
      state.status = "loading";
    },
    [getProfileSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.profile = action.payload;
    },
    [getProfileSets.rejected]: (state) => {
      state.status = "error";
    },
    [getTotalSets.pending]: (state) => {
      state.status = "loading";
    },
    [getTotalSets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.total = action.payload;
    },
    [getTotalSets.rejected]: (state) => {
      state.status = "error";
    },
    [getCards.pending]: (state) => {
      state.status = "loading";
    },
    [getCards.fulfilled]: (state, action) => {
      state.data.cards = action.payload;
      state.status = "idle";
    },
    [getCards.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { getMineSets, getSetDetails } = setsSlice.actions;

export default setsSlice;
