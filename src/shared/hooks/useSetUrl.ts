import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useSetUrl = () => {
    const navigate = useNavigate();

    const setUrl = useCallback(
        ({ pathname, params }: { pathname: string; params?: Record<string, string> }) => {
            navigate({ pathname, search: new URLSearchParams(params).toString() });
        },
        [navigate],
    );

    return { setUrl };
};
