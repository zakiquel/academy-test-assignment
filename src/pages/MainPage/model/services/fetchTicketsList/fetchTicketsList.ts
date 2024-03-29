import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { type Ticket } from 'entities/Flight'
import {
  getMainPageOrder,
  getMainPageSearch,
  getMainPageSort
} from '../../selectors/mainPage'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'

interface fetchTicketsListProps {
  replace?: boolean
}

export const fetchTicketsList = createAsyncThunk<
Ticket[],
fetchTicketsListProps,
ThunkConfig<string>
>(
  'mainPage/fetchFlight',
  async (props, { rejectWithValue, getState }) => {
    const order = getMainPageOrder(getState())
    const sort = getMainPageSort(getState())
    const search = getMainPageSearch(getState())

    try {
      addQueryParams({
        sort, order, search
      })
      const response = await axios.get<Ticket[]>('http://localhost:8000/tickets/', {
        params: {
          _sort: sort,
          _order: order,
          q: search
        }
      })

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      return rejectWithValue('Fetching error')
    }
  }
)
