import { FlightDetailsSchema } from "entities/Flight";
import {AxiosInstance} from "axios";
export interface StateSchema {
  flightDetails?: FlightDetailsSchema;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}