import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button
} from '@mui/material/';
import { useHistory } from 'react-router-dom';

function AddToPortfolio({portDialog, setPortDialog, data, priceData, setPriceData, tickerForFetch, setTickerForFetch }) {
    const history = useHistory()
    const [addtoPortForm, setAddToPortForm] = useState({
        ticker: data.symbol,
        name: data.name,
        purchase_price: "",
        purchase_date: "",
        quantity: ""
    })

    function handleFormChange(e) {
        setAddToPortForm({
            ...addtoPortForm,
            [e.target.name]: e.target.value
        })
    }
    function setTickerArray(arrOfObj) {
        const  tickers = arrOfObj.map((portfolioObj) => portfolioObj.ticker)
        setTickerForFetch(tickers)
        console.log("tick array", tickerForFetch)
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        console.log("btn click", tickerForFetch)
        // console.log([...tickerForFetch, addtoPortForm.ticker])
        let formDataToApi = {...addtoPortForm}
        delete formDataToApi.name
        console.log(formDataToApi)
        fetch('/portfolio_item', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formDataToApi)
        })
        .then(res => res.json())
        .then(() => {
            setPortDialog(!portDialog)
            fetch('/me')
            .then(r => r.json())
            .then(data => {
                setTickerArray(data.portfolio_items)
                setTickerForFetch([
                    ...tickerForFetch,
                    addtoPortForm.ticker
                ])
                setPriceData(false)
                console.log("priceData", priceData)
            })
        })
    }

    return(
        <Dialog open={portDialog} onClose={(portDialog) => setPortDialog(!portDialog)}>
            <DialogTitle>{data.symbol}</DialogTitle>
            <form onSubmit={handleFormSubmit}>
                <TextField 
                label="purchase date" 
                name="purchase_date" 
                onChange={handleFormChange} 
                value={addtoPortForm.purchase_date}
                style={{display: "none"}}     
                />
                <TextField 
                label="purchase price" 
                name="purchase_price" 
                onChange={handleFormChange} 
                value={addtoPortForm.purchase_price}
                size="small"
                style={{marginLeft:"8px", marginBottom:"8px"}}
                />
                <TextField 
                label="amount" 
                name="quantity" 
                onChange={handleFormChange} 
                value={addtoPortForm.quantity}
                size="small"
                style={{marginLeft:"8px", marginBottom:"8px"}}
                />
                <Button 
                type="submit" 
                variant="contained"
                style={{marginLeft:"8px", marginRight:"8px"}}
                >add</Button>
            </form>
        </Dialog>
    )
}
export default AddToPortfolio