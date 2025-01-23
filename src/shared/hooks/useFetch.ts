import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';
import { BASE_URL, USER_KEY } from '../constants/api';

export enum FETCH_METHOD {
    GET = 'GET',
}
type TRequestParams = {
    path: string;
    method?: FETCH_METHOD;
};

type TUseFetchParams = { path: string; fetchAll?: boolean };
type TUseFetch<T> = { data: { items: T; total: string | null } | null; loading: boolean };

export const useFetch = <T = unknown>({ path, fetchAll = false }: TUseFetchParams): TUseFetch<T> => {
    const [data, setData] = useState<{ items: T; total: string | null } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(async ({ path, method = FETCH_METHOD.GET }: TRequestParams) => {
        setLoading(true);

        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/${path}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Client-ID ${USER_KEY}`,
                },
            });

            const result = await response.json();
            const total = response.headers.get('X-Total');

            if (result.errors) {
                result.errors.forEach((error: string) => {
                    notification.error({ message: error });
                });
                setData(null);
            } else {
                setData({ items: result, total });
                return result;
            }
        };

        try {
            return await fetchData();
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (path) {
            request({ path }).then(res => {
                if (fetchAll && data?.total && res.length !== data?.total) {
                    request({ path: `${path}?page=1&per_page=${data?.total}` });
                }
            });
        }
    }, [path, data?.total]);

    return { data, loading };
};
