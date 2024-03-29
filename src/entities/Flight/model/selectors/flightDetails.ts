import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema'

export const getFlightDetailsData = (state: StateSchema) => state.flightDetails?.data
export const getFlightDetailsIsLoading = (state: StateSchema) => state.flightDetails?.isLoading
export const getFlightDetailsError = (state: StateSchema) => state.flightDetails?.error ?? ''
