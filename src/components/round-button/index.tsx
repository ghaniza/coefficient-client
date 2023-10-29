import styles from './round-button.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from 'react';

type RoundButtonProps = {
    color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'none';
    size?: number;
};

const RoundButton: FCC<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > &
        RoundButtonProps
> = ({ children, color, size, className, ...props }) => {
    const classNames = [styles.roundButton, styles[color ?? 'primary']];

    if (className) classNames.push(className);

    return (
        <button
            className={classNames.join(' ')}
            style={{ width: (size ?? 34) + 'px', height: (size ?? 34) + 'px' }}
            {...props}
        >
            {children}
        </button>
    );
};

export default RoundButton;
