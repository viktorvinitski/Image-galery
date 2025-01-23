export default jest.mock('shared/hooks/useFetch', () => ({
    useFetch: jest.fn(),
}));
