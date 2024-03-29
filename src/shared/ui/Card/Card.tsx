import { type HTMLAttributes, memo, type ReactNode } from 'react'

import cls from './Card.module.scss'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
  max?: boolean
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    max,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.max]: max
  }

  return (
    <div
      className={classNames(cls.Card, mods, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  )
})
