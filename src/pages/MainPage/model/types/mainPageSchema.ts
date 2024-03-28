import {Ticket} from "entities/Flight";
import {SortOrder} from "shared/types/sortOrder";
import {TicketSortField} from "./ticket";
import {EntityState} from "@reduxjs/toolkit";

export interface MainPageSchema extends EntityState<Ticket, string>{
  isLoading: boolean;
  error?: string;

  //filters
  order: SortOrder;
  sort: TicketSortField;
  search: string;
}