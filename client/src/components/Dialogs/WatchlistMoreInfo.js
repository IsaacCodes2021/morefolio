import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper
} from '@mui/material'

function WatchListMoreInfo({isOpen, setOpen, data, setWatchlistItems}) {
    function removeWatchListItem(e) {
        fetch(`/watchlist-items/${e.target.value}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => setWatchlistItems(data))
    }

    return(
        <Dialog open={isOpen} onClose={(isOpen) => setOpen(!isOpen)}>
            {
            data ? <>
            <DialogTitle>{data.symbol} info</DialogTitle>
            <TableContainer component={Paper}>
                <Table style={{marginLeft: '8px', marginRight: '8px'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell>full name</TableCell>
                            <TableCell>{data.priceData.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day high</TableCell>
                            <TableCell>${data.priceData.high}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day low</TableCell>
                            <TableCell>${data.priceData.low}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day open</TableCell>
                            <TableCell>${data.priceData.open}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day close</TableCell>
                            <TableCell>${data.priceData.close}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day change($)</TableCell>
                            <TableCell>{data.priceData.change}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>day change(%)</TableCell>
                            <TableCell>{data.priceData.percent_change}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button 
            color="error" 
            onClick={removeWatchListItem} 
            value={data.itemId}
            style={{marginTop: "8px", marginBottom: "8px"}}
            >remove</Button>
            </>
        :
        null
        }
        </Dialog>
    )
}

export default WatchListMoreInfo