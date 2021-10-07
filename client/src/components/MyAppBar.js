import {
  AppBar,
  Typography,
  Button,
  Avatar,
  Box,
  TextField,
  Toolbar
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
//import imageLogo from '/more-f.jpg'
import MyDrawer from "./MyDrawer";

function MyAppBar({ user, setUser, searchResults, setSearchResults }) {
  const [lastTotalValue, setLastTotalValue] = useState(0)
  const [searchBar, setSearchBar] = useState('')
  const [drawrOpen, setDrawrOpen] = useState(false)
  const history = useHistory();
  
  function handleSearch(e) {
    e.preventDefault();
    setSearchResults(e.target.search.value)
    console.log(e.target.search.value)
    history.push("/asset-search");

  }
  function handleSearchChange(e) {
    setSearchBar(e.target.value)
  }

  function handleLogoClick() {
    setDrawrOpen(!drawrOpen)

  }


  return (
    <AppBar position="static" color="third">
      <MyDrawer setDrawerOpen={setDrawrOpen} drawerOpen={drawrOpen} setUser={setUser}/>
      <Toolbar >
        <img width="110" src="/morefolio.png" onClick={handleLogoClick} />
        <Box sx={{padding: "inherit", height:"inherit", width: "30%"}}>
        <form onSubmit={handleSearch}>
          <TextField size="small" label="search stocks and crypto" name="search" onChange={handleSearchChange} value={searchBar} />
        </form>
        </Box>
        {user ? (
          <Box style={{position: 'absolute', right: 0}}>
            <Toolbar >
            <Link to="/my-account">
              <Avatar src={user.profile_img} />
            </Link>
            </Toolbar>
          </Box>
        ) : (
          <Link to="/signin">
            <Button variant="contained" color="primary">
              sign in
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
