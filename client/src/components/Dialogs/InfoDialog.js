import {
    Dialog,
    Typography
} from '@mui/material/';

function InfoDialog({isOpen, setOpen, data}) {
    console.log("info", data)
    
    return ( data ?
        <Dialog
        open={isOpen}
        onClose={(isOpen) => setOpen(!isOpen)}
        >
            <Typography 
            variant="h5"
            style={{marginLeft:"8px", marginTop:'8px'}}
            >{data.symbol}</Typography>
            <Typography
            style={{marginLeft:'8px'}}
            >last price: ${data.close}</Typography>
            <Typography
            style={{marginLeft:'8px', marginRight:"8px", marginBottom:'8px'}}
            >52 wk range: {data.fifty_two_week.range}</Typography>
        </Dialog>
        :
        null
    )
}

export default InfoDialog