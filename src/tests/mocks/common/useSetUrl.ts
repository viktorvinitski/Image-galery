export default jest.mock('shared/hooks/useSetUrl', () => ({
    useSetUrl: jest.fn().mockReturnValue({ setUrl: jest.fn() }),
}));
