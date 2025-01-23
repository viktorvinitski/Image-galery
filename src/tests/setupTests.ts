import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
import 'tests/mocks/common/useFetch';
import 'tests/mocks/common/useSetUrl';

global.TextEncoder = TextEncoder;

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
