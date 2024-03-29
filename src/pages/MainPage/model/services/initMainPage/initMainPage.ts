import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMainPageInited } from '../../selectors/mainPage'
import { type TicketSortField } from '../../types/ticket'
import { type ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import { type SortOrder } from 'shared/types/sortOrder'
import { mainPageActions } from 'pages/MainPage/model/slices/mainPageSlice'
import { fetchTicketsList } from 'pages/MainPage/model/services/fetchTicketsList/fetchTicketsList'

export const initMainPage = createAsyncThunk<
void,
URLSearchParams,
ThunkConfig<string>
>(
  'mainPage/initMainPage',
  async (searchParams, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const inited = getMainPageInited(getState())

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder
      const sortFromUrl = searchParams.get('sort') as TicketSortField
      const searchFromUrl = searchParams.get('search')
      // const typeFromUrl = searchParams.get('type') as ArticleType;

      if (orderFromUrl) {
        dispatch(mainPageActions.setOrder(orderFromUrl))
      }
      if (sortFromUrl) {
        dispatch(mainPageActions.setSort(sortFromUrl))
      }
      if (searchFromUrl) {
        dispatch(mainPageActions.setSearch(searchFromUrl))
      }
      // if (typeFromUrl) {
      //     dispatch(mainPageActions.setType(typeFromUrl));
      // }

      dispatch(mainPageActions.initState())
      dispatch(fetchTicketsList({}))
    }
  }
)
