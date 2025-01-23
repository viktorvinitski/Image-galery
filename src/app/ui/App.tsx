import { Flex } from 'antd';
import { Topics } from 'features/topics/ui/Topics';
import { ImagesList } from 'features/images-list/ui/ImagesList';
import { PageContainer } from 'shared/ui/page-container/PageContainer';
import { FC } from 'react';

export const App: FC = () => {
    return (
        <Flex gap={16}>
            <Topics />
            <PageContainer>
                <ImagesList />
            </PageContainer>
        </Flex>
    );
};
