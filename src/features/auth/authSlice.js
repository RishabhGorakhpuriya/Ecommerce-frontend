import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, CreateUser, loginUser, logOut, } from './authAPI';
import { updateUser } from '../user/userAPI'
const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error: null,
  userChecked : false
};

export const CreateUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (userData) => {
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }

  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error)
    }

  }
);

export const logOutAsync = createAsyncThunk(
  'user/logOut',
  async (loginInfo) => {
    const response = await logOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
  }
});

export const { increment } = counterSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken
export const selectError = (state) => state.auth.error
export const selectUserChecked = (state) => state.auth.userChecked;

export default counterSlice.reducer;
