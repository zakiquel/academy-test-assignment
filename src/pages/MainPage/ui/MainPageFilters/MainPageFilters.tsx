import React, { memo, useCallback, useMemo } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './MainPageFilters.module.scss'
import { Card, CardTheme } from 'shared/ui/Card'
import { Input } from 'shared/ui/Input'
import { MainPageSortSelector } from '../MainPageSortSelector/MainPageSortSelector'
import { useSelector } from 'react-redux'
import { getMainPageChanges, getMainPageOrder, getMainPageSearch, getMainPageSort } from '../../model/selectors/mainPage'
import { type SortOrder } from 'shared/types/sortOrder'
import { type TicketSortField } from '../../model/types/ticket'
import { mainPageActions } from '../../model/slices/mainPageSlice'
import { fetchTicketsList } from '../../model/services/fetchTicketsList/fetchTicketsList'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { type TabItem, Tabs } from 'shared/ui/Tabs/Tabs'

export const MainPageFilters = memo(() => {
  const dispatch = useAppDispatch()
  const order = useSelector(getMainPageOrder)
  const sort = useSelector(getMainPageSort)
  const search = useSelector(getMainPageSearch)
  const changes = useSelector(getMainPageChanges)

  const fetchDataDebounced = useDebounce(() => {
    dispatch(fetchTicketsList({ replace: true }))
  }, 500)

  const onChangeSort = useCallback((sort: TicketSortField) => {
    dispatch(mainPageActions.setSort(sort))
    fetchDataDebounced()
  }, [dispatch, fetchDataDebounced])

  const onChangeOrder = useCallback((order: SortOrder) => {
    dispatch(mainPageActions.setOrder(order))
    fetchDataDebounced()
  }, [dispatch, fetchDataDebounced])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(mainPageActions.setSearch(search))
    fetchDataDebounced()
  }, [dispatch, fetchDataDebounced])

  const onChangeType = useCallback((tab: TabItem) => {
    dispatch(mainPageActions.setType(tab.value))
  }, [dispatch])

  const typeTabs = useMemo<TabItem[]>(() => [
    {
      value: 0,
      content: 'Без пересадок'
    },
    {
      value: 1,
      content: '1 пересадка'
    },
    {
      value: 2,
      content: '2 пересадки'
    },
    {
      value: 3,
      content: '3 пересадки'
    },
    {
      value: -1,
      content: 'Все'
    }
  ], [])

  return (
    <div className={cls.MainPageFilters}>
      <div className={cls.Search}>
        <Card
          theme={CardTheme.OUTLINED}
          className={cls.SearchCard}
        >
          <Input
            placeholder="Поиск "
            value={search}
            onChange={onChangeSearch}
          />
        </Card>
      </div>
      <div className={cls.sortWrapper}>
        <MainPageSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </div>
      <Tabs
        tabs={typeTabs}
        value={changes}
        onTabClick={onChangeType}
        className={cls.Tabs}
      />
    </div>
  )
})
