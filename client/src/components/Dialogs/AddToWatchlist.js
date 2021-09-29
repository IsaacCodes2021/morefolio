import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Button,
    Select,
    MenuItem
} from '@mui/material/';

function AddToWatchList({ user, isOpen, setOpen, cardData }) {
    const [cardTitle, setCardTitle] = useState("choose a watchlist")
    const [selectedList, setSelectedList] = useState(false)

    function handleSelectChange(e) {
        setCardTitle(e.target.value.name)
        setSelectedList(e.target.value)
    }

    function submitWatchlist() {
        console.log(selectedList.id)
        if(selectedList) {
            fetch(`/watchlist-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    watchlist_id: selectedList.id,
                    ticker: cardData.symbol
                })
            })
        }
    }

    return (
        <Dialog open={isOpen} onClose={(isOpen) => setOpen(!isOpen)}>
            <DialogTitle>{cardTitle}</DialogTitle>
                <Select onChange={handleSelectChange}>
                    {user.watchlists.map((list) => {
                        return <MenuItem value={list}>{list.name}</MenuItem>
                    })}
                </Select>
                <Button type="submit" onClick={submitWatchlist}>add {cardData.symbol}</Button>
        </Dialog>
    )
}

export default AddToWatchList