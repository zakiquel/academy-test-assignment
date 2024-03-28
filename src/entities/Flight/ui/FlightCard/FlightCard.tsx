import React, {memo, useCallback} from 'react';
import cls from './FlightCard.module.scss';
import {Card, CardTheme} from "shared/ui/Card";
import {formatTime} from "shared/lib/formatTime/formatTime";
import {Flight} from "entities/Flight";
import {getRouteFlightDetails} from "shared/const/router";
import {useNavigate} from "react-router-dom";

interface FlightCardProps {
    flight: Flight;
    ticketId: string;
}
export const FlightCard = memo(({flight, ticketId}: FlightCardProps) => {
    const navigate = useNavigate();

    const onOpenFlightDetails = useCallback((ticketId: string, flightId: string) => {
        return () => {
            navigate(getRouteFlightDetails(ticketId, flightId));
        };
    }, [navigate]);

    return (
        <Card
            className={cls.FlightCard}
            theme={CardTheme.OUTLINED}
            onClick={onOpenFlightDetails(ticketId, flight.id)}
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
    );
});
