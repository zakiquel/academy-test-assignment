import { type Ticket } from 'entities/Flight'
import { type SortOrder } from 'shared/types/sortOrder'
import { type TicketSortField } from './ticket'
import { type EntityState } from '@reduxjs/toolkit'

export interface MainPageSchema extends EntityState<Ticket, string> {
  isLoading: boolean
  error?: string

  // filters
  order: SortOrder
  sort: TicketSortField
  search: string
  changes: number

  _inited: boolean
}
