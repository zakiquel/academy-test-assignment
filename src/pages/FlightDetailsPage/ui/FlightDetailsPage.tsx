import React, {memo} from 'react';
import {FlightDetails, FlightDetailsHeader} from "entities/Flight";
import {useParams} from "react-router-dom";
import cls from './FlightDetailsPage.module.scss'
import {classNames} from "shared/lib/classNames/classNames";

const FlightDetailsPage = () => {
  const { id } = useParams<{id: string}>();

  if (!id) {
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
      <FlightDetails id={id} />
    </main>
  );
};

export default memo(FlightDetailsPage);