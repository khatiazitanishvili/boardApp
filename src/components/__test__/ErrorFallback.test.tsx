/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';
import Bomb from './Bomb';

test('test Fehlerbehandlung', async () => {
    const orgError = console.error;
    try {
        console.error = () => {}
        await act(() => {
            render(
                <div>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <div>
                            <Bomb />
                        </div>
                    </ErrorBoundary>
                </div>);
        });
    } finally {
        console.error = orgError;
    }
    expect(screen.getAllByText(/CABOOM/i)[0]).toBeInTheDocument();
});