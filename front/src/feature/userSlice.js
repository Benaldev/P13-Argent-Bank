import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Requête GET profil
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.body;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur serveur");
    }
  }
);

// Requête PUT mise à jour
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return { firstName, lastName };
    } catch (err) {
      return rejectWithValue(err.message || "Erreur serveur");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isEditing: false,
    loading: false,
    error: null,
  },
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
        state.isEditing = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setIsEditing, logout } = userSlice.actions;
export default userSlice.reducer;
