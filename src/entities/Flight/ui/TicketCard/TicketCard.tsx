import React, {memo, ReactNode, useCallback} from 'react';

import {Ticket} from "../../../../pages/MainPage/model/types/ticket";
import {Flight} from "../../model/types/flight";

import AirlineLogo1 from "shared/assets/airliner.svg";
import AirlineLogo2 from "shared/assets/airliner-1.svg";
import AirlineLogo3 from "shared/assets/airliner-2.svg";
import {formatTime} from "shared/lib/formatTime/formatTime";
import {classNames} from "shared/lib/classNames/classNames";
import {Card, CardTheme} from "shared/ui/Card";

import cls from './TicketCard.module.scss';
import {useNavigate} from "react-router-dom";
import {getRouteFlightDetails} from "shared/const/router";
import {useSelector} from "react-redux";
import {getMainPageChanges} from "pages/MainPage/model/selectors/mainPage";
import {FlightCard} from "entities/Flight/ui/FlightCard/FlightCard";

export interface TicketCardProps {
  className?: string;
  ticket: Ticket;
}

const logoMap: Record<string, ReactNode> = {
  "Singapore Airlines": <AirlineLogo1 width={60} height={60}/>,
  "Ryanair": <AirlineLogo2 width={60} height={60}/>,
  "Southwest Airlines": <AirlineLogo3 width={60} height={60}/>,
};

export const TicketCard = memo((props: TicketCardProps) => {
  const { className, ticket } = props;
  const changes = useSelector(getMainPageChanges);

  const flights = ticket.flights.map((flight: Flight) => {
    if (changes === flight.number_of_changes || changes === -1) {
      return (
          <FlightCard ticketId={ticket.id} flight={flight} />
      );
    }
  });

  const notNullFlights = flights.filter((flight) => flight !== undefined);

  return (
      <Card
          className={classNames(cls.TicketCard, {}, [className])}
          theme={CardTheme.OUTLINED}
      >
        <div className={cls.Header}>
          <p className={cls.Price}>
            {ticket.price} ₽
          </p>
          <p className={cls.Cities}>{ticket.departure_city} - {ticket.arrival_city}</p>
          <div className={cls.Logo}>
            {logoMap[ticket.airline]}
          </div>
        </div>
        <div className={cls.Flights}>
          {notNullFlights.length
              ? flights
              : <div className={cls.NotFound}>Полёты не найдены</div>
          }
        </div>
      </Card>
  );
});

