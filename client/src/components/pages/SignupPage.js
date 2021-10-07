import { Container } from '@mui/material';
import Signup from '../forms/Signup';

function SignupPage({setUser}) {
    return (
        <Container>
            <Signup setUser={setUser}/>
        </Container>
    )
}

export default SignupPage