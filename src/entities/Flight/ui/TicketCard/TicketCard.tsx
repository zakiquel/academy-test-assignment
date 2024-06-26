import React, { memo, type ReactNode } from 'react'

import { type Ticket } from '../../../../pages/MainPage/model/types/ticket'
import { type Flight } from '../../model/types/flight'

import AirlineLogo1 from 'shared/assets/airliner.svg'
import AirlineLogo2 from 'shared/assets/airliner-1.svg'
import AirlineLogo3 from 'shared/assets/airliner-2.svg'
import { classNames } from 'shared/lib/classNames/classNames'
import { Card, CardTheme } from 'shared/ui/Card'

import cls from './TicketCard.module.scss'
import { useSelector } from 'react-redux'
import { getMainPageChanges } from 'pages/MainPage/model/selectors/mainPage'
import { FlightCard } from '../FlightCard/FlightCard'

export interface TicketCardProps {
  className?: string
  ticket: Ticket
}

const logoMap: Record<string, ReactNode> = {
  'Singapore Airlines': <AirlineLogo1 width={70} height={70}/>,
  'Ryanair': <AirlineLogo2 width={70} height={70}/>,
  'Southwest Airlines': <AirlineLogo3 width={70} height={70}/>
}

export const TicketCard = memo((props: TicketCardProps) => {
  const { className, ticket } = props
  const changes = useSelector(getMainPageChanges)

  const flights = ticket.flights.map((flight: Flight) => {
    if (changes === flight.number_of_changes || changes === -1) {
      return (
        <FlightCard
            ticketId={ticket.id}
            flight={flight}
            key={flight.id}
        />
      )
    }
  })

  const notNullFlights = flights.filter((flight) => flight !== undefined)

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
        {(notNullFlights.length)
          ? flights
          : <div className={cls.NotFound}>Полёты не найдены</div>
        }
      </div>
    </Card>
  )
})
