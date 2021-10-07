import {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    TextField,
    Box,
    Button
}from '@mui/material/';


function Signup({ setUser }) {
    const history = useHistory()
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
            .then((data) => {
                delete signUpForm.email
                delete signUpForm.passwordConfirmation
                console.log("signed up", data)
                fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpForm)
            })
            .then(data=> setUser(data))
            history.push('/my-account')
            })
        }   
    }

    function onFormChange(e) {
        setSignupForm((signUpForm) => ({
            ...signUpForm,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <Box style={{width: "320px", margin:'auto'}}>
            <form onSubmit={submitNewUser}>
                <TextField
                name="username"
                label="Username"
                onChange={onFormChange}
                value={signUpForm.username}
                size="small"
                style={{marginTop:'10%'}}
                /><br/>
                <TextField
                name="email"
                label="Email"
                onChange={onFormChange} 
                value={signUpForm.email}
                size="small"
                style={{marginTop:'8px'}}
                /><br />
                <TextField
                name="password"
                label="Password"
                type="password"
                onChange={onFormChange}
                value={signUpForm.password}
                size="small"
                style={{marginTop:'8px'}}
                /><br />
                <TextField
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                onChange={onFormChange}
                value={signUpForm.passwordConfirmation}
                size="small"
                style={{marginTop:'8px'}}
                /><br />
                <Button 
                variant="contained" 
                type="submit"
                style={{marginTop:'8px'}}
                >
                    submit
                </Button>
            </form>
            <Link 
                to="/signin"
            >
                <Button
                style={{marginTop:'8px'}}
                > 
                    Already have an account?
                </Button>
            </Link>
        </Box>
    )
}

export default Signup