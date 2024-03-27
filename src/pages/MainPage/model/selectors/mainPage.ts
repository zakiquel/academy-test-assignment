import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";

export const getMainPageData = (state: StateSchema) => state.mainPage?.data;
export const getMainPageIsLoading = (state: StateSchema) => state.mainPage?.isLoading ?? false;
export const getMainPageError = (state: StateSchema) => state.mainPage?.error;