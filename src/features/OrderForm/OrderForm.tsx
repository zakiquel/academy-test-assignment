import { memo, useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input'
import { Button, ButtonTheme } from 'shared/ui/Button'
import cls from './OrderForm.module.scss'
import { Text } from 'shared/ui/Text'

export interface OrderFormProps {
  className?: string
  onSuccess: () => void
}

const OrderForm = memo((props: OrderFormProps) => {
  const { className, onSuccess } = props
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: ''
  })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const onChangeName = useCallback((value: string) => {
    setFormData(prevState => ({ ...prevState, name: value }))
  }, [])

  const onChangeSurname = useCallback((value: string) => {
    setFormData(prevState => ({ ...prevState, surname: value }))
  }, [])

  const onChangePhone = useCallback((value: string) => {
    setFormData(prevState => ({ ...prevState, phone: value }))
  }, [])

  const onOrderClick = useCallback(async () => {
    setBookingSuccess(true)
    onSuccess()
  }, [onSuccess])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onOrderClick()
    }
  }, [onOrderClick])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  if (bookingSuccess) {
    return <div>Билет успешно забронирован!</div>
  }

  return (
    <div className={classNames(cls.OrderForm, {}, [className])}>
      <Text title='Укажите свои контактные данные' />
      <Input
        autofocus
        type="text"
        value={formData.name}
        className={cls.input}
        placeholder='Введите имя'
        onChange={onChangeName}
      />
      <Input
        type="text"
        value={formData.surname}
        className={cls.input}
        placeholder='Введите фамилию'
        onChange={onChangeSurname}
      />
      <Input
        type="text"
        value={formData.phone}
        className={cls.input}
        placeholder='Введите номер телефона'
        onChange={onChangePhone}
      />
      <Button
        theme={ButtonTheme.OUTLINE}
        className={cls.orderBtn}
        onClick={onOrderClick}
        disabled={!formData.name || !formData.surname || !formData.phone}
      >
        Забронировать
      </Button>
    </div>
  )
})

export default OrderForm
