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
    Typography,
    Button
} from "@mui/material"

import WatchListMoreInfo from "../Dialogs/WatchlistMoreInfo";

function WatchListTable({user, selectedWatchlist, priceData, setPriceData}) {
    const [watchlistItems, setWatchlistItems] = useState([])
    const [tickerForFetch, setTickerForFetch] = useState(false)
    const [showMoreInfe, setShowMoreInfo] = useState(false)
    const [moreInfoData, setMoreInfoData] = useState(false)


    useEffect(() => {
        if(selectedWatchlist == false) {
            console.log('no selected watchlist')
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
            fetch(`https://api.twelvedata.com/quote?symbol=${tickerForFetch}&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
            .then(res => res.json())
            .then(responsePriceData => {
                setPriceData(responsePriceData)
            })
        }

    },[tickerForFetch])

    function handleMoreClick(e) {
        setShowMoreInfo(true)
        setMoreInfoData(JSON.parse(e.target.value))
    }

    return(
        <>{priceData &&
        <TableContainer component={Paper}>
            <WatchListMoreInfo isOpen={showMoreInfe} setOpen={setShowMoreInfo} data={moreInfoData} setWatchlistItems={setWatchlistItems}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>price</TableCell>
                        <TableCell>24hr change (%)</TableCell>
                        <TableCell>1yr range</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {
                watchlistItems !== [] ?
                    <TableBody>
                        {
                        watchlistItems.length === 1 ?
                            <>
                            {priceData ?
                                <TableRow>
                                <TableCell>{priceData.symbol}</TableCell>
                                <TableCell>{priceData.close}</TableCell>
                                <TableCell>{parseFloat(priceData.percent_change).toFixed(2)}</TableCell>
                                <TableCell>{priceData.fifty_two_week.range}</TableCell>
                                <TableCell><Button onClick={handleMoreClick} value={JSON.stringify({priceData: priceData, itemId: watchlistItems[0].id})}>more</Button></TableCell>
                            </TableRow>
                            :
                            <Typography></Typography>
                            }
                            </>
                        :
                        watchlistItems.map((watchlistItem) => {
                            return ( priceData ?
                                <TableRow>
                                    <TableCell>{watchlistItem.ticker}</TableCell>
                                    <TableCell>{priceData[watchlistItem.ticker].close}</TableCell>
                                    <TableCell>{parseFloat(priceData[watchlistItem.ticker].percent_change).toFixed(2)}</TableCell>
                                    <TableCell>{priceData[watchlistItem.ticker].fifty_two_week.range}</TableCell>
                                    <TableCell><Button onClick={handleMoreClick} value={JSON.stringify({priceData: priceData[watchlistItem.ticker], itemId: watchlistItem.id})}>more</Button></TableCell>
                                </TableRow>
                                :
                                <Typography>loading...</Typography>
                            )
                        })
                        
                        }
                    </TableBody>
                    :
                    null
                }
            </Table>
        </TableContainer>
    }
    </>       
    )
}

export default WatchListTable