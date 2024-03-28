import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";
import {TicketSortField} from "../types/ticket";

export const getMainPageIsLoading = (state: StateSchema) => state.mainPage?.isLoading ?? false;
export const getMainPageError = (state: StateSchema) => state.mainPage?.error;
export const getMainPageOrder = (state: StateSchema) => state.mainPage?.order ?? 'asc';
export const getMainPageSort = (state: StateSchema) => state.mainPage?.sort ?? TicketSortField.PRICE;
export const getMainPageSearch = (state: StateSchema) => state.mainPage?.search ?? '';