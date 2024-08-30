import axios from "axios";
import { createAppSlice } from "../../app/createAppSlice";
import { LoginResponse } from "@shared/types/response/LoginResponse";

interface AuthSliceState {
  loading: boolean;
  userInfo: any; // Set this..
  userToken: string | null;
  refreshToken: string | null;
  error: any;
  success: boolean;
}

const initialState: AuthSliceState = {
  loading: false,
  userInfo: {},
  userToken: null,
  refreshToken: null,
  error: null,
  success: false
};

const objHasMessage = (val: unknown): val is { message: string } => {
  return (
    typeof val === 'object' &&
    val !== null &&
    'message' in val
  )
};

const getErrorMsg = (error: any) => {
  if (error?.response?.data?.message !== undefined) {
    return error.response.data.message;
  }
  if (objHasMessage(error)) {
    return error.message;
  }
  return JSON.stringify(error);
}

const backendUrl = '/api';
const config = {
  headers: {
    'Content-Type': 'application/json'
  },
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    registerThunk: create.asyncThunk(
      async ({ username, password }, { rejectWithValue }) => {
        try {
          await axios.post(
            `${backendUrl}/auth/register`,
            { username, password },
            config
          );
        } catch (error) {
          throw rejectWithValue(getErrorMsg(error));
        }
      },
      {
        pending: state => {
          state.error = null;
          state.loading = true;
        },
        fulfilled: state => {
          state.loading = false;
          state.success = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          throw new Error(state.error);
        }
      }
    ),
    loginThunk: create.asyncThunk(
      async({ username, password }, { rejectWithValue },) => {
        try {
          const response = await axios.post<LoginResponse>(
            `${backendUrl}/auth/login`,
            { username, password },
            config
          );
          return response.data;
        } catch (error) {
          throw rejectWithValue(getErrorMsg(error));
        }
      },
      {
        pending: state => {
          state.error = null;
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.success = true;
          console.log(action.payload);
          state.userToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          throw new Error(state.error);
        }
      }
    ),
    resetError: create.reducer(
      state => {
        state.error = null;
      }
    )
  }),
  selectors: {
    selectLoading: state => state.loading,
    selectUserInfo: state => state.userInfo,
    selectUserToken: state => state.userToken,
    selectError: state => state.error,
    selectSuccess: state => state.success,
    selectIsLoggedIn: state => state.userToken !== null,
  }
});

export const { registerThunk, loginThunk, resetError } = authSlice.actions;
export const { selectLoading, selectUserInfo, selectUserToken, selectError, selectSuccess, selectIsLoggedIn } = authSlice.selectors;