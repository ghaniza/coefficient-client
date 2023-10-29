import React, { FC, HTMLProps, useRef } from 'react';
import styles from './search.module.scss';
import { Search } from 'react-feather';
import Dropdown, { DropdownOption } from '../dropdown';
import debounce from 'debounce';

type SearchBarProps = {
    items: DropdownOption[];
    onDropdownChange?: (item: DropdownOption) => void;
    onSearchChange?: (query: string) => void;
};

const SearchBar: FC<HTMLProps<HTMLDivElement> & SearchBarProps> = ({
    className,
    items,
    onDropdownChange,
    onSearchChange,
}) => {
    const classNames = [styles.container];
    if (className) classNames.push(className);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        onSearchChange && onSearchChange(event.target.value ?? '');
    };

    return (
        <div className={classNames.join(' ')}>
            <Search size={18} />
            <input placeholder="Search" onChange={handleSearchChange} />
            <Dropdown items={items} onChange={onDropdownChange} />
        </div>
    );
};

export default SearchBar;
