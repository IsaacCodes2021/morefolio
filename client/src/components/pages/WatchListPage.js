import { useState } from 'react'
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

    function handleSelectChange(e) {
        setSelectedWatchlist(e.target.value)
    }

    return ( user ?
        <Box>
            <Select onChange={handleSelectChange}>
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
            <WatchListTable selectedWatchlist={selectedWatchlist}/>
        </Box>
        :
        <Typography variant="h4">login to see page</Typography>
    )
}

export default WatchListPage