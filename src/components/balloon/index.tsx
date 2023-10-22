import { FC, useMemo } from "react";
import RoundButton from "../round-button";
import { MoreHorizontal } from "react-feather";
import styles from "./balloon.module.scss";
import ProfilePicture from "../profile-picture";
import { MessageDTO } from "@/hooks/chat.hook";
import {useTimeDifference} from "@/hooks/time.hook";

type BalloonProps = {
  message: MessageDTO;
  mine?: boolean;
  withProfilePicture?: boolean;
  withTime?: boolean;
};

const Balloon: FC<BalloonProps> = ({
  message,
  mine,
  withProfilePicture,
  withTime,
}) => {
    const timeDifference = useTimeDifference(message.timestamp);

  const classNames = useMemo<string>(() => {
    const classes = [styles.content];

    if (mine) classes.push(styles.mine);
    if (!withProfilePicture) classes.push(styles.withoutProfilePicture);
    if (!withTime) classes.push(styles.withoutTime);

    return classes.join(" ");
  }, [mine, withProfilePicture, withTime]);

  return (
    <div className={classNames}>
      <ProfilePicture
        className={styles.profilePicture}
        email={message.from.email}
        size={1.85}
      />
      <p>{message.content}</p>
      <RoundButton color="none">
        <MoreHorizontal size={18} />
      </RoundButton>
      <small>{timeDifference}</small>
    </div>
  );
};

export default Balloon;
