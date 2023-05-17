/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Channel from "../../components/Channel"
import { demoBoard } from './data';

test('testChannel', async () => {
    /*
    await act(() => {
        render(<Channel channel={demoBoard.channels[0]} setSelectedChannel={demoBoard.channels[0]} />);
    });
    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.queryByText(/Zweiter Channel/i)).not.toBeInTheDocument();
    */
});
