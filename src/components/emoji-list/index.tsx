import React, { FC, useEffect, useMemo, useRef } from 'react';
import { EMOJI_IDS, EMOJI_MAP } from './constants';
import styles from './emoji-list.module.scss';

type EmojiListProps = {
    onSelect?: (emojiId: string) => void;
    open?: boolean;
};

const EmojiList: FC<EmojiListProps> = ({ onSelect, open }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const handleWheel = (event: WheelEvent) => {
        if (!divRef.current) return;
        event.preventDefault();
        divRef.current.scrollLeft +=
            (event.deltaY / Math.abs(event.deltaY)) *
            (divRef.current.clientWidth - 50);
    };

    const handleSelect = (emojiId: string) => {
        return () => {
            onSelect && onSelect(emojiId);
        };
    };

    const clean = useMemo(() => {
        return EMOJI_MAP.map((cat) => cat.items)
            .flat()
            .reduce(
                (prev, curr) => (!prev.includes(curr) ? [...prev, curr] : prev),
                [] as string[]
            );
    }, []);

    useEffect(() => {
        const target = divRef.current;

        target?.addEventListener('wheel', handleWheel);
        return () => {
            target?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className={styles.container}
            style={{ visibility: open ? 'visible' : 'hidden' }}
        >
            {open &&
                clean.map((id) => (
                    <span
                        key={id}
                        data-emoji={true}
                        onClick={handleSelect(id)}
                        dangerouslySetInnerHTML={{
                            __html: `&#${Number('0x' + id)};`,
                        }}
                    ></span>
                ))}
        </div>
    );
};

export default EmojiList;
