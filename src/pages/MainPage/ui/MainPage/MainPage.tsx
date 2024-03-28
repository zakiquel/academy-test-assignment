import React, {memo, useEffect} from 'react';
import {TicketsList} from "entities/Flight";
import cls from './MainPage.module.scss';
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchTicketsList} from "../../model/services/fetchTicketsList/fetchTicketsList";
import {useSelector} from "react-redux";
import {getMainPageError, getMainPageIsLoading} from "../../model/selectors/mainPage";
import {MainPageFilters} from "pages/MainPage/ui/MainPageFilters/MainPageFilters";
import {getTickets} from "pages/MainPage/model/slices/mainPageSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const tickets = useSelector(getTickets.selectAll);
  const isLoading = useSelector(getMainPageIsLoading);
  const error = useSelector(getMainPageError);

  useEffect(() => {
    dispatch(fetchTicketsList({}));
  }, []);

  if (isLoading) {
    return (
      <div>Идёт загрузка билетов...</div>
    )
  }

  if (error) {
    return (
      <div>Произошла ошибка при загрузке билетов</div>
    )
  }

  return (
    <div className={cls.MainPage}>
      <MainPageFilters />
      <TicketsList />
    </div>
  );
};

export default memo(MainPage);