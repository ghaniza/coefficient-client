/* eslint-disable @next/next/no-img-element */
import { FC, useMemo } from "react";
import styles from "./profile-picture.module.scss";
import cryptojs from "crypto-js";

type ProfilePictureProps = {
  size?: number;
  email?: string;
  className?: string;
  online?: boolean;
};

const ProfilePicture: FC<ProfilePictureProps> = ({
  email,
  size,
  className,
  online,
}) => {
  const v = useMemo(() => size ?? 3, [size]);
  const hash = useMemo(() => cryptojs.MD5(email ?? ""), [email]);
  const markerPosition = useMemo(() => {
    const diagonal = (Math.sqrt(v * v + v * v) - v) / 2;
    return `${diagonal * 0.70710678118}rem`;
  }, [v]);

  const classNames = useMemo(() => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(" ");
  }, [className]);

  return (
    <div className={classNames} style={{ width: `${v}rem`, height: `${v}rem` }}>
      {online && (
        <span
          className={styles.online}
          style={{ top: markerPosition, left: markerPosition }}
        ></span>
      )}
      <img
        alt="Profile picture"
        src={`https://www.gravatar.com/avatar/${hash}?d=mp&s=${Math.max(v * 16, 64)}`}
      />
    </div>
  );
};

export default ProfilePicture;
