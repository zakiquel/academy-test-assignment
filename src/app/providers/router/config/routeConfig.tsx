import {AppRoutes, getRouteFlightDetails, getRouteMain} from "../../../../shared/const/router";
import {RouteProps} from "react-router-dom";
import {MainPageAsync} from "../../../../pages/MainPage/MainPage.async";
import {FlightDetailsAsync} from "../../../../pages/FlightDetailsPage/FlightDetails.async";
import NotFoundPage from "../../../../pages/NotFoundPage/NotFoundPage";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPageAsync />,
  },
  [AppRoutes.FLIGHT_DETAILS]: {
    path: getRouteFlightDetails(':id'),
    element: <FlightDetailsAsync />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};