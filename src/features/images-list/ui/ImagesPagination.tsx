import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'antd';
import { useSetUrl } from 'shared/hooks/useSetUrl';
import { useGetUrlValues } from 'shared/hooks/useGetUrlValues';

type TProps = {
    total: number;
};

export const ImagesPagination: FC<TProps> = ({ total }) => {
    const { pathname } = useLocation();
    const { setUrl } = useSetUrl();
    const { page, per_page } = useGetUrlValues();

    const onPaginationChange = (page: number, pageSize: number) => {
        setUrl({ pathname, params: { page: String(page), per_page: String(pageSize) } });
    };

    return (
        <Pagination
            total={total}
            current={Number(page) || 1}
            pageSize={Number(per_page) || 10}
            pageSizeOptions={[10, 20, 30]}
            onChange={onPaginationChange}
        />
    );
};
