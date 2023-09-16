import React, { useState } from 'react';

export default function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetching = async () => {
        try {
            const response = await callback();
            return response;
        } catch (error) {
            setError('Server unavailable');
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}
