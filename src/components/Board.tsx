import { BoardResource, ChannelResource } from "../ChannelResources";
import React, { useState, useEffect, createContext } from 'react';
import LoadingIndicator from "./LoadingIndicator";
import ChannelDescription from "./ChannelDescription";
import { getBoard } from "../backend/boardapi";
import { useErrorHandler } from "react-error-boundary";
import { Dropdown, DropdownButton, Button, Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Board() {
    const [myEntries, setMyEntries] = useState<BoardResource | null>();
    const handleError = useErrorHandler();

    async function load() {
        try {
            const c = await getBoard();
            setMyEntries(c);
        } catch (err) {
            setMyEntries(null);
            handleError(err);
        }
    }
    useEffect(() => { load(); }, []);

    if (!myEntries) {
        return <LoadingIndicator />
    } else {
        return (
            <div>
                <h3>Channels auf dem Board</h3>
                {
                    myEntries.channels.map(myEntry =>
                        <ChannelDescription channel={myEntry} key={myEntry.id} />
                    )

                }
            </div>
        )
    }
}
