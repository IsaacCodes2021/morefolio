import {
    useEffect,
    useState 
} from "react"

import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Typography
} from "@mui/material"

function WatchListTable({user, selectedWatchlist}) {
    const [watchlistItems, setWatchlistItems] = useState([])
    const [tickerForFetch, setTickerForFetch] = useState(false)
    const [priceData, setPriceData] = useState(false)

    useEffect(() => {
        if(selectedWatchlist == false) {

        }
        else {
            fetch(`/watchlists/${selectedWatchlist}`)
            .then(res => res.json())
            .then(watchlist => {
                setWatchlistItems(watchlist.watchlist_items)
                setTickerForFetch(watchlist.watchlist_items.map((item) => item.ticker))
            })
        }
    },[selectedWatchlist])

    useEffect(() => {
        if(tickerForFetch) {
            console.log(tickerForFetch)
            fetch(`https://api.twelvedata.com/quote?symbol=${tickerForFetch}&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
            .then(res => res.json())
            .then(responsePriceData => setPriceData(responsePriceData))
        }
    },[tickerForFetch])

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>price</TableCell>
                        <TableCell>24hr change (%)</TableCell>
                        <TableCell>1yr range</TableCell>
                    </TableRow>
                </TableHead>
                {watchlistItems !== [] ?
                    <TableBody>
                        {watchlistItems.map((watchlistItem) => {
                            return ( priceData ?
                                <TableRow>
                                    <TableCell>{watchlistItem.ticker}</TableCell>
                                    <TableCell>{priceData[watchlistItem.ticker].close}</TableCell>
                                    <TableCell>{parseFloat(priceData[watchlistItem.ticker].percent_change).toFixed(2)}</TableCell>
                                    <TableCell>{priceData[watchlistItem.ticker].fifty_two_week.range}</TableCell>
                                </TableRow>
                                :
                                <Typography>loading...</Typography>
                            )
                        })}
                    </TableBody>
                    :
                    null
                }
            </Table>
        </TableContainer>
    )
}

export default WatchListTable