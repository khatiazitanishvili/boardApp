/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Board from '../Board';
import { demoBoard } from './data';

test('testBoard mit fetch', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(demoBoard)
    } as Response)
    );

    await act(() => {
        render(<Board></Board>);
    });
    const linkElement = screen.getByText(/Channel 1/i);
    expect(linkElement).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
});
