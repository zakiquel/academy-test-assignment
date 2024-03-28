import React, {memo} from 'react';
import {Ticket} from "../../../../pages/MainPage/model/types/ticket";
import {classNames} from "shared/lib/classNames/classNames";
import cls from './TicketsList.module.scss';
import {TicketCard} from "../TicketCard/TicketCard";
import {useSelector} from "react-redux";
import {getTickets} from "pages/MainPage/model/slices/mainPageSlice";
export interface TicketsListProps {
  className?: string;
  isLoading?: boolean;
}

export const TicketsList = memo((props: TicketsListProps) => {
  const { className } = props;
  const tickets = useSelector(getTickets.selectAll);

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

