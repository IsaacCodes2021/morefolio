import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button
} from '@mui/material/';

function AddToPortfolio({portDialog, setPortDialog, data}) {
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

    function handleFormSubmit(e) {
        e.preventDefault()
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
        .then(console.log)
    }

    return(
        <Dialog open={portDialog} onClose={(portDialog) => setPortDialog(!portDialog)}>
            <DialogTitle>{data.symbol}</DialogTitle>
            <form onSubmit={handleFormSubmit}>
                <TextField label="purchase date" name="purchase_date" onChange={handleFormChange} value={addtoPortForm.purchase_date}/>
                <TextField label="purchase price" name="purchase_price" onChange={handleFormChange} value={addtoPortForm.purchase_price}/>
                <TextField label="amount" name="quantity" onChange={handleFormChange} value={addtoPortForm.quantity}/>
                <Button type="submit" variant="contained">add</Button>
            </form>
        </Dialog>
    )
}
export default AddToPortfolio