import React, {memo} from 'react';
import {Ticket} from "../../../../pages/MainPage/model/types/ticket";
import {classNames} from "shared/lib/classNames/classNames";
import cls from './TicketsList.module.scss';
import {TicketCard} from "../TicketCard/TicketCard";
export interface TicketsListProps {
  className?: string;
  tickets: Ticket[];
  isLoading?: boolean;
}

export const TicketsList = memo((props: TicketsListProps) => {
  const {
    className,
    tickets,
  } = props;

  const renderTicket = (ticket: Ticket) => (
    <TicketCard ticket={ticket} key={ticket.id} />
  );

  return (
    <div className={classNames(cls.TicketsList, {}, [className])}>
      {tickets
      ? tickets.map(renderTicket)
      : null
      }
    </div>
  );
});

