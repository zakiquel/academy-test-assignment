import React, {memo} from 'react';
import {Ticket} from "../../../../pages/MainPage/model/types/ticket";
import {classNames} from "shared/lib/classNames/classNames";
import cls from './TicketsList.module.scss';
import {TicketCard} from "../TicketCard/TicketCard";
import {useSelector} from "react-redux";
import {getTickets} from "pages/MainPage/model/slices/mainPageSlice";
import {getMainPageError, getMainPageIsLoading} from "pages/MainPage/model/selectors/mainPage";
export interface TicketsListProps {
  className?: string;
  isLoading?: boolean;
}

export const TicketsList = memo((props: TicketsListProps) => {
  const { className } = props;
  const tickets = useSelector(getTickets.selectAll);
  const isLoading = useSelector(getMainPageIsLoading);
  const error = useSelector(getMainPageError);

  if (isLoading) {
    return (
        <div className={cls.Loading}>Идёт загрузка билетов...</div>
    )
  }

  if (error) {
    return (
        <div>Произошла ошибка при загрузке билетов</div>
    )
  }

  const renderTicket = (ticket: Ticket) => (
    <TicketCard ticket={ticket} key={ticket.id} />
  );

  return (
    <div className={classNames(cls.TicketsList, {}, [className])}>
      {tickets.length > 0
          ? tickets.map(renderTicket)
          : <div className={cls.Loading}>Билеты не найдены...</div>
      }
    </div>
  );
});

