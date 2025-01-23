import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useFetch } from 'shared/hooks/useFetch';
import { ImagesList } from '../ui/ImagesList';

describe('ImagesList', () => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockImages = [
        { id: 'test id 1', urls: { raw: 'test img url 1' }, alt_description: 'test alt description 1' },
        { id: 'test id 2', urls: { raw: 'test img url 2' }, alt_description: 'test alt description 2' },
        { id: 'test id 3', urls: { raw: 'test img url 3' }, alt_description: 'test alt description 3' },
        { id: 'test id 4', urls: { raw: 'test img url 4' }, alt_description: 'test alt description 4' },
        { id: 'test id 5', urls: { raw: 'test img url 5' }, alt_description: 'test alt description 5' },
    ];

    const setup = () => {
        mockUseFetch.mockReturnValue({ data: { items: mockImages, total: mockImages.length } });
        return render(
            <BrowserRouter>
                <ImagesList />
            </BrowserRouter>,
        );
    };
    test('Should render fetched images', async () => {
        const { container } = setup();

        const images = container.getElementsByClassName('ant-card');
        expect(images.length).toBe(mockImages.length);
    });
});
