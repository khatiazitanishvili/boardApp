/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Board from '../Board';

test('testLoadingIndicator', async () => {
    await act(() => {
        render(<Board />);
    });
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
});
