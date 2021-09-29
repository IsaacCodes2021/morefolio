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

function SearchResultCard({ res, user }) {
    const [isPortDialogOpen, setIsPortDialogOpen] = useState(false)
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
    const [selectedTickerData, setSelectedTickerData] = useState(false)
    const [isWatchDialogOpen, setIsWatchDialogOpen] = useState(false)

    function portDialog() {
        fetch(`https://api.twelvedata.com/quote?symbol=${res.symbol}&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
        .then(r => r.json())
        .then(setSelectedTickerData)
        setIsPortDialogOpen(true)
        // console.log(process.env.TWELVEDATA_API_TOKEN)
    }

    function infoDialog() {
            fetch(`https://api.twelvedata.com/quote?symbol=${res.symbol}&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
            .then(r => r.json())    
            .then(setSelectedTickerData)
            setIsInfoDialogOpen(true)
    }

    function watchDialog() {
      setIsWatchDialogOpen(true)
    }

  return (
    <Box>  
        {selectedTickerData && <AddToPortfolio portDialog={isPortDialogOpen} setPortDialog={setIsPortDialogOpen} data={selectedTickerData}/>}
        {selectedTickerData && <InfoDialog isOpen={isInfoDialogOpen} setOpen={setIsInfoDialogOpen} data={selectedTickerData}/>}
        <AddToWatchList isOpen={isWatchDialogOpen} setOpen={setIsWatchDialogOpen} user={user} cardData={res}/>
      <Card>
        <CardContent>
          <Typography variant="h5">{res.symbol}</Typography>
          <Typography>company: {res.instrument_name}</Typography>
          <Typography>exchange: {res.exchange}</Typography>
          <Button variant="contained" onClick={portDialog}>Add to portolio</Button>
          <Button variant="contained" onClick={watchDialog}>Add to a watchlist</Button>
          <Button variant="contained" onClick={infoDialog}>info</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
export default SearchResultCard;
