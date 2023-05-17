/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import mockFetch from './mockFetch';

test('Board', async () => {
    /*
    const orgError = console.error;
    mockFetch();
    try {
        console.error = () => { }
        await act(() => {
            render(<MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>);
        })

    } finally {
        console.error = orgError;
    }
    const title = screen.getAllByText(/Channel [12]/i);
    expect(title.length).toBeGreaterThanOrEqual(2);
    */
});
