import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Empty, Flex, Spin } from 'antd';
import { useFetch } from 'shared/hooks/useFetch';
import { TImage } from '../types';
import styles from './styles.module.css';
import { ImagesPagination } from './ImagesPagination';

const { Meta } = Card;

export const ImagesList: FC = () => {
    const { pathname, search } = useLocation();
    const { data, loading } = useFetch<Array<TImage>>({ path: `${pathname}${search}` });
    const { items: images, total } = data ?? {};
    const isImagesExist = Boolean(images?.length);

    return (
        <Flex vertical justify="space-between" className={styles['images-list-wrapper']}>
            <Spin spinning={loading}>
                <Flex className={styles.images} justify="center">
                    {isImagesExist ? (
                        <Flex wrap gap={16}>
                            {images?.map(({ id, urls, alt_description }) => (
                                <Card
                                    key={id}
                                    hoverable
                                    className={styles.image}
                                    cover={<img alt="img" src={`${urls.raw}&w=180&h=160&fit=clamp`} />}
                                >
                                    <Meta description={alt_description} />
                                </Card>
                            ))}
                        </Flex>
                    ) : (
                        <Empty />
                    )}
                </Flex>
            </Spin>

            {isImagesExist && <ImagesPagination total={Number(total)} />}
        </Flex>
    );
};
