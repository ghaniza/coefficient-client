import { FC } from "react";
import styles from "./search.module.scss";
import { Search } from "react-feather";
import Dropdown from "../dropdown";

const SearchBar: FC = () => {
  const items = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Messages",
      value: "messages",
    },
    {
      label: "People",
      value: "people",
    },
    {
      label: "Files",
      value: "files",
    },
  ];

  return (
    <div className={styles.container}>
      <Search size={18} />
      <input placeholder="Search" />
      <Dropdown items={items} />
    </div>
  );
};

export default SearchBar;
