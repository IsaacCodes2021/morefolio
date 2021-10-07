import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    Button,
    Select,
    MenuItem,
    TextField
} from '@mui/material/';

function EditPostDialog({ post, isOpen, setIsOpen }) {
    const [formData, setFormData] = useState({
        title: post.title,
        content: post.content
    })

    function updatePost() {
        fetch(`/posts/${post.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
    }

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Dialog open={isOpen} onClose={(isOpen) => setIsOpen(!isOpen)}>
            <DialogTitle>Edit Post</DialogTitle>
            <form onSubmit={updatePost}>
                <TextField name="title" label="title" onChange={handleFormChange} value={formData.title}/>
                <TextField name="content" label="content" multiline maxRows={8} onChange={handleFormChange} value={formData.content}/>
                <Button type="submit" variant="contained">publish</Button>
            </form>
        </Dialog>
    )
}
export default EditPostDialog