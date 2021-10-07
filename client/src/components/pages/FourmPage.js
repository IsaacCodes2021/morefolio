import {
    Box,
    SpeedDial,
    Typography,
    Divider
} from "@mui/material";

import CreateIcon from '@mui/icons-material/Create';

import { useEffect, 
    useState 
} from "react";

import PostCard from "../Cards/ForumPostCard";
import CreatePost from "../Dialogs/CreatePost";

export default function FourmPage({ user }) {
    const [postData, setPostData] = useState(false)
    const [isPostOpen, setIsPostOpen] = useState(false)
    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then((data) => {
            setPostData(data)
            console.log(data)
        })
    },[])
    function handlePostButton() {
        setIsPostOpen(true)
    }
    return (
        <Box sx={{margin: '3%'}}>
            <CreatePost isPostOpen={isPostOpen} setIsPostOpen={setIsPostOpen} setPostData={setPostData} postData={postData}/>
            <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<CreateIcon />}
            onClick={handlePostButton}
            />
            <Typography variant="h4" style={{textAlign:"center"}}>MoreForum</Typography>
            <Divider sx={{marginBottom: '2%'}}/>
            {   postData ? 
            <Box>
                {
                    postData.map((post) => {
                        return <PostCard post={post} user={user}/>
                    })
                }
            </Box>
            :
            <Typography>loading...</Typography>
            }
        </Box>
    )
}