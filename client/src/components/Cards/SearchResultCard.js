import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AddToPortfolio from "../Dialogs/AddToPortfolio";
import AddToWatchList from "../Dialogs/AddToWatchlist";
import InfoDialog from "../Dialogs/InfoDialog";
import { useState } from "react";
require('dotenv').config()

function SearchResultCard({ res, user, priceData, setPriceData, tickerForFetch, setTickerForFetch  }) {
    const [isPortDialogOpen, setIsPortDialogOpen] = useState(false)
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
    const [selectedTickerData, setSelectedTickerData] = useState(false)
    const [isWatchDialogOpen, setIsWatchDialogOpen] = useState(false)

    function portDialog() {
      fetch(`https://api.twelvedata.com/quote?symbol=${res.symbol}&apikey=60af8428441c4634a020712e7cd5f7e1`)
      .then(r => r.json())
      .then(setSelectedTickerData)
      setIsPortDialogOpen(true)
      // console.log(process.env.TWELVEDATA_API_TOKEN)
    }

    function infoDialog() {
      fetch(`https://api.twelvedata.com/quote?symbol=${res.symbol}&apikey=60af8428441c4634a020712e7cd5f7e1`)
      .then(r => r.json())
      .then(setSelectedTickerData)
      setIsInfoDialogOpen(true)
    }

    function watchDialog() {
      setIsWatchDialogOpen(true)
    }

  return (
    <Box>
        {selectedTickerData && <AddToPortfolio portDialog={isPortDialogOpen} setPortDialog={setIsPortDialogOpen} data={selectedTickerData} priceData={priceData} setPriceData={setPriceData} tickerForFetch={tickerForFetch} setTickerForFetch={setTickerForFetch}/>}
        {selectedTickerData && <InfoDialog isOpen={isInfoDialogOpen} setOpen={setIsInfoDialogOpen} data={selectedTickerData}/>}
        <AddToWatchList isOpen={isWatchDialogOpen} setOpen={setIsWatchDialogOpen} user={user} cardData={res}/>
      <Card
      style={{margin:'4%'}}
      >
        <CardContent>
          <Box sx={{display:'flex'}}>
          <Typography variant="h5">{res.symbol}</Typography>
          <Button 
          variant="contained" 
          onClick={infoDialog}
          style={{marginLeft:'12px'}}
          >info</Button>
          </Box>
          <Typography>company: {res.instrument_name}</Typography>
          <Typography>exchange: {res.exchange}</Typography>
          <Button 
          variant="contained" 
          onClick={portDialog}
          style={{marginBottom:'8px', marginRight: "8px"}}
          >Add to portolio</Button>
          <Button 
          variant="contained" 
          onClick={watchDialog}
          style={{marginBottom:'8px'}}
          >Add to a watchlist</Button>
          
        </CardContent>
      </Card>
    </Box>
  );
}
export default SearchResultCard;
