import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const DataLoader = ({ children, loading, error }: {
    children: React.ReactNode;
    loading: boolean;
    error: string | null;
}) => {
    if (error) {
        return <p>{error}</p>;
    }
    return <>{loading ? <CircularProgress /> : children}</>;
}

export default DataLoader;
