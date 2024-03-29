import React, { memo } from 'react'
import { FlightDetails, FlightDetailsHeader } from 'entities/Flight'
import { useParams } from 'react-router-dom'
import cls from './FlightDetailsPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

const FlightDetailsPage = () => {
  const { flightId, ticketId } = useParams<{ flightId: string, ticketId: string }>()

  if (!flightId || !ticketId) {
    return (
      <div>
        Статья не найдена
      </div>
    )
  }

  return (
    <main
      className={classNames(cls.FlightDetailsPage)}
    >
      <FlightDetailsHeader />
      <FlightDetails flightId={flightId} ticketId={ticketId} />
    </main>
  )
}

export default memo(FlightDetailsPage)
