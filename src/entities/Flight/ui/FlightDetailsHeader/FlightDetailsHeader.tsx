import React, {memo, useCallback} from 'react';
import {Button} from "shared/ui/Button";
import cls from './FlightDetailsHeader.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import { useNavigate } from 'react-router-dom';
import {getRouteMain} from "shared/const/router";

export const FlightDetailsHeader = memo(() => {
  const navigate = useNavigate();

  const onBackToList = useCallback(() => {
    navigate(getRouteMain());
  }, [navigate]);

  return (
    <section className={classNames(cls.FlightDetailsHeader)}>
      <Button onClick={onBackToList}>
        Назад к списку полётов
      </Button>
    </section>
  );
});