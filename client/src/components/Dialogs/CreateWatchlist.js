import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Button,
    TextField
} from '@mui/material/';

function CreateWatchlist({ isCreateWatchlistOpen, setIsCreateWatchlistOpen, user, watchlists, setWatchlists }) {
    function postNewWatchlist(e) {
        e.preventDefault()
        fetch('/watchlists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: e.target.watchlist.value,
                user_id: user.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(watchlists.push(data))
        })
    }
    return (
        <Dialog open={isCreateWatchlistOpen} onClose={(isCreateWatchlistOpen) => setIsCreateWatchlistOpen(!isCreateWatchlistOpen)}>
            <DialogTitle>Create a Watchlist</DialogTitle>
            <form onSubmit={postNewWatchlist}>
                <TextField name="watchlist" label="watchlist name"/>
                <Button type="submit" variant="contained">create</Button>
            </form>
        </Dialog>
    )
}

export default CreateWatchlist