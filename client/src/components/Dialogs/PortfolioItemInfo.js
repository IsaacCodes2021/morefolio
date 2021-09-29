import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Typography
} from '@mui/material/';

function PortfolioItemInfo({ isOpen, setIsOpen, dialogData, setIsUpdateOpen }) {


    function handleUpdateButton() {
        setIsOpen((isOpen) => setIsOpen(!isOpen))
        setIsUpdateOpen(true)
    }

    function handleDeleteButton() {
        setIsOpen((isOpen) => setIsOpen(!isOpen))
    }

    return(
        <Dialog open={isOpen} onClose={(isOpen) => setIsOpen(!isOpen)}>
            <DialogTitle>{dialogData.ticker}</DialogTitle>
            <Typography>{dialogData.quantity}</Typography>
            <Typography>{dialogData.purchase_price}</Typography>
            <Button onClick={handleUpdateButton}>update holdings</Button>
            <Button onClick={handleDeleteButton}>Remove</Button>
        </Dialog>
    )
}

export default PortfolioItemInfo