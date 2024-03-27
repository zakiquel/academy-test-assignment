import {Modal} from "shared/ui/Modal";
import {classNames} from "shared/lib/classNames/classNames";
import {Suspense} from "react";
import {OrderFormAsync} from "features/OrderForm/OrderForm.async";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal = (props: LoginModalProps) => {
  const {
    className,
    isOpen,
    onClose,
  } = props;
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback='Загрузка...'>
        <OrderFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};