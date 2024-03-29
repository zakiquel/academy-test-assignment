import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";
import {Ticket} from "pages/MainPage/model/types/ticket";
import {fetchFlight} from "entities/Flight/model/services/fetchFlight";

interface orderFlightProps {
  ticketId: string,
  flightId: string,
}

export const orderFlight = createAsyncThunk<
  Ticket,
  orderFlightProps,
  ThunkConfig<string>
>(
  'flightDetails/orderFlight',
  async ({ticketId, flightId}, { rejectWithValue, dispatch }) => {
    try {
      const ticket = await axios.get<Ticket>(`http://localhost:8000/tickets/${ticketId}`);

      const flight = ticket.data.flights.find(
        (flight) => flight.id === flightId
      );

      const updatedFlight = {...flight, actual: false}

      const updatedFlights = ticket.data.flights.filter(
        (flight) => flight.id !== flightId
      );

      updatedFlights.push(updatedFlight)

      const updatedTicket = {...ticket.data, flights: updatedFlights};

      const response = await axios.put<Ticket>(`http://localhost:8000/tickets/${ticketId}`, updatedTicket);

      dispatch(fetchFlight({ ticketId, flightId }))

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
