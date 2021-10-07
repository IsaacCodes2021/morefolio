import {
    Dialog,
    DialogTitle,
    Button
} from '@mui/material/';

function DeletePortfolioItem({isDeleteOpen, setIsDeleteOpen, dialogData, setPortfolioItems, portfolioItems}) {
    function handleDeleteClick() {
        fetch(`/portfolio-item/${dialogData.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            fetch('/me')
            .then(res => res.json())
            .then(data => {
                setPortfolioItems(data.portfolio_items)
            })
        })
        setIsDeleteOpen(!isDeleteOpen)
    }

    
    return (
        <Dialog open={isDeleteOpen} onClose={(isDeleteOpen) => setIsDeleteOpen(!isDeleteOpen)}>
            <DialogTitle>Are you sure you want to remove {dialogData.ticker} from your portfolio?</DialogTitle>
            <Button color="error" onClick={handleDeleteClick}>delete</Button>
            <Button onClick={(isDeleteOpen) => setIsDeleteOpen(!isDeleteOpen)}>Exit</Button>
        </Dialog>
    )
}

export default DeletePortfolioItem