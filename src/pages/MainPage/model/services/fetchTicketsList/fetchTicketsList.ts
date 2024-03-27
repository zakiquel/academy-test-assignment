import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";
import {Ticket} from "entities/Flight";

export const fetchTicketsList = createAsyncThunk<
  Ticket[],
  void,
  ThunkConfig<string>
>(
  'mainPage/fetchFlight',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Ticket[]>(`http://localhost:8000/tickets/`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
