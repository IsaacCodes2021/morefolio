import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    TextField,
    Button
} from '@mui/material/';

function EditUserDialog({ editDialog, setEditDialog, user, setUser }) {
    const [updateUserData, setUpdateUserData] = useState({
            username: user.username,
            profile_img: user.profile_img            
        }
    )
    
    function handleUserUpdate(e) {
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateUserData)
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
        })
        console.log(updateUserData)
    }

    function handleFormChange(e) {
        setUpdateUserData({
            ...updateUserData,
            [e.target.name]: e.target.value
        })
    }

    function handleDeleteAccount() {
        
    }

    return(
        <Dialog
        open={editDialog}
        onClose={(editDialog) => setEditDialog(!editDialog)}
        >
            <DialogTitle>User Settings</DialogTitle>
            <form onSubmit={handleUserUpdate}>
                <TextField
                    label="username"
                    name="username"
                    value={updateUserData.username}
                    onChange={handleFormChange}
                />
                <TextField 
                    label="profile picture"
                    name="profile_img"
                    value={updateUserData.profile_img}
                    onChange={handleFormChange}
                />
                <Button
                    variant="contained"
                    type="submit"
                    onClick={console.log(updateUserData)}
                >
                    update
                </Button>
            </form>
            <Button color="error" onClick={handleDeleteAccount}>Delete Account</Button>
        </Dialog>
    )
}

export default EditUserDialog