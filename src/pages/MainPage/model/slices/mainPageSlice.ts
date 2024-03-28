import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MainPageSchema} from "../types/mainPageSchema";
import {Ticket} from "entities/Flight";
import {TicketSortField} from "../types/ticket";
import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";
import {fetchTicketsList} from "../services/fetchTicketsList/fetchTicketsList";
import {SortOrder} from "shared/types/sortOrder";

const ticketsAdapter = createEntityAdapter<Ticket, string>({
  selectId: (ticket) => ticket.id,
});

export const getTickets = ticketsAdapter.getSelectors<StateSchema>(
    (state) => state.mainPage || ticketsAdapter.getInitialState(),
);

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: ticketsAdapter.getInitialState<MainPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    order: 'asc',
    sort: TicketSortField.PRICE,
    search: ''
  }),
  reducers: {
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<TicketSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          ticketsAdapter.removeAll(state);
        }
      })
      .addCase(fetchTicketsList.fulfilled, (
          state,
          action,
        ) => {
          state.isLoading = false;
          if (action.meta.arg.replace) {
            ticketsAdapter.setAll(state, action.payload)
          } else {
            ticketsAdapter.addMany(state, action.payload)
          }
        }
      )
      .addCase(fetchTicketsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;
