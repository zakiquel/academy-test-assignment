import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Flight} from "entities/Flight/model/types/flight";
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";


export const orderFlight = createAsyncThunk<
  Flight,
  string,
  ThunkConfig<string>
>(
  'flightDetails/orderFlight',
  async (flightId, { rejectWithValue }) => {
    try {
      const currentRes = await axios.get<Flight>(`http://localhost:8000/flights/${flightId}`);
      const currentFlight = currentRes.data;

      const updatedFlight = { ...currentFlight, actual: false };

      const response = await axios.put<Flight>(`http://localhost:8000/flights/${flightId}`, updatedFlight);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
