import styles from './loading-spinner.module.scss';

export const LoadingSpinner = () => {
    return (
        <div className={styles['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingSpinner;
