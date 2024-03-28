import React, {memo, useCallback} from 'react';
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import cls from './MainPageFilters.module.scss';
import {Card, CardTheme} from "shared/ui/Card";
import {Input} from "shared/ui/Input";
import {MainPageSortSelector} from "../MainPageSortSelector/MainPageSortSelector";
import {useSelector} from "react-redux";
import {getMainPageOrder, getMainPageSearch, getMainPageSort} from "../../model/selectors/mainPage";
import {SortOrder} from "shared/types/sortOrder";
import {TicketSortField} from "../../model/types/ticket";
import {mainPageActions} from "../../model/slices/mainPageSlice";
import {fetchTicketsList} from "../../model/services/fetchTicketsList/fetchTicketsList";

export const MainPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const order = useSelector(getMainPageOrder);
    const sort = useSelector(getMainPageSort);
    const search = useSelector(getMainPageSearch);

    const fetchData = useCallback(() => {
        dispatch(fetchTicketsList({replace: true}))
    }, [dispatch])

    const onChangeSort = useCallback((sort: TicketSortField) => {
        dispatch(mainPageActions.setSort(sort));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(mainPageActions.setOrder(order));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(mainPageActions.setSearch(search));
        fetchData();
    }, [dispatch, fetchData]);


    return (
        <div className={cls.MainPageFilters}>
            <div className={cls.sortWrapper}>
                <MainPageSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </div>
            <Card
                className={cls.Search}
                theme={CardTheme.OUTLINED}
            >
                <Input
                    placeholder="Поиск"
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
        </div>
    );
});