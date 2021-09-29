import {useState} from 'react'
import { Link } from 'react-router-dom'
import {
    TextField,
    Box,
    Button
}from '@mui/material/';


function Signup({ setUser }) {
    const [signUpForm, setSignupForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    function submitNewUser(e) {
        e.preventDefault()
        if(signUpForm.password === "") {
            alert("cannot leave password blank")
        }
        else if(signUpForm.username === "") {
            alert("cannot leave username blank")
        }
        else if(signUpForm.email === "") {
            alert("cannot leave email blank")
        }
        else if (signUpForm.password !== signUpForm.passwordConfirmation) {
            alert("passwords not matching")
        }
        else if (signUpForm.password === signUpForm.passwordConfirmation) {
            let userData = signUpForm
            delete userData.passwordConfirmation
            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(r => r.json())
            .then(console.log)
        }   
    }

    function onFormChange(e) {
        setSignupForm((signUpForm) => ({
            ...signUpForm,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <Box>
            <form onSubmit={submitNewUser}>
                <TextField
                name="username"
                label="Username"
                onChange={onFormChange}
                value={signUpForm.username}
                />
                <TextField
                name="email"
                label="Email"
                onChange={onFormChange} 
                value={signUpForm.email}
                />
                <TextField
                name="password"
                label="Password"
                onChange={onFormChange}
                value={signUpForm.password} 
                />
                <TextField
                name="passwordConfirmation"
                label="Confirm Password"
                onChange={onFormChange}
                value={signUpForm.passwordConfirmation}
                />
                <Button 
                variant="contained" 
                type=""
                >
                    submit
                </Button>
            </form>
            <Link 
                to="/signin"
            >
                <Button 
                    variant="contained"
                > 
                    Already have an account?
                </Button>
            </Link>
        </Box>
    )
}

export default Signup