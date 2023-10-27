type Children = {
    children?: React.ReactNode;
};

declare type WithChildren<T = {}> = React.FC<T & Children>;
