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

function UpdatePortfolioItem({isUpdateOpen, setIsUpdateOpen, dialogData}) {
    const history = useHistory();
    const [updateForm, setUpdateForm] = useState({
        quantity: dialogData.quantity,
        purchase_price: dialogData.purchase_price
    })

    function handlePortfolioItemUpdate(e) {
        e.preventDefault()

        fetch(`/portfolio_item/${dialogData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
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
                <TextField label="quantity" name='quantity' value={updateForm.quantity} onChange={handleFormChange}/>
                <TextField label="purchase price" name='purchase_price' value={updateForm.purchase_price} onChange={handleFormChange}/>
                <Button type="submit">
                    <PublishIcon />
                </Button>
            </form>
        </Dialog>
    )
}
export default UpdatePortfolioItem