export enum AppRoutes {
  MAIN = 'main',
  FLIGHT_DETAILS = 'flight_details',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteFlightDetails = (ticketId: string, flightId: string) => `/ticket/${ticketId}/flight/${flightId}`;