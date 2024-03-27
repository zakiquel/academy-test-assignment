import React, {memo, ReactNode, useCallback} from 'react';

import {Ticket} from "../../model/types/ticket";
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

export interface TicketCardProps {
  className?: string;
  ticket: Ticket;
}

const logoMap: Record<string, ReactNode> = {
  "United Airlines": <AirlineLogo1 width={50} height={50}/>,
  "Ryanair": <AirlineLogo2 width={50} height={50}/>,
  "Southwest Airlines": <AirlineLogo3 width={50} height={50}/>,
};

export const TicketCard = memo((props: TicketCardProps) => {
  const {
    className,
    ticket,
  } = props
  const navigate = useNavigate();

  const onOpenFlightDetails = useCallback((ticketId: string, flightId: string) => {
    return () => {
      navigate(getRouteFlightDetails(ticketId, flightId));
    };
  }, [navigate]);

  return (
    <Card
      className={classNames(cls.TicketCard, {}, [className])}
      theme={CardTheme.OUTLINED}
    >
      <div className={cls.Header}>
        <p className={cls.Price}>
          {ticket.price} ₽
        </p>
        <div className={cls.Logo}>
          {logoMap[ticket.airline]}
        </div>
      </div>
      <div className={cls.Flights}>
        {ticket.flights.map((flight: Flight) => (
          <Card
            className={cls.FlightInfo}
            theme={CardTheme.OUTLINED}
            onClick={onOpenFlightDetails(ticket.id, flight.id)}
            key={flight.id}
          >
            <div className={cls.Departure}>
              <p className={cls.City}>{flight.origin}</p>
              <p className={cls.Time}>{flight.departure_time}</p>
            </div>
            <div className={cls.Arrive}>
              <p className={cls.City}>{flight.destination}</p>
              <p className={cls.Time}>{flight.arrival_time}</p>
            </div>
            <div className={cls.FlightTime}>
              <p>В пути</p>
              <p className={cls.Time}>{formatTime(flight.duration)}</p>
            </div>
            <div className={cls.Changes}>
              <p>{`Пересадки: ${flight.number_of_changes}`}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
});

