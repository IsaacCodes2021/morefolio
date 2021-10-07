import { Container } from '@mui/material';
import Signup from '../forms/Signup';

function SignupPage({setUser}) {
    return (
        <Container>
            <Signup setUse={setUser}/>
        </Container>
    )
}

export default SignupPage