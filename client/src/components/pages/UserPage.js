import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button
} from "@mui/material";
import { useState } from "react";
import EditUserDialog from "../Dialogs/EditUserDialog";

function UserPage({ user, setUser }) {
    const[editDialog, setEditDialog] = useState(false)

    function handleOpenEdit() {
        setEditDialog(!editDialog)
    }

    return(
        <Box>
            <EditUserDialog 
                setEditDialog={setEditDialog} 
                editDialog={editDialog}
                user={user}
                setUser={setUser}
            />
            {user ?
             <Card>
             <CardContent>
                <Avatar alt={user.username} src={user.profile_img}/>
                <Typography>
                    username: {user.username}
                </Typography>
                <Typography>
                    email: {user.email}
                </Typography>
                <Button
                variant="contained"
                onClick={handleOpenEdit}
                >
                    edit
                </Button>
             </CardContent>
            </Card>
            :
            <Typography
            variant="h4"
            >
                User not signed in
            </Typography>    
            }
        </Box>
    )
}

export default UserPage