import { type Flight } from '../types/flight'

export interface FlightDetailsSchema {
  isLoading: boolean
  error?: string
  data?: Flight

}
