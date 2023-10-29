import SearchBar from '@/components/search-bar';
import React, { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/modal';
import styles from './create-chat.module.scss';
import ResultItem from '@/components/create-chat/result-item';
import { UserDTO, useUserSearch } from '@/hooks/user.hook';
import { DropdownOption } from '@/components/dropdown';
import Button from '@/components/button';
import { Plus } from 'react-feather';
import { createChatRequest } from '@/services/chat/chat.api';

const MODAL_ITEMS = [
    { id: '0', label: 'All', value: 'all' },
    { id: '1', label: 'Only included', value: 'included' },
    { id: '2', label: 'Teams', value: 'teams' },
];

const NAMES = [
    {
        id: '0',
        email: 'ghanizadev@gmail.com',
        name: 'ghanizadev',
        lastOnline: new Date(),
        online: true,
        selected: false,
    },
    {
        id: '1',
        email: 'jf.melo6@gmail.com',
        name: 'Jean de Melo',
        lastOnline: new Date(),
        online: false,
        selected: false,
    },
];

type CreateChatProps = {
    modalOpen: boolean;
    onModalClose: (chatId: string) => void;
};

const CreateChat: FCC<CreateChatProps> = ({ modalOpen, onModalClose }) => {
    const [query, setQuery] = useState('');
    const { users } = useUserSearch(query);
    const [results, setResults] = useState<
        (UserDTO & { selected?: boolean })[]
    >(users ?? []);
    const [dropdownValue, setDropdownValue] = useState<DropdownOption>(
        MODAL_ITEMS[0]
    );

    const list = useMemo(() => {
        if (dropdownValue.value === 'included')
            return results.filter((user) => user.selected);
        else return results;
    }, [dropdownValue, results]);

    const handleCreateChat = async () => {
        const chat = await createChatRequest(results.filter((u) => u.selected));
        onModalClose(chat.id);
    };

    const handleItemPicked = (user: UserDTO, index: number) => {
        return () => {
            setResults((results) => {
                const newSet = [...results];
                newSet[index] = { ...user, selected: true };
                return newSet;
            });
        };
    };

    const handleItemRemoved = (user: UserDTO, index: number) => {
        return () => {
            setResults((results) => {
                const newSet = [...results];
                newSet[index] = { ...user, selected: false };
                return newSet;
            });
        };
    };

    const handleDropdownChange = (option: DropdownOption) => {
        setDropdownValue(option);
    };

    const handleSearchChange = (value: string) => {
        setQuery(value);
    };

    const handleModalClose = () => {
        onModalClose('');
    };

    useEffect(() => {
        if (users) setResults(users);
    }, [users]);

    return (
        <Modal open={modalOpen} onClose={handleModalClose}>
            <SearchBar
                items={MODAL_ITEMS}
                onDropdownChange={handleDropdownChange}
                onSearchChange={handleSearchChange}
                className={styles.searchBar}
            />
            <ul className={styles.result}>
                {list.map((user, index) => (
                    <ResultItem
                        user={user}
                        key={user.id}
                        selected={user.selected}
                        onItemPicked={handleItemPicked(user, index)}
                        onItemRemoved={handleItemRemoved(user, index)}
                    />
                ))}
            </ul>
            <Button color={'primary'} onClick={handleCreateChat}>
                <Plus size={18} />
                <span style={{ marginLeft: '0.375rem' }}>Create</span>
            </Button>
        </Modal>
    );
};

export default CreateChat;
