import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const Modal = (props: ModalProps) => {
    const { children, className, isOpen } = props;

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
    };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={classNames(cls.Modal, mods, [className])}>
            <div className={cls.overlay}>
                <div onClick={onContentClick} className={cls.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
