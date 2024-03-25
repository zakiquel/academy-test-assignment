import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";

export const getFlightDetailsData = (state: StateSchema) => state.flightDetails?.data;
export const getFlightDetailsIsLoading = (state: StateSchema) => state.flightDetails?.isLoading || false;
export const getFlightDetailsError = (state: StateSchema) => state.flightDetails?.error ?? '';
export const getFlightDetailsAirline = (state: StateSchema) => state.flightDetails?.data.airline ?? '';
export const getFlightDetailsDepart = (state: StateSchema) => state.flightDetails?.data.depart_date ?? '';
export const getFlightDetailsOrigin = (state: StateSchema) => state.flightDetails?.data.origin || '';
export const getFlightDetailsDestination = (state: StateSchema) => state.flightDetails?.data.destination ?? '';
export const getFlightDetailsGate = (state: StateSchema) => state.flightDetails?.data.gate ?? '';
export const getFlightDetailsReturn = (state: StateSchema) => state.flightDetails?.data.return_date ?? '';
export const getFlightDetailsOriginIATA = (state: StateSchema) => state.flightDetails?.data.origin_IATA ?? '';
export const getFlightDetailsDestIATA = (state: StateSchema) => state.flightDetails?.data.destination_IATA ?? '';
export const getFlightDetailsPrice = (state: StateSchema) => state.flightDetails?.data.price ?? 0;
export const getFlightDetailsChanges = (state: StateSchema) => state.flightDetails?.data.number_of_changes ?? 0;
export const getFlightDetailsClass = (state: StateSchema) => state.flightDetails?.data.trip_class ?? 0;
export const getFlightDetailsDistance = (state: StateSchema) => state.flightDetails?.data.distance ?? 0;
export const getFlightDetailsDuration = (state: StateSchema) => state.flightDetails?.data.duration ?? 0;
export const getFlightDetailsActual = (state: StateSchema) => state.flightDetails?.data.actual ?? 0;