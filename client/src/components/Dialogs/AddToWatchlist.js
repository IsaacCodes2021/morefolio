import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Button,
    Select,
    MenuItem
} from '@mui/material/';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CreateWatchlist from './CreateWatchlist'
function AddToWatchList({ user, isOpen, setOpen, cardData }) {
    const [cardTitle, setCardTitle] = useState("choose a watchlist")
    const [selectedList, setSelectedList] = useState(false)
    const [isCreateWatchlistOpen, setIsCreateWatchlistOpen] = useState(false)
    const [watchLists, setWatchlists] = useState(user.watchlists)

    function handleSelectChange(e) {
        if(e.target.value === "add") {
            setIsCreateWatchlistOpen(true)
        }
        setCardTitle(e.target.value.name)
        setSelectedList(e.target.value)
    }

    function submitWatchlist() {
        console.log(selectedList)
        if(selectedList || selectedList !== 'list') {
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
            <CreateWatchlist isCreateWatchlistOpen={isCreateWatchlistOpen} setIsCreateWatchlistOpen={setIsCreateWatchlistOpen} user={user} setWatchlists={setWatchlists} watchlists={watchLists}/>
            <DialogTitle>{cardTitle}</DialogTitle>
                <Select
                onChange={handleSelectChange}
                style={{marginLeft:"8px", marginRight:'8px'}}
                defaultValue="list"
                >
                    <MenuItem value="list">select a list</MenuItem>
                    {watchLists.map((list) => {
                        return <MenuItem value={list}>{list.name}</MenuItem>
                    })}
                    <MenuItem value="add">
                        create watchlist  
                        <AddCircleIcon />
                    </MenuItem>
                </Select>
                <Button 
                type="submit" 
                variant="contained" 
                onClick={submitWatchlist}
                style={{margin:'8px'}}
                >add {cardData.symbol}</Button>
        </Dialog>
    )
}

export default AddToWatchList