type Children = {
    children?: React.ReactNode;
};

declare type FCC<T = {}> = React.FC<T & Children>;
