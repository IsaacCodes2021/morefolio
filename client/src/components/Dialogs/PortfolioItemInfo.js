import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Typography
} from '@mui/material/';

function PortfolioItemInfo({ isOpen, setIsOpen, dialogData, setIsUpdateOpen, setIsDeleteOpen, isDeleteOpen }) {

    console.log(dialogData)
    function handleUpdateButton() {
        setIsOpen((isOpen) => setIsOpen(!isOpen))
        setIsUpdateOpen(true)
    }

    function handleDeleteButton() {
        setIsOpen((isOpen) => setIsOpen(!isOpen))
        setIsDeleteOpen(!isDeleteOpen)
    }

    return(
        <Dialog open={isOpen} onClose={(isOpen) => setIsOpen(!isOpen)}>
            <DialogTitle>{dialogData.ticker}</DialogTitle>
            <Typography
            style={{marginLeft: "8px"}}
            >holdings: {dialogData.quantity}</Typography>
            <Typography
            style={{marginLeft: "8px"}}
            >purchase price: {dialogData.purchase_price}</Typography>
            <Button onClick={handleUpdateButton}>update holdings</Button>
            <Button onClick={handleDeleteButton} color="error">Remove</Button>
        </Dialog>
    )
}

export default PortfolioItemInfo