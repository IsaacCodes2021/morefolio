import {
    Dialog,
    DialogTitle,
    Button
} from '@mui/material/';

function DeletePortfolioItem({isDeleteOpen, setIsDeleteOpen, dialogData}) {
    function handleDeleteClick() {
        fetch(`/portfolio-item/${dialogData.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(console.log)
        setIsDeleteOpen(!isDeleteOpen)
    }

    
    return (
        <Dialog open={isDeleteOpen} onClose={(isDeleteOpen) => setIsDeleteOpen(!isDeleteOpen)}>
            <DialogTitle>are you sure you want to remove {dialogData.ticker} from your portfolio?</DialogTitle>
            <Button onClick={handleDeleteClick}>delete</Button>
            <Button onClick={(isDeleteOpen) => setIsDeleteOpen(!isDeleteOpen)}>Exit</Button>
        </Dialog>
    )
}

export default DeletePortfolioItem