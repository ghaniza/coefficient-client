/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useState } from "react";
import styles from "./sidebar.module.scss";
import Dropdown from "../dropdown";
import {
  Bell,
  Calendar,
  Home,
  MessageCircle,
  Settings,
  Users,
} from "react-feather";
import { usePathname, useRouter } from "next/navigation";
import ProfilePicture from "../profile-picture";

const Sidebar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnClick = (page: string) => {
    return () => {
      console.log(page);
      router.push("/" + page);
    };
  };

  const handleOnDropdownChange = (value: any) => {
    console.log(value);
  };

  const items = [
    {
      label: "ghanizadev",
      value: "ghanizadev",
    },
    {
      label: "ghaniza",
      value: "ghaniza",
    },
  ];

  const menu = [
    {
      label: "Home",
      value: "home",
      icon: () => <Home size={18} />,
      notification: false,
    },
    {
      label: "Chat",
      value: "chat",
      icon: () => <MessageCircle size={18} />,
      notification: true,
    },
    {
      label: "Contacts",
      value: "contacts",
      icon: () => <Users size={18} />,
      notification: false,
    },
    {
      label: "Notifications",
      value: "notifications",
      icon: () => <Bell size={18} />,
      notification: false,
    },
    {
      label: "Calendar",
      value: "calendar",
      icon: () => <Calendar size={18} />,
      notification: false,
    },
    {
      label: "Settings",
      value: "settings",
      icon: () => <Settings size={18} />,
      notification: false,
    },
  ];

  return (
    <aside className={styles.container}>
      <div className={styles.profileHeader}>
        <ProfilePicture className={styles.profilePicture} online size={5} />
        <Dropdown
          style={{ width: "10rem", color: "#0D1C2E" }}
          items={items}
          onChange={handleOnDropdownChange}
        />
      </div>
      <ul className={styles.listItems}>
        {menu.map((menuItem) => (
          <li
            key={menuItem.value}
            onClick={handleOnClick(menuItem.value)}
            data-selected={pathname === "/" + menuItem.value}
          >
            {menuItem.notification ? (
              <span className={styles.notification}></span>
            ) : (
              <></>
            )}
            {menuItem.icon()}
            {menuItem.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
