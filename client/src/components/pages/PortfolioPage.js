import {
    Box,
    Typography
} from '@mui/material'
import PortfolioTable from '../tables/PortfolioTable'

function PortfolioPage({user}) {
    return ( user ?
        <Box>
            
            <Typography variant="h4">My Portfolio</Typography>
            <PortfolioTable user={user}/>
            
        </Box>
        :
        <Typography variant="h4">login or create an account to see portfolio</Typography>
    )
}

export default PortfolioPage
