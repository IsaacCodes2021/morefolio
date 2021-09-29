import {
    Dialog,
    Typography
} from '@mui/material/';

function InfoDialog({isOpen, setOpen, data}) {

    return (
        <Dialog
        open={isOpen}
        onClose={(isOpen) => setOpen(!isOpen)}
        >
            <Typography variant="h5">{data.symbol}</Typography>
            <Typography>last price: ${data.close}</Typography>
            <Typography>52 wk range: {data.fifty_two_week.range}</Typography>
        </Dialog>
    )
}

export default InfoDialog