import { FC, useMemo } from "react";
import RoundButton from "../round-button";
import { MoreHorizontal } from "react-feather";
import styles from "./balloon.module.scss";
import ProfilePicture from "../profile-picture";

type BalloonProps = {
  message: any;
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
        email="jf.melo6@gmail.com"
        size={1.85}
        online
      />
      <p>{message.content}</p>
      <RoundButton color="none">
        <MoreHorizontal size={18} />
      </RoundButton>
      <small>4 days ago</small>
    </div>
  );
};

export default Balloon;
