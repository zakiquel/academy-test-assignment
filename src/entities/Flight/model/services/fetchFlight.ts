import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { type Flight, type Ticket } from 'entities/Flight'

interface fetchFlightProps {
  ticketId: string
  flightId: string
}

export const fetchFlight = createAsyncThunk<
Flight,
fetchFlightProps,
ThunkConfig<string>
>(
  'flightDetails/fetchFlight',
  async ({ ticketId, flightId }, { rejectWithValue }) => {
    try {
      if (!ticketId) {
        throw new Error('')
      }

      const response = await axios.get<Ticket>(`http://localhost:8000/tickets/${ticketId}`)

      const flight = response.data.flights.find(
        (flight) => flight.id === flightId
      )

      if (!response.data || !flight) {
        throw new Error()
      }

      return flight
    } catch (e) {
      return rejectWithValue('Fetching error')
    }
  }
)
