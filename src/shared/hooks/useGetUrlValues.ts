import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useGetUrlValues = () => {
    const location = useLocation();
    const [params, setParams] = useState<Record<string, string>>({});

    useEffect(() => {
        setParams({});
        const searchParams = new URLSearchParams(location.search);
        searchParams.forEach((value, key) => {
            setParams(prevParams => ({
                ...prevParams,
                [key]: value,
            }));
        });
    }, [location]);

    return params;
};
