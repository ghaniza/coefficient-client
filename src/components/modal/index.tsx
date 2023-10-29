import styles from './modal.module.scss';
import React, { useCallback, useEffect, useRef } from 'react';

type ModalProps = {
    open: boolean;
    onClose: () => void;
};

const Modal: FCC<ModalProps> = ({ open, onClose, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleDismiss = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!ref.current) return;
        if (ref.current === event.target) {
            onClose();
        }
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                event.preventDefault();
                onClose();
            }
        },
        [open, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            ref={ref}
            className={styles.container}
            data-hidden={(!open).toString()}
            onClick={handleDismiss}
        >
            <div className={styles.box} data-hidden={(!open).toString()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
