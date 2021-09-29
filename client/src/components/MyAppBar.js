import {
  AppBar,
  Typography,
  Button,
  Avatar,
  Box,
  TextField,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function MyAppBar({ user, setUser, searchResults, setSearchResults }) {

    const [searchBar, setSearchBar] = useState('')
  const history = useHistory();
  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    setUser(false);
  }
  function handleSearch(e) {
    e.preventDefault();
    setSearchResults(e.target.search.value)
    console.log(e.target.search.value)
    history.push("/asset-search");

  }
  function handleSearchChange(e) {
    setSearchBar(e.target.value)
  }


  return (
    <AppBar position="static" color="primary">
      <Typography variant="h6">Morefolio</Typography>
      {user ? (
        <Box>
          <Button color="third" variant="contained" onClick={handleLogOut}>
            Logout
          </Button>
          <Link to="/my-account">
            <Avatar src={user.profile_img} />
          </Link>
        </Box>
      ) : (
        <Link to="/signin">
          <Button variant="contained" color="third">
            sign in
          </Button>
        </Link>
      )}
      <form onSubmit={handleSearch}>
        <TextField label="search stocks and crypto" name="search" onChange={handleSearchChange} value={searchBar}/>
      </form>
    </AppBar>
  );
}

export default MyAppBar;
