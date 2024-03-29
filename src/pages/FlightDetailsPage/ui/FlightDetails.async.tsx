import { lazy } from 'react'

export const FlightDetailsAsync = lazy(async () => await import('./FlightDetailsPage').then())
