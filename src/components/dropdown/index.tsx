'use client';
import React, { CSSProperties, FC, useMemo, useRef, useState } from 'react';
import styles from './dropdown.module.scss';
import { ChevronDown } from 'react-feather';

type DropdownOption = {
    label: string;
    value: string | number | Date | boolean;
    invisible?: boolean;
    disabled?: boolean;
};

type DropdownProps = {
    value?: DropdownOption;
    items: DropdownOption[];
    onChange?: (value: DropdownOption) => void;
    style?: CSSProperties;
    className?: string;
};

const Dropdown: FC<DropdownProps> = ({
    items,
    value,
    onChange,
    style,
    className,
}) => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const currentValue = useMemo(() => {
        if (value) return value;
        if (items.length > currentIndex) return items[currentIndex];
        return items[0];
    }, [value, items, currentIndex]);

    const clearOpenState = () => {
        setOpen(false);
        document.removeEventListener('click', handleClickOutside);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const element = event.target as HTMLElement;

        if (containerRef.current && !containerRef.current.contains(element))
            clearOpenState();
    };

    const handleOpen = () => {
        if (open) {
            clearOpenState();
            return;
        }

        setOpen(true);
        document.addEventListener('click', handleClickOutside);
    };

    const handleSelectOption = (event: React.MouseEvent) => {
        const element = event.target as HTMLElement;
        const value = element.getAttribute('data-value');

        const index = items.findIndex((item) => item.value === value);

        if (index !== -1) {
            setCurrentIndex(index);
            onChange && onChange(items[index]);
        }
        clearOpenState();
    };

    return (
        <div
            style={style}
            className={`${styles.container}${className ? ' ' + className : ''}`}
            onClick={handleOpen}
            ref={containerRef}
        >
            <span className={styles.currentValue}>
                {currentValue?.label}
                <ChevronDown size={18} />
            </span>
            {open && (
                <div className={styles.itemList}>
                    {items
                        .filter((item) => !item.invisible)
                        .map((item) => (
                            <span
                                key={item.label}
                                onClick={handleSelectOption}
                                data-value={item.value}
                            >
                                {item.label}
                            </span>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
