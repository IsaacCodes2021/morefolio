import { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material'

import WatchListTable from '../tables/WatchListTable'

function WatchListPage({user}) {
    const [selectedWatchlist, setSelectedWatchlist] = useState(false)
    const [priceData, setPriceData] = useState(false)

    useEffect(() => {
        console.log("selected watchlist change")
    }, [selectedWatchlist])

    function handleSelectChange(e) {
        if(e.target.value !== "list"){
            setSelectedWatchlist(e.target.value)
            setPriceData(false)
        }
    }

    return ( user ?
        <Box>
            <Select 
            onChange={handleSelectChange} 
            defaultValue="list"
            style={{margin:'8px'}}
            >
                <MenuItem value="list">select a list</MenuItem>
                {user.watchlists.map((watchlistObj) => {
                    return(
                        <MenuItem
                        value={watchlistObj.id}
                        >
                            {watchlistObj.name}
                        </MenuItem>
                    )
                })}
            </Select>
            <WatchListTable selectedWatchlist={selectedWatchlist} setPriceData={setPriceData} priceData={priceData}/>
        </Box>
        :
        <Typography variant="h4">login to see page</Typography>
    )
}

export default WatchListPage