import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ImagesPagination } from '../ui/ImagesPagination';
import { useSetUrl } from 'shared/hooks/useSetUrl';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe('ImagesPagination', () => {
    const mockSetUrl = jest.fn();
    (useSetUrl as jest.Mock).mockReturnValue({ setUrl: mockSetUrl });
    const setup = () => {
        return render(
            <BrowserRouter>
                <ImagesPagination total={111} />
            </BrowserRouter>,
        );
    };
    test('Should set correct url on pagination change', async () => {
        const mockPathname = 'test';
        (useLocation as jest.Mock).mockReturnValue({ pathname: mockPathname });
        const { container } = setup();

        const paginationItems = container.getElementsByClassName('ant-pagination-item');

        fireEvent.click(paginationItems[1]); // click second pagination button
        expect(mockSetUrl).toHaveBeenCalledWith({
            pathname: mockPathname,
            params: { page: '2', per_page: '10' },
        });
    });
});
