import React, { memo, useEffect } from 'react'
import { TicketsList } from 'entities/Flight'
import cls from './MainPage.module.scss'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { MainPageFilters } from '../MainPageFilters/MainPageFilters'
import { useSearchParams } from 'react-router-dom'
import { initMainPage } from 'pages/MainPage/model/services/initMainPage/initMainPage'

const MainPage = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    dispatch(initMainPage(searchParams))
  }, [])

  return (
    <div className={cls.MainPage}>
      <MainPageFilters />
      <TicketsList />
    </div>
  )
}

export default memo(MainPage)
