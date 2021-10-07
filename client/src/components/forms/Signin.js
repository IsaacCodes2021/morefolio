import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    TextField,
    Box,
    Button
}from '@mui/material/';

function Signin({ setUser }) {

    const history = useHistory()
    const [signInForm, setSigniInForm] = useState({
        username: "",
        password: ""
    })

    function onFormChange(e) {
        setSigniInForm((signInForm) => ({
            ...signInForm, 
            [e.target.name]: e.target.value
        }))
    }

    async function submitSignIn(e) {
        e.preventDefault()
        if (signInForm.username === "") {
            alert("please enter a username")
        }
        else if (signInForm.password === "please enter a password") {
            alert("please enter a password")
        }
        else if(signInForm.username !== "" && signInForm.password !== "") {
            const response = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signInForm)
            })
            if (response.ok) {
                response.json()
                .then(data=> setUser(data))
                history.push('/my-account')
            }
            else {
                response.json()
                .then(data => alert(data.errors))
            }
        }
    }

    return (
        <Box style={{width: "320px", margin:'auto'}}>
            <form onSubmit={submitSignIn}>
                <TextField
                name="username"
                label="Username"
                onChange={onFormChange}
                value={signInForm.username}
                size="small"
                style={{marginTop:'10%', marginBottom: '8px', width: "312px"}}
                /><br/>
                <TextField
                name="password"
                label="Password"
                type="password"
                onChange={onFormChange}
                value={signInForm.password}
                size="small"
                style={{marginBottom: "8px"}}
                />
                <Button
                variant="contained"
                type="submit"
                style={{marginLeft: "8px", marginTop: "2px"}}
                >
                    signin
                </Button><br/>
                <Button
                onClick={() => history.push("/signup")}
                >
                    don't have an account?
                </Button>
            

            </form>
        </Box>
    )
}

export default Signin