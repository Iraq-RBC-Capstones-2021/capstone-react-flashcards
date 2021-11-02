import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  collection,
  update,
} from "firebase/firestore";
import { db } from "../../firebase";
const initialState = {
  currentSet: "no-set-yet",
  userHistory: {},
  setProgress: { toReview: 0, learning: 0, new: 0 },
  totalProgress: { toReview: 0, learning: 0, new: 0 },
};

export const userHistory = createAsyncThunk(
  "history/userHistory",
  async (info) => {
    try {
      // const docSnap = await getDoc(doc(db, "history", info.userUID));
      const docSnap = db.doc(`history/${info.userUID}`);
      if (!(await getDoc(docSnap)).exists()) {
        setDoc(docSnap, {});
      }
      const setDocSnap = db.doc(`history/${info.userUID}/sets/${info.setId}`);
      if (!(await getDoc(setDocSnap)).exists()) {
        setDoc(setDocSnap, {});
      }

      const uh = [];
      const historySnap = await getDocs(
        collection(db, `history/${info.userUID}`, "sets")
      );
      historySnap.forEach((doc) => {
        uh.push({ [doc.id]: [doc.data()] });
      });

      return uh;
    } catch (error) {
      return error;
    }
  }
);

export const currentSet = createAsyncThunk(
  "history/currentSet",
  async (info) => {
    try {
      const q = query(
        collection(db, "cards"),
        where("setId", "==", info.setId)
      );
      const querySnapshot = await getDocs(q);
      const setCards = {
        cardsIds: [],
        cardsData: [],
        setName: "",
      };
      querySnapshot.forEach((doc) => {
        setCards.cardsIds.push(doc.id);
        setCards.cardsData.push(doc.data());
      });

      return setCards;
    } catch (error) {
      return error;
    }
  }
);

export const recordCorrect = createAsyncThunk(
  "history/recordCorrect",
  async (info) => {
    try {
      const docRef = db.doc(`history/${info.userUID}/sets/${info.setId}`);
      await docRef.update({
        [info.cardId]: { guess: true, lastPlayed: Date() },
      });

      return "";
    } catch (error) {
      return error;
    }
  }
);

export const recordIncorrect = createAsyncThunk(
  "history/recordIncorrect",
  async (info) => {
    try {
      const docRef = db.doc(`history/${info.userUID}/sets/${info.setId}`);
      await docRef.update({
        [info.cardId]: { guess: false, lastPlayed: Date() },
      });

      return "";
    } catch (error) {
      return error;
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    setCurrentSetId: (state, action) => {
      state.currentSet = action.payload;
    },
  },
  extraReducers: {
    [userHistory.pending]: (state) => {
      state.status = "loading";
    },
    [userHistory.fulfilled]: (state, action) => {
      state.userHistory = action.payload;
      state.status = "idle";
    },
    [userHistory.rejected]: (state) => {
      state.status = "error";
    },
    [currentSet.pending]: (state) => {
      state.status = "loading";
    },
    [currentSet.fulfilled]: (state, action) => {
      state.currentSet = action.payload;
      state.status = "idle";
    },
    [currentSet.rejected]: (state) => {
      state.status = "error";
    },
    [recordCorrect.pending]: (state) => {
      state.status = "loading";
    },
    [recordCorrect.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [recordCorrect.rejected]: (state) => {
      state.status = "error";
    },
    [recordIncorrect.pending]: (state) => {
      state.status = "loading";
    },
    [recordIncorrect.fulfilled]: (state, action) => {
      state.status = "idle";
    },
    [recordIncorrect.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { setCurrentSetId } = historySlice.actions;
export default historySlice;
