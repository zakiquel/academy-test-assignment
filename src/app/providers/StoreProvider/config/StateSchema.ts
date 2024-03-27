import { FlightDetailsSchema } from "entities/Flight";
import {AxiosInstance} from "axios";
import {MainPageSchema} from "pages/MainPage";
export interface StateSchema {
  flightDetails?: FlightDetailsSchema;
  mainPage?: MainPageSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}