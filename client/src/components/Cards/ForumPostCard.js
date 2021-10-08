import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Avatar,
  TextField
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from "react";
import EditPostDialog from "../Dialogs/EditPostDialog";

function PostCard({post, user}) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes)
    const [isEditPostOpen, setPostOpen] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentText, setCommentText] = useState({
        post_id: post.id,
        user_id: user.id,
        content: ""
    })
    const [newComments, setNewComments] = useState([])

    console.log(user)
    function handleLikeBtn() {
        setLiked(!liked)
        if (liked){
            fetch(`/posts/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likes: likes - 1})
            })
            .then(r => r.json())
            .then(() => setLikes(likes - 1))
        }
        else if(!liked) {
            fetch(`/posts/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likes: likes + 1})
            })
            .then(r => r.json())
            .then(() => setLikes(likes + 1))
        }
    }

    function handleEditBtn() {
        setPostOpen(true)
    }

    function handleCommentButton() {
        setShowComments(!showComments)
    }

    function handleCommentChange(e) {
        setCommentText({
            ...commentText,
            content: e.target.value
        })
    }

    function handleCommentSubmit(e) {
        e.preventDefault()
        fetch('/post-comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentText)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setNewComments([...newComments, data])
        })
    }

    return(
        <Card style={{marginBottom: "10px"}}>
            <EditPostDialog isOpen={isEditPostOpen} setIsOpen={setPostOpen} post={post}/>
            <Box sx={{display: "flex"}}>
                <Avatar src={post.user.profile_img} title={post.user.username} style={{}}/>
                <Typography sx={{marginLeft: "9px"}} variant="h5">{post.title}</Typography>
                <Button onClick={handleLikeBtn}>
                    <Typography>{likes}</Typography>
                    {liked ?
                        <FavoriteIcon />
                        :
                        <FavoriteBorderIcon />
                        }
                </Button>
                <Button onClick={handleCommentButton}>
                    <Typography>{post.post_comments.length}</Typography>
                    <ForumIcon />
                </Button>
                {user.id === post.user.id ? 
                    <Button onClick={handleEditBtn}><ModeEditIcon /></Button>
                    :
                    null
                }
            </Box>
            <CardContent>{post.content}</CardContent>
            {/* render comments */}
            {showComments ? 
            <Box>
                <form onSubmit={handleCommentSubmit}>
                    <Box sx={{display: "flex"}}>
                        <TextField name="content" fullWidth label="add a comment..." size="small" value={commentText.content} onChange={handleCommentChange} sx={{margin: "4px"}}/>
                        <Button type="submit">send</Button>
                    </Box>
                </form>
                {post.post_comments.map((comment) => {
                    return (
                        <>
                            <Divider />
                            <Box sx={{display: "flex"}}>
                                <Avatar src={comment.profile.profile_img} sx={{marginLeft: "9px", marginTop: "9px"}}/> 
                                <Typography style={{marginTop: '15px', marginLeft: '6px'}}>{comment.profile.username}</Typography>
                            </Box>
                            <Typography style={{marginLeft:"10px"}}>{comment.content}</Typography>
                            
                        </>
                    )
                })}
                {newComments.map(comment => {
                    if (newComments !== []) {
                        return (
                            <>
                            <Divider />
                            <Box sx={{display: "flex"}}>
                                <Avatar src={comment.profile.profile_img} sx={{marginLeft: "9px", marginTop: "9px"}}/> 
                                <Typography style={{marginTop: '15px', marginLeft: '6px'}}>{comment.profile.username}</Typography>
                            </Box>
                            <Typography style={{marginLeft:"10px"}}>{comment.content}</Typography>
                            </>
                        )
                    }
                })

                }
            </Box>
            :
            null
            }
        </Card>
    )
}

export default PostCard