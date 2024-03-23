import {AppRoutes, getRouteFlightDetails, getRouteMain} from "shared/const/router";
import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/MainPage";
import {NotFoundPage} from "pages/NotFoundPage";
import {FlightDetailsPage} from "pages/FlightDetailsPage";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.FLIGHT_DETAILS]: {
    path: getRouteFlightDetails(':id'),
    element: <FlightDetailsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};