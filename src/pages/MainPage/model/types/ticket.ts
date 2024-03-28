import {Flight} from "entities/Flight";

export enum TicketSortField {
  AIRLINE = 'airline',
  PRICE = 'price',
}

export interface Ticket {
  id: string;
  airline: string;
  price: number;
  departure_city: string;
  arrival_city: string;
  flights: Flight[];
}