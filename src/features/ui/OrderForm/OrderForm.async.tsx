import { FC, lazy } from 'react';
import {OrderFormProps} from "features/ui/OrderForm/OrderForm";

export const OrderFormAsync = lazy <FC<OrderFormProps>>(() => import('./OrderForm'));
