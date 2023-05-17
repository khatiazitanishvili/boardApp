/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Message from "../../components/Message"
import { demoMessagesChannel1 } from './data';

test('testMessage', async () => {
    await act(() => {
        render(<Message message={demoMessagesChannel1[0]}></Message>);
    })
    const linkElement = screen.getByText(/Message 1/i);
    expect(linkElement).toBeInTheDocument();
});
