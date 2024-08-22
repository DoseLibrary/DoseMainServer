import { createAppSlice } from "../../app/createAppSlice";
import { ContentServer } from "../../types/ContentServer";
import axios from 'axios';
import { selectUserToken } from '../auth/authSlice';
import { RootState } from '../../app/store';
import { rejectWithValueToString } from "../../utils/errors";

interface ValidateResponse {
  status: 'error' | 'success';
  error?: string;
  token?: string;
  validTo?: number;
}

interface SessionState {
  currentContentServer: ContentServer | undefined,
  token?: string;
  tokenValidTo?: number;
}

const initialState: SessionState = {
  currentContentServer: undefined,
  token: undefined,
  tokenValidTo: undefined,
}

export const sessionSlice = createAppSlice({
  name: 'session',
  initialState,
  reducers: create => ({
    setActiveContentServer: create.asyncThunk(
      async (contentServer: ContentServer, { getState, rejectWithValue }) => {
        try {
          const response = await axios.post<ValidateResponse>(`${contentServer.url}/api/validate`, {
            token: selectUserToken(getState() as RootState)
          });
          if (response.data.status === 'error') {
            throw new Error(response.data.error);
          }
          const { token, validTo } = response.data as ValidateResponse;
          if (token === undefined || validTo === undefined) {
            throw new Error('Invalid response from server');
          }
          return {
            contentServer,
            token,
            validTo,
          }
        } catch (error) {
          return rejectWithValue((error as Error).message || 'Unknown error');
        }
      },
      {
        fulfilled: (state, action) => {
          state.currentContentServer = action.payload.contentServer;
          state.token = action.payload.token;
          state.tokenValidTo = action.payload.validTo;
        },
        rejected: (state, action) => {
          throw new Error(rejectWithValueToString(action.payload));
        },
      }
    )
  }),
  selectors: {
    selectHasContentServer: state => state.currentContentServer !== undefined,
  }
});

export const { setActiveContentServer } = sessionSlice.actions;
export const { selectHasContentServer } = sessionSlice.selectors;
