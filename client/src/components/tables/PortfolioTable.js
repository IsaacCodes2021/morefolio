import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Box,
    Button
} from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { 
    useState,
    useEffect
} from 'react'
import PortfolioItemInfo from '../Dialogs/PortfolioItemInfo';
import UpdatePortfolioItem from '../Dialogs/UpdartePortfolioItem';

function PortfolioTable({user}) {
    const [priceData, setPriceData] = useState(false)
    const [tickerForFetch, setTickerForFetch] = useState(false)
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [usDeleteOpen, setIsDeleteOpen] = useState(false)

    useEffect(() => {
       const  tickers = user.portfolio_items.map((portfolioObj) => portfolioObj.ticker)

       setTickerForFetch(tickers)
    },[user])

    useEffect(() => {
        if(tickerForFetch) {
            fetch(`https://api.twelvedata.com/time_series?symbol=${tickerForFetch}&interval=1min&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
            .then(r => r.json())
            .then(response => setPriceData(response))
        }
        else if (tickerForFetch !== []){
            
        }
       
    },[tickerForFetch])

    function profitLossPercent(standingValue, purchaseValue) {
        // if profit
        if(standingValue > purchaseValue) {
            return ([(((standingValue - purchaseValue) / purchaseValue) * 100).toFixed(2), true])
        }
        //if loss
        else if(standingValue < purchaseValue) {
            return ([(((purchaseValue - standingValue) / purchaseValue) * 100).toFixed(2), false])
        }
    }

    function profitLossDollar(standingValue, purchaseValue) {
        let PL = standingValue - purchaseValue
        if(PL > 0) {
            return([PL.toFixed(2), true])
        }
        else if (PL < 0) {
            return([PL.toFixed(2), false])
        }
    }

    function handleRowClick(e) {
        console.log(e)
        setIsInfoDialogOpen(true)
        setDialogData(e)
    }
    
    return (
        <Box>
            <PortfolioItemInfo setIsOpen={setIsInfoDialogOpen} isOpen={isInfoDialogOpen} dialogData={dialogData} setIsUpdateOpen={setIsUpdateOpen}/>
            <UpdatePortfolioItem isUpdateOpen={isUpdateOpen} setIsUpdateOpen={setIsUpdateOpen} dialogData={dialogData}/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Holdings</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>P/L (%)</TableCell>
                            <TableCell>P/L ($)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.portfolio_items.map((portfolioItem) => {
                            return (
                                <TableRow >
                                    <TableCell>{portfolioItem.ticker}</TableCell>
                                    {priceData ? 
                                    <TableCell>${priceData[`${portfolioItem.ticker}`].values[0].close}</TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    <TableCell>{portfolioItem.quantity}</TableCell>
                                    {priceData ? 
                                    <TableCell>{priceData[`${portfolioItem.ticker}`].values[0].close * portfolioItem.quantity}</TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    {priceData ?
                                    <TableCell>
                                        {profitLossPercent(
                                        priceData[`${portfolioItem.ticker}`].values[0].close * portfolioItem.quantity,
                                            portfolioItem.purchase_price * portfolioItem.quantity
                                        )[0]}
                                    </TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    {priceData ?
                                    <TableCell>
                                        {profitLossDollar(
                                            priceData[`${portfolioItem.ticker}`].values[0].close * portfolioItem.quantity,
                                            portfolioItem.purchase_price * portfolioItem.quantity
                                        )[0]
                                        }
                                    </TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    <TableCell>
                                        <Button type="" onClick={() => {
                                            handleRowClick(portfolioItem)
                                        }}>
                                            <ReadMoreIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PortfolioTable