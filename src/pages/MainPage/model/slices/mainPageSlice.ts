import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MainPageSchema} from "../types/mainPageSchema";
import {Ticket} from "entities/Flight";
import {fetchTicketsList} from "../services/fetchTicketsList/fetchTicketsList";

const initialState: MainPageSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchTicketsList.fulfilled, (
          state,
          action: PayloadAction<Ticket[]>,
        ) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchTicketsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;
