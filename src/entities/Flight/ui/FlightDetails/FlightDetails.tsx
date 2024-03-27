import {memo, ReactNode, useCallback, useEffect, useState} from 'react';
import cls from './FlightDetails.module.scss';
import {classNames} from "shared/lib/classNames/classNames";
import {fetchFlight} from "../../model/services/fetchFlight";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
  getFlightDetailsData,
  getFlightDetailsError,
  getFlightDetailsIsLoading,
} from "../../model/selectors/flightDetails";
import {Text, TextAlign} from 'shared/ui/Text';
import {Card, CardTheme} from "shared/ui/Card";
import {Button} from "shared/ui/Button";
import {formatDate} from "shared/lib/formatDate/formatDate";
import {formatTime} from "shared/lib/formatTime/formatTime";
import {OrderModal} from "features/OrderModal/OrderModal";
import {orderFlight} from "entities/Flight/model/services/orderFlight";
import AirlineLogo1 from "shared/assets/airliner.svg";
import AirlineLogo2 from "shared/assets/airliner-1.svg";
import AirlineLogo3 from "shared/assets/airliner-2.svg";

interface FlightDetailsProps {
  className?: string;
  flightId?: string;
  ticketId?: string;
}

const classMap: Record<number, string> = {
  0: 'Эконом-класс',
  1: 'Бизнес-класс',
  2: 'Первый класс',
};

const logoMap: Record<string, ReactNode> = {
  "United Airlines": <AirlineLogo1 width={80} height={80}/>,
  "Ryanair": <AirlineLogo2 width={80} height={80}/>,
  "Southwest Airlines": <AirlineLogo3 width={80} height={80}/>,
};

export const FlightDetails = memo((props: FlightDetailsProps) => {
  const {
    className,
    ticketId,
    flightId,
  } = props;
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getFlightDetailsIsLoading);
  const flight = useSelector(getFlightDetailsData);
  const error = useSelector(getFlightDetailsError);
  const [isOrderModal, setIsOrderModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsOrderModal(false);
    dispatch(orderFlight(flightId));
  }, []);

  const onShowModal = useCallback(() => {
    setIsOrderModal(true);
  }, []);

  useEffect(() => {
    dispatch(fetchFlight({ticketId, flightId}));
  }, [dispatch, ticketId]);

  if (isLoading) {
    return (
    <Text
      className={cls.Loading}
      align={TextAlign.CENTER}
      title="Информация загружается..."
    />
    )
  }

  if (!flight) {
    return (
      <Text
        align={TextAlign.CENTER}
        title="Данные о полете не загружены"
      />
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.FlightDetails, {}, [className])}>
        <Text
          align={TextAlign.CENTER}
          title="Произошла ошибка при загрузке страницы полета"
        />
      </div>
    )
  } else {
    const date = formatDate(flight.depart_date);
    const time = formatTime(flight.duration);
    const flightClass = classMap[flight.trip_class];
    return (
      <div className={classNames(cls.FlightDetails, {}, [className])}>
        <Card
          theme={CardTheme.NORMAL}
          className={cls.FlightDetailsCard}
        >
          <Text title="Информация о рейсе"/>
          <div className={cls.FlightPoints}>
            <h2>
              {`${flight.origin} - ${flight.destination}`}
            </h2>
            <div className={cls.Logo}>
              {logoMap[flight.airline]}
            </div>
          </div>
          <div className={cls.FlightInfo}>
            <p>
              {date} •
              Пересадок: {flight.number_of_changes} •
              Время полёта: {time} •
              Класс: {flightClass}
            </p>
          </div>
          <div className={cls.FlightDates}>
            <div className={cls.FlightDate}>
              <div className={cls.FlightDateTime}>
                {flight.departure_time}
              </div>
              <div className={cls.FlightDateCity}>
                {`${flight.origin}, ${flight.origin_IATA}`}
              </div>
            </div>
            <div className={cls.FlightDate}>
              <div className={cls.FlightDateTime}>
                {flight.arrival_time}
              </div>
              <div className={cls.FlightDateCity}>
                {`${flight.destination}, ${flight.destination_IATA}`}
              </div>
            </div>
          </div>
          <div className={cls.FlightPriceAndOrder}>
            <div className={cls.FlightPrice}>
              {flight.price} ₽
            </div>
            <div className={cls.FlightOrder}>
              <Button
                onClick={onShowModal}
                disabled={!flight.actual}
              >
                {flight.actual ? 'Забронировать полёт' : 'Забронировано'}
              </Button>
            </div>
          </div>
        </Card>
        <OrderModal
          isOpen={isOrderModal}
          onClose={onCloseModal}
        />
      </div>
    )
  }
});
