import {
    Box
} from "@mui/system";
import Signin from "../forms/Signin";


function SignInPage({setUser}) {

    return(
        <Box>
            <Signin setUser={setUser}/>
        </Box>
    )
}

export default SignInPage

