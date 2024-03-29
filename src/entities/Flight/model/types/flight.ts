export interface Flight {
  id: string
  airline: string
  depart_date: string
  departure_time: string
  arrival_time: string
  origin: string
  origin_IATA: string
  destination: string
  destination_IATA: string
  gate: string
  return_date: string
  found_at: string
  trip_class: number
  price: number
  number_of_changes: number
  duration: number
  distance: number
  actual: boolean
}
