'use client';

import styles from './button.module.scss';
import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react';

type ButtonProps = {
    color?: 'primary' | 'secondary' | 'tertiary' | 'none';
};

const Button: WithChildren<
    ButtonProps &
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >
> = ({ children, color, ...props }) => {
    const classNames = useMemo(() => {
        const classes = [styles.button];

        switch (color) {
            case 'secondary':
                classes.push(styles.secondary);
                break;
            case 'tertiary':
                classes.push(styles.tertiary);
                break;
            case 'none':
                classes.push(styles.none);
                break;
            default:
                classes.push(styles.primary);
                break;
        }

        return classes.join(' ');
    }, [color]);

    return (
        <button {...props} className={classNames}>
            {children}
        </button>
    );
};

export default Button;
