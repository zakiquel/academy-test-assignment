import {Ticket} from "entities/Flight";

export interface MainPageSchema {
  isLoading: boolean;
  error?: string;
  data?: Ticket[];
}