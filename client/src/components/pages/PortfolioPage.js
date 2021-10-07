import {
    Box,
    Button,
    Typography
} from '@mui/material'
import PortfolioTable from '../tables/PortfolioTable'
import { useState, useEffect } from 'react'

function PortfolioPage({user, priceData, setPriceData, tickerForFetch, setTickerForFetch}) {
    console.log("portfolio page tickers", tickerForFetch)

    useEffect(() => {
        if(tickerForFetch) {
            fetch(`https://api.twelvedata.com/time_series?symbol=${tickerForFetch}&interval=1min&apikey=5b65bc522cdd4e51a3c12d1073b5e3ef`)
            .then(r => r.json())
            .then(response =>{
                if(response.code) {
                    console.log("api 2")
                    fetch(`https://api.twelvedata.com/time_series?symbol=${tickerForFetch}&interval=1min&apikey=60af8428441c4634a020712e7cd5f7e1`)
                    .then(r => r.json())
                    .then(data => {
                        if(data.code) {
                            console.log("")
                            fetch(`https://api.twelvedata.com/time_series?symbol=${tickerForFetch}&interval=1min&apikey=c388556de8104717a7b14b0d9281eb96`)
                            .then(r => r.json())
                            .then(data => {
                                if(data.code) {
                                    alert("data request limit exceded please try again in 1 min")
                                }
                                else {
                                    setPriceData(data)
                                }
                            })
                        }
                        else {
                            setPriceData(data)
                        }
                    })
                }
                else {
                    setPriceData(response)
                    console.log("api 1")
                }
            })
        }
        else if (tickerForFetch !== []){

        }
    },[])


    return (user ?
        <Box>
            <Typography 
            variant="h4"
            style={{marginLeft: "8px", marginTop: "8px"}}
            >{user.username}'s Portfolio</Typography>
            <PortfolioTable user={user} priceData={priceData} setPriceData={setPriceData} tickerForFetch={tickerForFetch} setTickerForFetch={setTickerForFetch}s/>
        </Box>
        :
        <Typography variant="h4">login or create an account to see portfolio</Typography>
    )
}
export default PortfolioPage