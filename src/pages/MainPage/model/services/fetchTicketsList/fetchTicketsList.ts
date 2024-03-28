import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {ThunkConfig} from "app/providers/StoreProvider/config/StateSchema";
import {Ticket} from "entities/Flight";
import {
    getMainPageChanges,
    getMainPageOrder,
    getMainPageSearch,
    getMainPageSort
} from "pages/MainPage/model/selectors/mainPage";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

interface fetchTicketsListProps {
    replace?: boolean;
}

export const fetchTicketsList = createAsyncThunk<
  Ticket[],
  fetchTicketsListProps,
  ThunkConfig<string>
>(
  'mainPage/fetchFlight',
  async (props, { rejectWithValue, getState }) => {
      const order = getMainPageOrder(getState());
      const sort = getMainPageSort(getState());
      const search = getMainPageSearch(getState());
      const changes = JSON.stringify(getMainPageChanges(getState()));


    try {
        addQueryParams({
            sort, order, search, changes
        })
      const response = await axios.get<Ticket[]>(`http://localhost:8000/tickets/`, {
          params: {
            _sort: sort,
            _order: order,
            q: search,
            changes: changes === '-1' ? undefined : changes
          }
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
