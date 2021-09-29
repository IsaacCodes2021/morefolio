import {
    Box,
    Typography
} from '@mui/material'
import PortfolioTable from '../tables/PortfolioTable'
import { useState } from 'react'
function PortfolioPage({user}) {
    const [valuesArray, setvaluesArray] = useState([])
    const [myPortfolioValue, setMyPortfolioValue] = useState(0)
    return ( user ?
        <Box>
            <Typography variant="h4">My Portfolio</Typography>
            <Typography>Current value: ${myPortfolioValue}</Typography>
            <PortfolioTable user={user} setvaluesArray={setvaluesArray} valuesArray={valuesArray}/>
            
        </Box>
        :
        <Typography variant="h4">login or create an account to see portfolio</Typography>
    )
}

export default PortfolioPage
