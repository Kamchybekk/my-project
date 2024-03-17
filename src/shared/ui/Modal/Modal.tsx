import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ModalProps {
    className?: string;
    children?: ReactNode;
}

const Modal = (props: ModalProps) => {
    const { children, className } = props;

    return (
        <div className={classNames(cls.Modal, {}, [className])}>
            <div className={cls.overlay}>
                <div className={cls.content}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
