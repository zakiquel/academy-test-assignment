import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type MainPageSchema } from '../types/mainPageSchema'
import { type Ticket } from 'entities/Flight'
import { TicketSortField } from '../types/ticket'
import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { fetchTicketsList } from '../services/fetchTicketsList/fetchTicketsList'
import { type SortOrder } from 'shared/types/sortOrder'

const ticketsAdapter = createEntityAdapter<Ticket, string>({
  selectId: (ticket) => ticket.id
})

export const getTickets = ticketsAdapter.getSelectors<StateSchema>(
  (state) => state.mainPage || ticketsAdapter.getInitialState()
)

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: ticketsAdapter.getInitialState<MainPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    order: 'asc',
    sort: TicketSortField.PRICE,
    search: '',
    changes: -1,
    _inited: false
  }),
  reducers: {
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<TicketSortField>) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setType: (state, action: PayloadAction<number>) => {
      state.changes = action.payload
    },
    initState: (state) => {
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true

        if (action.meta.arg.replace) {
          ticketsAdapter.removeAll(state)
        }
      })
      .addCase(fetchTicketsList.fulfilled, (
        state,
        action
      ) => {
        state.isLoading = false
        if (action.meta.arg.replace) {
          ticketsAdapter.setAll(state, action.payload)
        } else {
          ticketsAdapter.addMany(state, action.payload)
        }
      }
      )
      .addCase(fetchTicketsList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: mainPageActions } = mainPageSlice
export const { reducer: mainPageReducer } = mainPageSlice
