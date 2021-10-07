import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Button,
    Typography,
    TextField,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

function CreatePost({ isPostOpen, setIsPostOpen, postData, setPostData}) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        likes: 0,
        ticker: ""
    })
    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        fetch('/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            // optimistic rendering
            console.log(data)
            setPostData([
                ...postData,
                data
            ])
            setIsPostOpen(!isPostOpen)

        })
    }
    return(
        <Dialog 
        open={isPostOpen} 
        onClose={(isPostOpen) => setIsPostOpen(!isPostOpen) } 
        fullWidth
        >
            
            <DialogTitle sx={{display: "flex"}}>
                <Typography variant="h6">Create Post</Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <TextField 
                name="title" 
                value={formData.title} 
                onChange={handleFormChange} 
                label="title" 
                size="small"
                style={{marginLeft: "4%", marginRight: '4%', width:'40%'}}
                />
                <TextField 
                name="ticker" 
                value={formData.ticker} 
                onChange={handleFormChange} 
                label="ticker" 
                size="small"
                style={{ marginRight: '4%', width:'40%'}}
                /><br />
                <TextField 
                name="content" 
                label="write post..." 
                multiline 
                maxRows={6} 
                value={formData.content} 
                onChange={handleFormChange}
                style={{marginLeft: "4%", marginRight: '4%', width:'84%', marginTop: "9px", marginBottom: "2px"}}
                /><br />
                <Button 
                variant="contained" 
                type="submit"
                style={{marginTop: '4px', marginLeft: '4%', marginBottom: "20px"}}
                >
                    send
                    <SendIcon 
                    style={{marginLeft:'3px'}}/>
                </Button>
            </form>

        </Dialog>
    )
}

export default CreatePost