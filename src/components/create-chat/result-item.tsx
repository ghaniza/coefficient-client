import ProfilePicture from '@/components/profile-picture';
import dateToTimespan from '@/helpers/date-to-timespan';
import RoundButton from '@/components/round-button';
import { Check, Minus, Plus } from 'react-feather';
import React, { FC, useMemo, useState } from 'react';
import { UserDTO } from '@/hooks/user.hook';

type ResultItemProps = {
    user: UserDTO;
    onItemPicked: () => void;
    onItemRemoved: () => void;
    selected?: boolean;
};

const ResultItem: FC<ResultItemProps> = ({
    user,
    onItemPicked,
    onItemRemoved,
    selected,
}) => {
    const [blinking, setBlinking] = useState(false);

    const currentStatus = useMemo(() => {
        if (blinking) return 'success';
        if (selected) return 'error';
        return 'tertiary';
    }, [selected, blinking]);

    const handleStatusChange = () => {
        if (!selected) {
            onItemPicked();
            setBlinking(true);
            setTimeout(() => {
                setBlinking(false);
            }, 1000);
        } else {
            onItemRemoved();
        }
    };

    return (
        <li key={user.id}>
            <ProfilePicture size={3} online={user.online} email={user.email} />
            <div>
                <p>{user.name}</p>
                <small>
                    {user.online
                        ? 'online'
                        : 'last online ' + dateToTimespan(user.lastOnline)}
                </small>
            </div>
            <RoundButton
                onClick={handleStatusChange}
                color={currentStatus as any}
                disabled={currentStatus === 'success'}
            >
                {currentStatus === 'tertiary' && <Plus size={18} />}
                {currentStatus === 'success' && <Check size={18} />}
                {currentStatus === 'error' && <Minus size={18} />}
            </RoundButton>
        </li>
    );
};

export default ResultItem;
