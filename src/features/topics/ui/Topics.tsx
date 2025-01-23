import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Menu } from 'antd';
import { useFetch } from 'shared/hooks/useFetch';
import { useSetUrl } from 'shared/hooks/useSetUrl';
import { PATHS } from 'shared/constants/api';
import styles from './styles.module.css';
import { TTopic } from '../types';

export const Topics: FC = () => {
    const { setUrl } = useSetUrl();
    const { data } = useFetch<Array<TTopic>>({ path: PATHS.TOPICS, fetchAll: true });
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const { items: topics } = data ?? {};

    const menuItems = useMemo(() => topics?.map(({ title, slug }) => ({ key: slug, label: title })), [topics]);

    useEffect(() => {
        if (topics?.length) {
            const defaultTopic = topics?.[0].slug ?? '';
            setUrl({ pathname: `${PATHS.TOPICS}/${defaultTopic}/photos`, params: { page: '1', per_page: '10' } });
            setSelectedKeys([defaultTopic]);
        }
    }, [topics]);

    const onClick = useCallback(({ key }: { key: string }) => {
        setUrl({ pathname: `${PATHS.TOPICS}/${key}/photos`, params: { page: '1', per_page: '10' } });
        setSelectedKeys([key]);
    }, []);

    return <Menu selectedKeys={selectedKeys} items={menuItems} onClick={onClick} className={styles.menu} mode="vertical" />;
};
