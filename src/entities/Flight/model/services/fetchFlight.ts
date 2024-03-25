import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Flight} from "entities/Flight/model/types/flight";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";



export const fetchFlight = createAsyncThunk<
  Flight,
  string,
  ThunkConfig<string>
>(
  'flightDetails/fetchFlight',
  async (flightId, { rejectWithValue }) => {

    try {
      if (!flightId) {
        throw new Error('');
      }

      const response = await axios.get<Flight>(`http://localhost:8000/flights/${flightId}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
