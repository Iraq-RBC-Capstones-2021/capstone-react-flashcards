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

    const timeStamp = firestore.FieldValue.serverTimestamp;

    const data = {
      title: newSet.name,
      description: newSet.description,
      tags: newSet.categories,
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
  },
});

export const {} = setsSlice.actions;

export default setsSlice;
