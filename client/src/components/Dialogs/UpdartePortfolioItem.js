import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Typography
} from '@mui/material/';
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UpdatePortfolioItem({isUpdateOpen, setIsUpdateOpen, dialogData, setPortfolioItems, portfolioItems}) {
    const history = useHistory();
    const [updateForm, setUpdateForm] = useState({
    })
    console.log(dialogData)

    function handlePortfolioItemUpdate(e) {
        e.preventDefault()
        fetch(`/portfolio_item/${dialogData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateForm)
        })
        .then(res => res.json())
        .then(() => {
            setIsUpdateOpen(false)
            fetch('/me')
            .then(res => res.json())
            .then(data => {
                setPortfolioItems(data.portfolio_items)
                console.log("from fetch")
                console.log(portfolioItems)
                setUpdateForm({
                    quantity: "",
                    purchase_price: ""
                })
            })
        })
    }

    function handleFormChange(e) {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Dialog open={isUpdateOpen} onClose={(isUpdateOpen) => setIsUpdateOpen(!isUpdateOpen)}>
            <DialogTitle>edit {dialogData.ticker} holdings</DialogTitle>
            <form onSubmit={handlePortfolioItemUpdate}>
                <TextField 
                label={`shares: ${dialogData.quantity}`} 
                name='quantity' 
                value={updateForm.quantity} 
                onChange={handleFormChange}
                size="small"
                style={{marginLeft: "8px", marginBottom: '8px'}}
                />
                <TextField 
                label={`purchase price: ${dialogData.purchase_price}`} 
                name='purchase_price' 
                value={updateForm.purchase_price} 
                onChange={handleFormChange}
                size="small"
                style={{marginLeft: "8px", marginBottom: '8px'}}
                />
                <Button type="submit">
                    <PublishIcon />
                </Button>
            </form>
        </Dialog>
    )
}
export default UpdatePortfolioItem