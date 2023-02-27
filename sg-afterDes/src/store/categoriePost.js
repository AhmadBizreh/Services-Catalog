import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  Categorie: null,
  categoryId: null,
  isPickeCategorie: false,
};

const categorieSlice = createSlice({
  name: "categoriePost",
  initialState: initialAuthState,
  reducers: {
    PickeCategorie(steat, action) {
      steat.isPickeCategorie = true;
      steat.categoryId =action.payload.categoryId;
      steat.Categorie = action.payload.Categorie;
    },
    RemovePickeCategorie(steat) {
      steat.isPickeCategorie = false;
      steat.categoryId = null;
      steat.Categorie = null;
    },
  },
});
export const categorieAction = categorieSlice.actions;
export default categorieSlice.reducer;
