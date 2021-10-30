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
    library: [],
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

export const addSetToLibrary = createAsyncThunk(
  "sets/addSetToLibrary",
  async (setId, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;

    const data = {
      setId,
      createdAt: Date.now(),
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
    const library = thunkapi.getState().sets.data.library;

    const setInfo = library.find((set) => set.setId === setId);

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

export const getLibrarySets = createAsyncThunk(
  "sets/getLibrarySets",
  async (_, thunkapi) => {
    const { getFirestore, getFirebase } = thunkapi.extra;
    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = firebase.auth().currentUser.uid;

    const doc = await firestore.get({
      collection: "library",
      doc: uid,
    });

    return doc.data();
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
    [addSetToLibrary.pending]: (state) => {
      state.status = "loading";
    },
    [addSetToLibrary.fulfilled]: (state, action) => {
      state.data.library.push(action.payload);
      state.status = "idle";
    },
    [addSetToLibrary.rejected]: (state) => {
      state.status = "error";
    },
    [removeSetFromLibrary.pending]: (state) => {
      state.status = "loading";
    },
    [removeSetFromLibrary.fulfilled]: (state, action) => {
      const newLibrary = state.data.library.filter(
        (set) => set.setId !== action.payload.setId
      );

      state.data.library = newLibrary;

      state.status = "idle";
    },
    [removeSetFromLibrary.rejected]: (state) => {
      state.status = "error";
    },

    [getLibrarySets.pending]: (state) => {
      state.status = "loading";
    },
    [getLibrarySets.fulfilled]: (state, action) => {
      state.status = "idle";
      state.data.library = action.payload;
    },
    [getLibrarySets.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const {} = setsSlice.actions;

export default setsSlice;
