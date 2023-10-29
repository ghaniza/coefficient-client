'use client';

import { FC, useEffect, useState } from 'react';
import Modal from '@/components/modal';

const HomePage: FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleOpenModal}>open</button>
            <Modal open={open} onClose={handleCloseModal} />
        </>
    );
};

export default HomePage;
