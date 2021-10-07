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
        <Box>
            <form onSubmit={submitSignIn}>
                <TextField
                name="username"
                label="Username"
                onChange={onFormChange}
                value={signInForm.username}
                />
                <TextField
                name="password"
                label="Password"
                type="password"
                onChange={onFormChange}
                value={signInForm.password} 
                />
                <Button 
                variant="contained" 
                type=""
                >
                    signin
                </Button>
                <Link 
                to="/signup">
                    <Button
                    variant="contained"
                    >
                        don't have an account?
                    </Button>
                </Link>

            </form>
        </Box>
    )
}

export default Signin