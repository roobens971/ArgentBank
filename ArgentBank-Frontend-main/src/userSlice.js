// src/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null, // récupère le token s'il existe
  profile: JSON.parse(localStorage.getItem('profile')) || null // récupère le profil s'il existe
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // on sauvegarde aussi dans localStorage
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem('profile', JSON.stringify(action.payload)); // sauvegarde profil
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
      localStorage.removeItem('token');
      localStorage.removeItem('profile'); // on efface aussi le profil
    }
  }
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer;
