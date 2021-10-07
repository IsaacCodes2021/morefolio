import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Box,
    Button,
    Typography
} from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { 
    useState,
    useEffect
} from 'react'
import PortfolioItemInfo from '../Dialogs/PortfolioItemInfo';
import UpdatePortfolioItem from '../Dialogs/UpdartePortfolioItem';
import DeletePortfolioItem from '../Dialogs/DeletePortfolioItem';

function PortfolioTable({user, priceData, setPriceData, tickerForFetch, setTickerForFetch}) {
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
    const [dialogData, setDialogData] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [portfolioItems, setPortfolioItems] = useState(user.portfolio_items)
    let price=0
    
    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setPortfolioItems(data.portfolio_items)
            console.log("from fetch")
            console.log(portfolioItems)
            const  tickers = portfolioItems.map((portfolioObj) => portfolioObj.ticker)
            setTickerForFetch(tickers)
        })
    },[])

    useEffect(() => {
        const  tickers = portfolioItems.map((portfolioObj) => portfolioObj.ticker)
        setTickerForFetch(tickers)
    },[portfolioItems])


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
        setIsInfoDialogOpen(true)
        setDialogData(e)
    }

    function getTotalPriceData(standingPrice, quantity) {
        price = price + (standingPrice * quantity)
        console.log(price)
        return standingPrice * quantity

    }
    console.log("pricedata: ",priceData)
    return (
        <Box>
            <PortfolioItemInfo 
                setIsOpen={setIsInfoDialogOpen} 
                isOpen={isInfoDialogOpen} 
                dialogData={dialogData} 
                setIsUpdateOpen={setIsUpdateOpen}
                setIsDeleteOpen={setIsDeleteOpen} 
                isDeleteOpen={isDeleteOpen} 
                setPortfolioItems={setPortfolioItems} 
                portfolioItems={portfolioItems}
            />
            <UpdatePortfolioItem 
                isUpdateOpen={isUpdateOpen} 
                setIsUpdateOpen={setIsUpdateOpen} 
                dialogData={dialogData}
                setPortfolioItems={setPortfolioItems} 
                portfolioItems={portfolioItems}
            />
            <DeletePortfolioItem 
                setIsDeleteOpen={setIsDeleteOpen} 
                isDeleteOpen={isDeleteOpen} 
                dialogData={dialogData} 
                setPortfolioItems={setPortfolioItems} 
                portfolioItems={portfolioItems}
            />
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
                    
                    <TableBody>{priceData? <>
                        {portfolioItems.map((portfolioItem) => {
                            console.log("--------items------")
                            console.log("ticker: ",(priceData[portfolioItem.ticker]))
                            return ( portfolioItems && priceData?
                                <TableRow >
                                    <TableCell>{portfolioItem.ticker}</TableCell>
                                    {priceData && portfolioItems ? 
                                    <TableCell>${parseFloat(priceData[portfolioItem.ticker].values[0].close).toFixed(2)}</TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    <TableCell>{portfolioItem.quantity}</TableCell>
                                    {priceData && portfolioItems ? 
                                    <TableCell>{getTotalPriceData(priceData[`${portfolioItem.ticker}`].values[0].close, portfolioItem.quantity).toFixed(2)}</TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    {priceData && portfolioItems ?
                                    <TableCell>
                                        {profitLossPercent(
                                        priceData[`${portfolioItem.ticker}`].values[0].close * portfolioItem.quantity,
                                            portfolioItem.purchase_price * portfolioItem.quantity
                                        )[0]}
                                    </TableCell>
                                    :
                                    <TableCell>waiting</TableCell>
                                    }
                                    {priceData && portfolioItems ?
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
                                :
                                null
                            )
                        })}
                        <TableRow style={{backgroundColor:'#90EE90'}}>
                            <TableCell>
                                <Typography variant='h5'>Total</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><Typography variant='h5'>${price.toFixed(2)}</Typography></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            
                        </TableRow></>
                        :
                        null }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PortfolioTable