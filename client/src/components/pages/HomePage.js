import {
    Box,
    Divider, 
    Button,
    Card,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useHistory } from 'react-router-dom'
function HomePage() {
    const history = useHistory();
    return(
        <Box style={{margin:"auto", width:"90%"}}>
            <img style={{width: "80vw"}} src="/morefolio.png"/>
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Typography
            variant='h3'
            style={{textAlign: "center"}}
            >All  Your Investments In One Place</Typography>
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Card
            style={{border: '2px'}}>
                <Box sx={{display:'flex'}}>
                    <Typography 
                    variant="h4"
                    style={{textAlign:'left', margin:'8px'}}
                    >Step 1:</Typography>
                    <Button
                    //variant="h6"
                    onClick={() => {history.push('/signup')}}
                    >Create an account</Button>
                </Box>
            </Card>
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Card
            style={{border: '2px'}}>
                <Box sx={{display:'flex'}}>
                    <Typography 
                    variant="h4"
                    style={{textAlign:'left', margin:'8px'}}
                    >Step 2:</Typography>
                    <Typography
                    variant="h6"
                    style={{marginTop: "13px"}}
                    >Search Stocks and Cryptocurrencies</Typography>
                </Box>
                <img src='./step2.png' style={{width:"100vw"}}/>
            </Card>
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Divider style={{marginTop:'4px', marginBottom:'4px'}} />
            <Card
            style={{border: '2px'}}>
                <Box sx={{display:'flex'}}>
                    <Typography 
                    variant="h4"
                    style={{textAlign:'left', margin:'8px'}}
                    >Step 3:</Typography>
                    <Typography
                    variant="h6"
                    style={{marginTop: "13px"}}
                    >Add to your virtual portfolio or create a watchlist</Typography>
                </Box>
                <img src='./step3.png' style={{width:"100vw"}}/>
            </Card>
        </Box>
    )
}

export default HomePage