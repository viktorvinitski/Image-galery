import { fireEvent, render, screen } from '@testing-library/react';
import { Topics } from '../../ui/Topics';
import { BrowserRouter } from 'react-router-dom';
import { useFetch } from 'shared/hooks/useFetch';
import { useSetUrl } from 'shared/hooks/useSetUrl';
import { PATHS } from 'shared/constants/api';

describe('Topics', () => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockSetUrl = jest.fn();
    (useSetUrl as jest.Mock).mockReturnValue({ setUrl: mockSetUrl });
    const { getByText, getByRole } = screen;
    const mockTopics = [
        { title: 'test title 1', slug: 'test1' },
        { title: 'test title 2', slug: 'test2' },
    ];

    const setup = () => {
        mockUseFetch.mockReturnValue({ data: { items: mockTopics } });
        return render(
            <BrowserRouter>
                <Topics />
            </BrowserRouter>,
        );
    };
    test('Should render fetched topic', async () => {
        setup();
        expect(getByRole('menu').children.length).toBe(mockTopics.length);
        mockTopics.forEach(({ title }) => {
            expect(getByText(title)).toBeInTheDocument();
        });
    });

    test('First fetched topic should be set active by default', async () => {
        const { container } = setup();
        const menuItems = container.getElementsByClassName('ant-menu-item');
        expect(menuItems[0]).toHaveClass('ant-menu-item-selected');
    });

    test('Should set correct url on topic click', async () => {
        setup();
        const { title, slug } = mockTopics[0];
        fireEvent.click(getByText(title));
        expect(mockSetUrl).toHaveBeenCalledWith({
            pathname: `${PATHS.TOPICS}/${slug}/photos`,
            params: { page: '1', per_page: '10' },
        });
    });
});
