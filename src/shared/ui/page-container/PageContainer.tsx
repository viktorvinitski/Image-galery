import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

type TProps = {
    children: ReactNode;
};

export const PageContainer: FC<TProps> = ({ children }) => {
    return <div className={styles['page-container']}>{children}</div>;
};
