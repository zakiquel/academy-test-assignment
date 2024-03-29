import React, { memo, useMemo } from 'react'
import cls from './MainPageSortSelector.module.scss'
import { Select, type SelectOption } from 'shared/ui/Select'
import { TicketSortField } from '../../model/types/ticket'
import { type SortOrder } from 'shared/types/sortOrder'

interface MainPageSortSelectorProps {
  sort: TicketSortField
  order: SortOrder
  onChangeSort: (newSort: TicketSortField) => void
  onChangeOrder: (newOrder: SortOrder) => void
}

export const MainPageSortSelector = memo((props: MainPageSortSelectorProps) => {
  const {
    sort,
    order,
    onChangeOrder,
    onChangeSort
  } = props
  const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(() => [
    {
      value: 'asc',
      content: 'возрастанию'
    },
    {
      value: 'desc',
      content: 'убыванию'
    }
  ], [])

  const sortFieldOptions = useMemo<Array<SelectOption<TicketSortField>>>(() => [
    {
      value: TicketSortField.PRICE,
      content: 'цене'
    },
    {
      value: TicketSortField.AIRLINE,
      content: 'авиакомпании'
    }
  ], [])

  return (
    <div className={cls.MainPageSortSelector}>
      <Select
        options={sortFieldOptions}
        label="Сортировать по"
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label="по"
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  )
})
