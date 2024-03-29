import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type FlightDetailsSchema } from '../types/flightDetailsSchema'
import { fetchFlight } from '../services/fetchFlight'
import { type Flight } from '../types/flight'
import { orderFlight } from '../services/orderFlight'

const initialState: FlightDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined
}

export const flightDetailsSlice = createSlice({
  name: 'flightDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlight.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchFlight.fulfilled, (
        state,
        action: PayloadAction<Flight>
      ) => {
        state.isLoading = false
        state.data = action.payload
      }
      )
      .addCase(fetchFlight.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(orderFlight.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(orderFlight.fulfilled, (
        state,
        action: PayloadAction<Flight>
      ) => {
        state.isLoading = false
        state.data = action.payload
      }
      )
      .addCase(orderFlight.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: flightDetailsActions } = flightDetailsSlice
export const { reducer: flightDetailsReducer } = flightDetailsSlice
