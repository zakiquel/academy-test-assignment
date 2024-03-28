import React, {memo, useMemo} from 'react';
import cls from './MainPageSortSelector.module.scss';
import {Select, SelectOption} from "shared/ui/Select";
import {TicketSortField} from "pages/MainPage/model/types/ticket";
import {SortOrder} from "shared/types/sortOrder";

interface MainPageSortSelectorProps {
    sort: TicketSortField;
    order: SortOrder;
    onChangeSort: (newSort: TicketSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const MainPageSortSelector = memo((props: MainPageSortSelectorProps) => {
    const {
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props;
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию'
        },
        {
            value: 'desc',
            content: 'убыванию'
        }
    ], []);

    const sortFieldOptions = useMemo<SelectOption<TicketSortField>[]>(() => [
        {
            value: TicketSortField.PRICE,
            content: 'цене'
        },
        {
            value: TicketSortField.AIRLINE,
            content: 'авиакомпании'
        }
    ], []);

    return (
        <div className={cls.MainPageSortSelector}>
            <Select
                options={sortFieldOptions}
                label="Сортировать по"
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                options={orderOptions}
                label="по"
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    );
});