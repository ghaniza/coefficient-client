import React, { FC, useState } from 'react';
import styles from './accordion.module.scss';
import { ChevronDown, ChevronUp } from 'react-feather';

type AccordionProps = {
    cleanMessage: string;
    title: string;
};

const Accordion: FCC<AccordionProps> = ({ cleanMessage, children, title }) => {
    const [open, setOpen] = useState(false);

    const classNames = [styles.section];

    if (open) {
        classNames.push(styles.open);
    }

    const handleOpen = () => {
        setOpen((open) => !open);
    };

    return (
        <section className={classNames.join(' ')} onClick={handleOpen}>
            <h3>{title}</h3>
            <div className={styles.sectionContent}>
                {children ?? <span>{cleanMessage}</span>}
            </div>
            <button>{open ? <ChevronUp /> : <ChevronDown />}</button>
        </section>
    );
};

export default Accordion;
