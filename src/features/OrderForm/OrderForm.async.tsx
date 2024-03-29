import { type FC, lazy } from 'react'
import { type OrderFormProps } from './OrderForm'

export const OrderFormAsync = lazy <FC<OrderFormProps>>(async () => await import('./OrderForm'))
