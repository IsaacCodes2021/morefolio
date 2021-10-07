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
import { useHistory } from "react-router-dom";
function UserPage({ user, setUser }) {
    const[editDialog, setEditDialog] = useState(false)
    const history = useHistory()
    function handleOpenEdit() {
        setEditDialog(!editDialog)
    }

    return(
        <Box style={{vw: "90", margin: "5%"}}>
            <EditUserDialog 
                setEditDialog={setEditDialog} 
                editDialog={editDialog}
                user={user}
                setUser={setUser}
            />
            {user ?
             <Card >
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
                    style={{margin: '7px'}}
                    >
                        edit
                    </Button><br/>
                    <Button style={{margin: '7px'}} variant='contained' onClick={() => history.push('/my-portfolio')}>my portfolio</Button><br/>
                    <Button style={{margin: '7px'}} variant='contained' onClick={() => history.push('/my-watchlists')}> my watchlists</Button>
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