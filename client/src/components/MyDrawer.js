import {
    Drawer, 
    ListItemIcon, 
    Typography,
    Box,
    Button,
    List,
    ListItemButton
} from '@mui/material'

import { useHistory } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';

function MyDrawer({drawerOpen, setDrawerOpen, setUser}) {
    const history = useHistory()

    function handleLogOut() {
        fetch("/logout", {
        method: "DELETE",
        });
        setUser(false);
        history.push('/')
        setDrawerOpen(!drawerOpen)
    }
    
    function handleHome() {
        setDrawerOpen(!drawerOpen)
        history.push('/')
    }

    function handleDashboard() {
        setDrawerOpen(!drawerOpen)
        history.push('/my-account')
    }

    function handlePortfolio() {
        setDrawerOpen(!drawerOpen)
        history.push('/my-portfolio')
    }

    function handleWatchlist() {
        setDrawerOpen(!drawerOpen)
        history.push('/my-watchlists')
    }

    function handleForum() {
        setDrawerOpen(!drawerOpen)
        history.push('/forum')
    }

    return(
        <Drawer
            open={drawerOpen}
            onClose={(drawerOpen) => setDrawerOpen(!drawerOpen)}
            color="secondary"
        >
            <Box style={{width:"300px", height: "100%", backgroundColor: "#D6F9FF"}} >
                <List>
                    <ListItemButton onClick={handleHome}>
                        <ListItemIcon>
                            <HomeIcon color="blackish"/>
                        </ListItemIcon>
                        Home
                    </ListItemButton>
                    <ListItemButton onClick={handleForum}>
                        <ListItemIcon>
                        <ForumIcon color="blackish" />        
                        </ListItemIcon>
                        Forum
                    </ListItemButton>
                    <ListItemButton onClick={handleDashboard}>
                        <ListItemIcon>
                            <AccountBoxIcon color="blackish" />
                        </ListItemIcon>
                        Dashboard
                    </ListItemButton>
                    <ListItemButton onClick={handlePortfolio}>
                        <ListItemIcon>
                            <AccountBalanceWalletIcon color="blackish" />
                        </ListItemIcon>
                        my portfolio
                    </ListItemButton>
                    <ListItemButton onClick={handleWatchlist}>
                        <ListItemIcon>
                            <FormatListBulletedIcon color="blackish" />
                        </ListItemIcon>
                        my watchlists
                    </ListItemButton>
                </List>
                <Button variant="contained" style={{bottom: 16, right: 16, position:"absolute"}} onClick={handleLogOut}>
                    log out
                    <LogoutIcon style={{marginLeft: "6px"}}/>
                </Button>
            </Box>
        </Drawer>
    )
}

export default MyDrawer